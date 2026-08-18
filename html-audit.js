const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");

const ROOT = process.cwd();

const IGNORED_DIRS = new Set(["node_modules", ".git", ".clasp", ".vscode"]);

const IGNORED_FILES = new Set([
  "audit.js",
  "css-audit.js",
  "html-audit.js",
  "eslint.config.js",
  "stylelint.config.js",
]);

// ------------------------------------------------------------
// FILES
// ------------------------------------------------------------

function getHtmlFiles(dir) {
  const result = [];

  for (const entry of fs.readdirSync(dir, {
    withFileTypes: true,
  })) {
    if (IGNORED_DIRS.has(entry.name)) {
      continue;
    }

    if (IGNORED_FILES.has(entry.name)) {
      continue;
    }

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      result.push(...getHtmlFiles(fullPath));
      continue;
    }

    if (path.extname(entry.name).toLowerCase() === ".html") {
      result.push(fullPath);
    }
  }

  return result;
}

function relative(file) {
  return path.relative(ROOT, file).replaceAll("\\", "/");
}

function loadFiles() {
  return getHtmlFiles(ROOT).map((file) => ({
    file,
    relative: relative(file),
    content: fs.readFileSync(file, "utf8"),
  }));
}

// ------------------------------------------------------------
// SCRIPT EXTRACTION
// ------------------------------------------------------------

function extractScripts(file) {
  const scripts = [];

  const regex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;

  for (const match of file.content.matchAll(regex)) {
    const code = match[1];

    // Ignorer les scripts sans JavaScript réel.
    if (!code.trim()) {
      continue;
    }

    scripts.push({
      code,
      offset: match.index,
    });
  }

  return scripts;
}

// ------------------------------------------------------------
// PARSER
// ------------------------------------------------------------

function parseJavaScript(code, filename) {
  try {
    return parser.parse(code, {
      sourceType: "unambiguous",

      plugins: [
        "optionalChaining",
        "nullishCoalescingOperator",
        "classProperties",
        "classPrivateProperties",
        "objectRestSpread",
        "dynamicImport",
        "topLevelAwait",
      ],

      errorRecovery: true,
      ranges: true,
    });
  } catch (error) {
    console.log(`\n⚠ ERREUR DE PARSING : ${filename}`);

    console.log(`  ${error.message}`);

    return null;
  }
}

// ------------------------------------------------------------
// AST WALK
// ------------------------------------------------------------

function walk(node, callback, parent = null) {
  if (!node || typeof node !== "object") {
    return;
  }

  if (Array.isArray(node)) {
    for (const child of node) {
      walk(child, callback, parent);
    }

    return;
  }

  if (node.type) {
    callback(node, parent);
  }

  for (const [key, value] of Object.entries(node)) {
    if (key === "loc" || key === "start" || key === "end" || key === "extra") {
      continue;
    }

    if (value && typeof value === "object") {
      walk(value, callback, node);
    }
  }
}

// ------------------------------------------------------------
// FUNCTIONS
// ------------------------------------------------------------

function extractFunctions(files) {
  const functions = [];

  for (const file of files) {
    for (const script of extractScripts(file)) {
      const ast = parseJavaScript(script.code, file.relative);

      if (!ast) {
        continue;
      }

      walk(ast, (node) => {
        // function foo() {}

        if (node.type === "FunctionDeclaration" && node.id?.type === "Identifier") {
          functions.push({
            name: node.id.name,
            type: "function",
            file: file.relative,
            line: getLine(file.content, script.offset + node.start),
          });

          return;
        }

        // const foo = () => {}
        // const foo = function () {}

        if (
          node.type === "VariableDeclarator" &&
          node.id?.type === "Identifier" &&
          (node.init?.type === "ArrowFunctionExpression" ||
            node.init?.type === "FunctionExpression")
        ) {
          functions.push({
            name: node.id.name,
            type: node.init.type === "ArrowFunctionExpression" ? "arrow" : "function-expression",
            file: file.relative,
            line: getLine(file.content, script.offset + node.start),
          });
        }
      });
    }
  }

  return functions;
}

// ------------------------------------------------------------
// FUNCTION CALLS
// ------------------------------------------------------------

function extractFunctionCalls(files) {
  const calls = [];

  for (const file of files) {
    for (const script of extractScripts(file)) {
      const ast = parseJavaScript(script.code, file.relative);

      if (!ast) {
        continue;
      }

      walk(ast, (node) => {
        if (node.type !== "CallExpression") {
          return;
        }

        // foo()

        if (node.callee?.type === "Identifier") {
          calls.push({
            name: node.callee.name,

            kind: "function-call",

            file: file.relative,

            line: getLine(file.content, script.offset + node.start),
          });

          return;
        }

        // object.foo()

        if (
          node.callee?.type === "MemberExpression" &&
          node.callee.object?.type === "Identifier" &&
          node.callee.property?.type === "Identifier"
        ) {
          calls.push({
            name: node.callee.property.name,

            object: node.callee.object.name,

            fullName: `${node.callee.object.name}.${node.callee.property.name}`,

            kind: "method-call",

            file: file.relative,

            line: getLine(file.content, script.offset + node.start),
          });
        }
      });
    }
  }

  return calls;
}

// ------------------------------------------------------------
// GOOGLE.SCRIPT.RUN
// ------------------------------------------------------------

function extractGoogleScriptRunCalls(files) {
  const calls = [];

  for (const file of files) {
    for (const script of extractScripts(file)) {
      const ast = parseJavaScript(script.code, file.relative);

      if (!ast) {
        continue;
      }

      walk(ast, (node) => {
        if (node.type !== "CallExpression") {
          return;
        }

        const gasFunction = findGoogleScriptRunMethod(node);

        if (!gasFunction) {
          return;
        }

        calls.push({
          name: gasFunction,

          file: file.relative,

          line: getLine(file.content, script.offset + node.start),
        });
      });
    }
  }

  return calls;
}

function findGoogleScriptRunMethod(node) {
  if (!node || node.type !== "CallExpression") {
    return null;
  }

  const callee = node.callee;

  if (
    !callee ||
    callee.type !== "MemberExpression" ||
    callee.computed ||
    callee.property?.type !== "Identifier"
  ) {
    return null;
  }

  const methodName = callee.property.name;

  /*
   * Cas direct :
   *
   * google.script.run.readTournaments()
   */

  if (isGoogleScriptRun(callee.object)) {
    return methodName;
  }

  /*
   * Cas chaîné :
   *
   * google.script.run
   *   .withSuccessHandler(...)
   *   .withFailureHandler(...)
   *   .readTournaments()
   *
   * On remonte simplement la chaîne
   * jusqu'à google.script.run.
   */

  if (callee.object?.type === "CallExpression") {
    if (belongsToGoogleScriptRunChain(callee.object)) {
      return methodName;
    }
  }

  return null;
}

function belongsToGoogleScriptRunChain(node) {
  if (!node || node.type !== "CallExpression") {
    return false;
  }

  const callee = node.callee;

  if (!callee || callee.type !== "MemberExpression" || callee.computed) {
    return false;
  }

  /*
   * google.script.run.foo()
   */

  if (isGoogleScriptRun(callee.object)) {
    return true;
  }

  /*
   * .withSuccessHandler(...)
   * .withFailureHandler(...)
   * ou toute autre méthode
   * intermédiaire de la chaîne.
   */

  return callee.object?.type === "CallExpression" && belongsToGoogleScriptRunChain(callee.object);
}

function isGoogleScriptRun(node) {
  if (!node || node.type !== "MemberExpression" || node.computed) {
    return false;
  }

  if (node.property?.type !== "Identifier" || node.property.name !== "run") {
    return false;
  }

  const script = node.object;

  if (!script || script.type !== "MemberExpression" || script.computed) {
    return false;
  }

  if (script.property?.type !== "Identifier" || script.property.name !== "script") {
    return false;
  }

  return script.object?.type === "Identifier" && script.object.name === "google";
}

// ------------------------------------------------------------
// INLINE HTML EVENTS
// ------------------------------------------------------------

function extractInlineHandlers(files) {
  const handlers = [];

  const regex = /\bon([a-z]+)\s*=\s*["']([^"']+)["']/gi;

  for (const file of files) {
    for (const match of file.content.matchAll(regex)) {
      const code = match[2];

      // On essaie uniquement d'identifier
      // les appels simples :
      //
      // onclick="foo()"
      // onclick="foo(event)"
      //
      // et on laisse les expressions complexes
      // tranquilles.

      for (const call of code.matchAll(/\b([A-Za-z_$][\w$]*)\s*\(/g)) {
        handlers.push({
          event: match[1],

          name: call[1],

          file: file.relative,

          line: getLine(file.content, match.index),
        });
      }
    }
  }

  return handlers;
}

// ------------------------------------------------------------
// DOM REFERENCES
// ------------------------------------------------------------

function extractDomReferences(files) {
  const references = [];

  for (const file of files) {
    const content = file.content;

    // getElementById("foo")

    for (const match of content.matchAll(/getElementById\s*\(\s*["']([^"']+)["']/g)) {
      references.push({
        type: "id",

        name: match[1],

        kind: "getElementById",

        file: file.relative,

        line: getLine(content, match.index),
      });
    }

    // querySelector("#foo")
    // querySelector(".foo")

    for (const match of content.matchAll(/querySelector(?:All)?\s*\(\s*["']([^"']+)["']/g)) {
      const selector = match[1];

      for (const id of selector.matchAll(/#([A-Za-z_][\w-]*)/g)) {
        references.push({
          type: "id",

          name: id[1],

          kind: "querySelector",

          file: file.relative,

          line: getLine(content, match.index),
        });
      }

      for (const className of selector.matchAll(/\.([A-Za-z_][\w-]*)/g)) {
        references.push({
          type: "class",

          name: className[1],

          kind: "querySelector",

          file: file.relative,

          line: getLine(content, match.index),
        });
      }
    }
  }

  return references;
}

// ------------------------------------------------------------
// HTML IDs / CLASSES
// ------------------------------------------------------------

function extractHtmlElements(files) {
  const elements = [];

  for (const file of files) {
    for (const match of file.content.matchAll(/\bid\s*=\s*["']([^"']+)["']/gi)) {
      elements.push({
        type: "id",

        name: match[1],

        file: file.relative,

        line: getLine(file.content, match.index),
      });
    }

    for (const match of file.content.matchAll(/\bclass\s*=\s*["']([^"']+)["']/gi)) {
      for (const className of match[1].split(/\s+/)) {
        if (!className) {
          continue;
        }

        elements.push({
          type: "class",

          name: className,

          file: file.relative,

          line: getLine(file.content, match.index),
        });
      }
    }
  }

  return elements;
}

// ------------------------------------------------------------
// UNUSED FUNCTIONS
// ------------------------------------------------------------

function findUnusedFunctions(functions, calls, inlineHandlers) {
  const calledNames = new Set(calls.map((call) => call.name));

  for (const handler of inlineHandlers) {
    calledNames.add(handler.name);
  }

  return functions.filter((func) => !calledNames.has(func.name));
}

// ------------------------------------------------------------
// MISSING GAS FUNCTIONS
// ------------------------------------------------------------

function findGasFiles() {
  const result = [];

  function scan(dir) {
    for (const entry of fs.readdirSync(dir, {
      withFileTypes: true,
    })) {
      if (IGNORED_DIRS.has(entry.name)) {
        continue;
      }

      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        scan(fullPath);
        continue;
      }

      if (path.extname(entry.name).toLowerCase() === ".gs") {
        result.push(fullPath);
      }
    }
  }

  scan(ROOT);

  return result;
}

function extractGasFunctions() {
  const functions = [];

  for (const file of findGasFiles()) {
    const content = fs.readFileSync(file, "utf8");

    const ast = parseJavaScript(content, relative(file));

    if (!ast) {
      continue;
    }

    walk(ast, (node) => {
      if (node.type === "FunctionDeclaration" && node.id?.type === "Identifier") {
        functions.push({
          name: node.id.name,

          file: relative(file),

          line: node.loc?.start.line,
        });
      }

      // const Foo = () => {}
      if (
        node.type === "VariableDeclarator" &&
        node.id?.type === "Identifier" &&
        (node.init?.type === "ArrowFunctionExpression" || node.init?.type === "FunctionExpression")
      ) {
        functions.push({
          name: node.id.name,

          file: relative(file),

          line: node.loc?.start.line,
        });
      }
    });
  }

  return functions;
}

function findMissingGasFunctions(googleCalls, gasFunctions) {
  const gasNames = new Set(gasFunctions.map((func) => func.name));

  return googleCalls.filter((call) => !gasNames.has(call.name));
}

// ------------------------------------------------------------
// MISSING DOM REFERENCES
// ------------------------------------------------------------

function findMissingDomReferences(domReferences, htmlElements) {
  const existing = new Set(htmlElements.map((element) => `${element.type}:${element.name}`));

  return domReferences.filter((reference) => !existing.has(`${reference.type}:${reference.name}`));
}

// ------------------------------------------------------------
// DUPLICATE IDS
// ------------------------------------------------------------

function findDuplicateIds(htmlElements) {
  const ids = htmlElements.filter((element) => element.type === "id");

  const map = new Map();

  for (const element of ids) {
    if (!map.has(element.name)) {
      map.set(element.name, []);
    }

    map.get(element.name).push(element);
  }

  return [...map.entries()]
    .filter(([, locations]) => locations.length > 1)
    .map(([name, locations]) => ({
      name,
      locations,
    }));
}

// ------------------------------------------------------------
// PARSING SUMMARY
// ------------------------------------------------------------

function countScripts(files) {
  let total = 0;
  let parsed = 0;

  for (const file of files) {
    for (const script of extractScripts(file)) {
      total++;

      if (parseJavaScript(script.code, file.relative)) {
        parsed++;
      }
    }
  }

  return {
    total,
    parsed,
  };
}

// ------------------------------------------------------------
// HELPERS
// ------------------------------------------------------------

function getLine(content, index) {
  return content.slice(0, index).split("\n").length;
}

function printTitle(title) {
  console.log("\n" + "═".repeat(65));

  console.log(` ${title}`);

  console.log("═".repeat(65));
}

function uniqueBy(items, key) {
  const seen = new Set();

  return items.filter((item) => {
    const value = key(item);

    if (seen.has(value)) {
      return false;
    }

    seen.add(value);

    return true;
  });
}

// ------------------------------------------------------------
// MAIN
// ------------------------------------------------------------

function main() {
  const files = loadFiles();

  const parsing = countScripts(files);

  const functions = extractFunctions(files);

  const calls = extractFunctionCalls(files);

  const googleCalls = extractGoogleScriptRunCalls(files);

  const inlineHandlers = extractInlineHandlers(files);

  const domReferences = extractDomReferences(files);

  const htmlElements = extractHtmlElements(files);

  const gasFunctions = extractGasFunctions();

  console.log("\n");

  console.log("╔══════════════════════════════════════════════════════════════╗");

  console.log("║                    HTML AUDIT                              ║");

  console.log("╚══════════════════════════════════════════════════════════════╝");

  console.log(`\n📄 Fichiers HTML analysés : ${files.length}`);

  console.log(`📜 Blocs <script>           : ${parsing.total}`);

  console.log(`✓ Scripts parsés            : ${parsing.parsed}/${parsing.total}`);

  // ----------------------------------------------------------
  // FUNCTIONS
  // ----------------------------------------------------------

  printTitle("FONCTIONS FRONT");

  console.log(`\n  Fonctions détectées : ${functions.length}`);

  for (const func of functions) {
    console.log(`  → ${func.name}() — ${func.file}:${func.line}`);
  }

  // ----------------------------------------------------------
  // UNUSED
  // ----------------------------------------------------------

  const unused = findUnusedFunctions(functions, calls, inlineHandlers);

  printTitle("FONCTIONS POTENTIELLEMENT INUTILISÉES");

  if (!unused.length) {
    console.log("\n✓ Aucune fonction manifestement inutilisée.");
  } else {
    for (const func of unused) {
      console.log(`\n  ⚠ ${func.name}()`);

      console.log(`    ${func.file}:${func.line}`);
    }

    console.log("\n  ℹ Vérifier avant suppression :");

    console.log("    une fonction peut être appelée depuis un autre");

    console.log("    fichier HTML, un attribut inline ou du contexte GAS.");
  }

  // ----------------------------------------------------------
  // GOOGLE SCRIPT RUN
  // ----------------------------------------------------------

  printTitle("APPELS google.script.run");

  const uniqueGoogleCalls = uniqueBy(
    googleCalls,
    (item) => `${item.name}:${item.file}:${item.line}`
  );

  if (!uniqueGoogleCalls.length) {
    console.log("\n  Aucun appel détecté.");
  } else {
    for (const call of uniqueGoogleCalls) {
      console.log(`\n  → ${call.name}()`);

      console.log(`    ${call.file}:${call.line}`);
    }
  }

  // ----------------------------------------------------------
  // MISSING GAS
  // ----------------------------------------------------------

  const missingGas = findMissingGasFunctions(googleCalls, gasFunctions);

  printTitle("APPELS GAS SANS FONCTION CORRESPONDANTE");

  if (!missingGas.length) {
    console.log("\n✓ Tous les appels google.script.run correspondent à une fonction GAS.");
  } else {
    for (const call of uniqueBy(missingGas, (item) => `${item.name}:${item.file}:${item.line}`)) {
      console.log(`\n  ⚠ ${call.name}()`);

      console.log(`    appelé depuis ${call.file}:${call.line}`);
    }
  }

  // ----------------------------------------------------------
  // INLINE EVENTS
  // ----------------------------------------------------------

  printTitle("ÉVÉNEMENTS HTML INLINE");

  if (!inlineHandlers.length) {
    console.log("\n✓ Aucun événement inline détecté.");
  } else {
    for (const handler of uniqueBy(
      inlineHandlers,
      (item) => `${item.event}:${item.name}:${item.file}:${item.line}`
    )) {
      console.log(`\n  → ${handler.event}="${handler.name}()"`);

      console.log(`    ${handler.file}:${handler.line}`);
    }
  }

  // ----------------------------------------------------------
  // DOM
  // ----------------------------------------------------------

  const missingDom = findMissingDomReferences(domReferences, htmlElements);

  printTitle("RÉFÉRENCES DOM INEXISTANTES");

  if (!missingDom.length) {
    console.log("\n✓ Toutes les références DOM détectées semblent correspondre à un élément HTML.");
  } else {
    for (const reference of uniqueBy(
      missingDom,
      (item) => `${item.type}:${item.name}:${item.file}:${item.line}`
    )) {
      console.log(`\n  ⚠ ${reference.type === "id" ? "#" : "."}${reference.name}`);

      console.log(`    ${reference.kind}`);

      console.log(`    ${reference.file}:${reference.line}`);
    }
  }

  // ----------------------------------------------------------
  // DUPLICATE IDS
  // ----------------------------------------------------------

  const duplicateIds = findDuplicateIds(htmlElements);

  printTitle("ID HTML DUPLIQUÉS");

  if (!duplicateIds.length) {
    console.log("\n✓ Aucun ID dupliqué détecté.");
  } else {
    for (const item of duplicateIds) {
      console.log(`\n  ⚠ #${item.name}`);

      for (const location of item.locations) {
        console.log(`    ${location.file}:${location.line}`);
      }
    }
  }

  // ----------------------------------------------------------
  // SUMMARY
  // ----------------------------------------------------------

  printTitle("RÉSUMÉ");

  console.log(`\n  Fichiers HTML                     ${files.length}`);

  console.log(`  Scripts                           ${parsing.total}`);

  console.log(`  Scripts parsés                    ${parsing.parsed}/${parsing.total}`);

  console.log(`  Fonctions front                   ${functions.length}`);

  console.log(`  Fonctions potentiellement mortes ${unused.length}`);

  console.log(`  Appels google.script.run          ${googleCalls.length}`);

  console.log(`  Appels GAS inexistants             ${missingGas.length}`);

  console.log(`  Références DOM inexistantes        ${missingDom.length}`);

  console.log(`  IDs dupliqués                      ${duplicateIds.length}`);

  console.log("\nℹ️ Les éléments signalés sont des pistes de vérification.");

  console.log("   Aucun fichier n'est modifié automatiquement.");

  console.log("\n");
}

main();
