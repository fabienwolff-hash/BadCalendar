const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");

const ROOT = process.cwd();

const JS_EXTENSIONS = [".gs", ".js"];
const HTML_EXTENSIONS = [".html"];

const IGNORED_DIRS = new Set(["node_modules", ".git", ".clasp", ".vscode"]);

// Fichiers techniques qui ne font pas partie
// du code métier de BadCalendar.
const IGNORED_FILES = new Set(["audit.js", "eslint.config.js", "stylelint.config.js"]);

// Points d'entrée Apps Script.
// Ils peuvent être appelés par Google sans apparaître
// comme des appels classiques dans le code.
const GAS_ENTRY_POINTS = new Set([
  "doGet",
  "doPost",
  "onOpen",
  "onInstall",
  "onEdit",
  "onChange",
  "onFormSubmit",
  "onSelectionChange",
]);

// ------------------------------------------------------------
// FICHIERS
// ------------------------------------------------------------

function getFiles(dir) {
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
      result.push(...getFiles(fullPath));
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();

    if (JS_EXTENSIONS.includes(ext) || HTML_EXTENSIONS.includes(ext)) {
      result.push(fullPath);
    }
  }

  return result;
}

function relative(file) {
  return path.relative(ROOT, file).replaceAll("\\", "/");
}

function loadFiles() {
  return getFiles(ROOT).map((file) => ({
    file,
    relative: relative(file),
    content: fs.readFileSync(file, "utf8"),
  }));
}

// ------------------------------------------------------------
// PARSEUR
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
        "classPrivateMethods",
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
// WALK AST
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
// SERVICES
// ------------------------------------------------------------

function extractServices(files) {
  const services = [];

  for (const file of files) {
    if (!JS_EXTENSIONS.includes(path.extname(file.file))) {
      continue;
    }

    const ast = parseJavaScript(file.content, file.relative);

    if (!ast) {
      continue;
    }

    walk(ast, (node) => {
      if (node.type !== "VariableDeclarator") {
        return;
      }

      if (node.id?.type !== "Identifier") {
        return;
      }

      if (node.init?.type !== "ObjectExpression") {
        return;
      }

      const serviceName = node.id.name;

      const looksLikeService = /Service$|Manager$|Repository$|Controller$|Helper$/.test(
        serviceName
      );

      if (!looksLikeService) {
        return;
      }

      const methods = [];

      for (const property of node.init.properties) {
        if (property.type !== "ObjectMethod") {
          continue;
        }

        if (property.key?.type !== "Identifier") {
          continue;
        }

        methods.push({
          name: property.key.name,

          private: property.key.name.endsWith("_"),

          line: property.loc?.start.line,
        });
      }

      services.push({
        name: serviceName,

        file: file.relative,

        line: node.loc?.start.line,

        methods,
      });
    });
  }

  return services;
}

// ------------------------------------------------------------
// FONCTIONS / MÉTHODES
// ------------------------------------------------------------

function extractFunctions(files) {
  const functions = [];

  for (const file of files) {
    if (!JS_EXTENSIONS.includes(path.extname(file.file))) {
      continue;
    }

    const ast = parseJavaScript(file.content, file.relative);

    if (!ast) {
      continue;
    }

    walk(ast, (node) => {
      // function foo() {}

      if (node.type === "FunctionDeclaration" && node.id) {
        functions.push({
          name: node.id.name,

          fullName: node.id.name,

          type: "function",

          file: file.relative,

          line: node.loc?.start.line,

          private: node.id.name.endsWith("_"),
        });

        return;
      }

      // const foo = () => {}
      // const foo = function () {}

      if (
        node.type === "VariableDeclarator" &&
        node.id?.type === "Identifier" &&
        (node.init?.type === "ArrowFunctionExpression" || node.init?.type === "FunctionExpression")
      ) {
        functions.push({
          name: node.id.name,

          fullName: node.id.name,

          type: node.init.type === "ArrowFunctionExpression" ? "arrow" : "function-expression",

          file: file.relative,

          line: node.loc?.start.line,

          private: node.id.name.endsWith("_"),
        });

        return;
      }

      // const Service = {
      //   read() {}
      // }

      if (node.type === "ObjectMethod") {
        const parentService = findParentServiceName(node, file.content);

        if (node.key?.type === "Identifier" && parentService) {
          const methodName = node.key.name;

          functions.push({
            name: methodName,

            fullName: `${parentService}.${methodName}`,

            type: "service-method",

            service: parentService,

            file: file.relative,

            line: node.loc?.start.line,

            private: methodName.endsWith("_"),
          });
        }
      }
    });
  }

  return functions;
}

function findParentServiceName(node, content) {
  const before = content.slice(0, node.start);

  const matches = [...before.matchAll(/(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*\{\s*$/gm)];

  if (!matches.length) {
    return null;
  }

  const candidate = matches[matches.length - 1][1];

  if (/Service$|Manager$|Repository$|Controller$|Helper$/.test(candidate)) {
    return candidate;
  }

  return null;
}

// ------------------------------------------------------------
// RÉFÉRENCES
// ------------------------------------------------------------

function extractReferences(files) {
  const references = [];

  for (const file of files) {
    if (!JS_EXTENSIONS.includes(path.extname(file.file))) {
      continue;
    }

    const ast = parseJavaScript(file.content, file.relative);

    if (!ast) {
      continue;
    }

    walk(ast, (node) => {
      // ------------------------------------------------------
      // foo()
      // ------------------------------------------------------

      if (node.type === "CallExpression" && node.callee?.type === "Identifier") {
        references.push({
          name: node.callee.name,

          fullName: node.callee.name,

          kind: "function-call",

          file: file.relative,

          line: node.loc?.start.line,
        });

        return;
      }

      // ------------------------------------------------------
      // Service.method()
      // ------------------------------------------------------

      if (node.type === "CallExpression" && node.callee?.type === "MemberExpression") {
        const object = node.callee.object;

        const property = node.callee.property;

        if (object?.type === "Identifier" && property?.type === "Identifier") {
          references.push({
            name: property.name,

            fullName: `${object.name}.${property.name}`,

            service: object.name,

            kind: "method-call",

            file: file.relative,

            line: node.loc?.start.line,
          });

          return;
        }
      }

      // ------------------------------------------------------
      // this.method()
      //
      // IMPORTANT :
      // on enregistre uniquement le nom de méthode.
      //
      // Cela permet de faire correspondre :
      //
      // this.readRows_()
      //
      // avec :
      //
      // Service.readRows_()
      //
      // sans prétendre connaître le service propriétaire.
      // ------------------------------------------------------

      if (
        node.type === "CallExpression" &&
        node.callee?.type === "MemberExpression" &&
        node.callee.object?.type === "ThisExpression" &&
        node.callee.property?.type === "Identifier"
      ) {
        const methodName = node.callee.property.name;

        references.push({
          name: methodName,

          fullName: methodName,

          kind: "this-method-call",

          file: file.relative,

          line: node.loc?.start.line,
        });

        return;
      }

      // ------------------------------------------------------
      // google.script.run.foo()
      // ------------------------------------------------------

      if (node.type === "CallExpression" && isGoogleScriptRunCall(node)) {
        const property = node.callee.property;

        if (property?.type === "Identifier") {
          references.push({
            name: property.name,

            fullName: property.name,

            kind: "google.script.run",

            file: file.relative,

            line: node.loc?.start.line,
          });
        }

        return;
      }

      // ------------------------------------------------------
      // Menu GAS
      //
      // .addItem("Vérifier", "verifyMaster")
      // ------------------------------------------------------

      if (
        node.type === "CallExpression" &&
        node.callee?.type === "MemberExpression" &&
        node.callee.property?.type === "Identifier" &&
        (node.callee.property.name === "addItem" || node.callee.property.name === "addButton")
      ) {
        const args = node.arguments || [];

        const functionArg = args[1];

        if (functionArg?.type === "StringLiteral") {
          references.push({
            name: functionArg.value,

            fullName: functionArg.value,

            kind: "gas-menu",

            file: file.relative,

            line: node.loc?.start.line,
          });
        }
      }
    });
  }

  return references;
}

function isGoogleScriptRunCall(node) {
  const callee = node.callee;

  if (!callee || callee.type !== "MemberExpression") {
    return false;
  }

  let object = callee.object;

  if (!object || object.type !== "MemberExpression") {
    return false;
  }

  if (object.property?.type !== "Identifier" || object.property.name !== "run") {
    return false;
  }

  object = object.object;

  if (object?.type !== "MemberExpression") {
    return false;
  }

  return (
    object.object?.type === "Identifier" &&
    object.object.name === "google" &&
    object.property?.type === "Identifier" &&
    object.property.name === "script"
  );
}

// ------------------------------------------------------------
// RÉFÉRENCES HTML
// ------------------------------------------------------------

function extractHtmlReferences(files) {
  const references = [];

  for (const file of files) {
    if (!HTML_EXTENSIONS.includes(path.extname(file.file))) {
      continue;
    }

    // <?!= include('xxx') ?>
    for (const match of file.content.matchAll(/include\s*\(\s*["']([^"']+)["']\s*\)/g)) {
      references.push({
        name: "include",

        fullName: match[1],

        kind: "html-include",

        file: file.relative,

        line: getLine(file.content, match.index),
      });
    }

    // google.script.run.foo(...)
    for (const match of file.content.matchAll(/google\.script\.run\.([A-Za-z_$][\w$]*)\s*\(/g)) {
      references.push({
        name: match[1],

        fullName: match[1],

        kind: "html-google.script.run",

        file: file.relative,

        line: getLine(file.content, match.index),
      });
    }
  }

  return references;
}

// ------------------------------------------------------------
// UNUSED
// ------------------------------------------------------------

function findUnusedFunctions(functions, references) {
  const exactReferences = new Set(references.map((reference) => reference.fullName));

  const simpleReferences = new Set(references.map((reference) => reference.name));

  return functions.filter((func) => {
    // Entrées GAS
    if (GAS_ENTRY_POINTS.has(func.name)) {
      return false;
    }

    // Méthode appelée exactement :
    // TournamentService.read()
    if (exactReferences.has(func.fullName)) {
      return false;
    }

    // Méthode appelée par :
    // this.read()
    //
    // On utilise ici le nom simple.
    if (func.type === "service-method" && simpleReferences.has(func.name)) {
      return false;
    }

    // Fonction globale appelée depuis :
    // google.script.run.foo()
    // ou le HTML.
    if (simpleReferences.has(func.name)) {
      return false;
    }

    return true;
  });
}

// ------------------------------------------------------------
// MÉTHODES PRIVÉES
// ------------------------------------------------------------

function findUnusedPrivateMethods(functions, references) {
  const referencedNames = new Set(
    references
      .filter(
        (reference) => reference.kind === "this-method-call" || reference.kind === "method-call"
      )
      .map((reference) => reference.name)
  );

  return functions.filter(
    (func) => func.private && func.type === "service-method" && !referencedNames.has(func.name)
  );
}

// ------------------------------------------------------------
// DÉPENDANCES
// ------------------------------------------------------------

function buildServiceDependencies(services, references) {
  const serviceNames = new Set(services.map((service) => service.name));

  const dependencies = new Map();

  for (const service of services) {
    dependencies.set(service.name, new Set());
  }

  for (const reference of references) {
    if (!reference.service) {
      continue;
    }

    if (!serviceNames.has(reference.service)) {
      continue;
    }

    const owner = findOwningService(reference, services);

    if (owner && owner !== reference.service) {
      dependencies.get(owner).add(reference.service);
    }
  }

  return dependencies;
}

function findOwningService(reference, services) {
  const candidates = services.filter((service) => service.file === reference.file);

  if (candidates.length === 1) {
    return candidates[0].name;
  }

  return null;
}

// ------------------------------------------------------------
// CSS
// ------------------------------------------------------------

function extractStyleBlocks(html) {
  const blocks = [];

  const regex = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;

  for (const match of html.matchAll(regex)) {
    blocks.push({
      css: match[1],

      offset: match.index,
    });
  }

  return blocks;
}

function extractCssSelectors(files) {
  const selectors = [];

  for (const file of files) {
    if (!HTML_EXTENSIONS.includes(path.extname(file.file))) {
      continue;
    }

    for (const block of extractStyleBlocks(file.content)) {
      for (const match of block.css.matchAll(/(?:^|[,{]\s*)([^{}]+)\s*\{/g)) {
        const selectorText = match[1].trim();

        if (selectorText.startsWith("@")) {
          continue;
        }

        for (const classMatch of selectorText.matchAll(/\.([a-zA-Z_][\w-]*)/g)) {
          selectors.push({
            type: "class",

            name: classMatch[1],

            file: file.relative,

            line: getLine(file.content, block.offset + match.index),
          });
        }

        for (const idMatch of selectorText.matchAll(/#([a-zA-Z_][\w-]*)/g)) {
          selectors.push({
            type: "id",

            name: idMatch[1],

            file: file.relative,

            line: getLine(file.content, block.offset + match.index),
          });
        }
      }
    }
  }

  return uniqueBy(selectors, (item) => `${item.type}:${item.name}:${item.file}:${item.line}`);
}

function findCssUsages(files, selector) {
  const usages = [];

  const name = escapeRegExp(selector.name);

  for (const file of files) {
    let patterns;

    if (selector.type === "class") {
      patterns = [
        new RegExp(`class\\s*=\\s*["'][^"']*\\b${name}\\b`, "i"),

        new RegExp(`classList\\.(?:add|remove|toggle|contains)\\([^)]*["']${name}["']`, "i"),

        new RegExp(`className\\s*=\\s*["'][^"']*\\b${name}\\b`, "i"),

        new RegExp(`querySelector(?:All)?\\([^)]*[.]${name}\\b`, "i"),
      ];
    } else {
      patterns = [
        new RegExp(`id\\s*=\\s*["']${name}["']`, "i"),

        new RegExp(`getElementById\\([^)]*["']${name}["']`, "i"),

        new RegExp(`querySelector(?:All)?\\([^)]*#${name}\\b`, "i"),
      ];
    }

    if (patterns.some((pattern) => pattern.test(file.content))) {
      usages.push(file.relative);
    }
  }

  return usages;
}

// ------------------------------------------------------------
// CSS DYNAMIQUE
// ------------------------------------------------------------

function findDynamicCss(files) {
  const result = [];

  for (const file of files) {
    if (!JS_EXTENSIONS.includes(path.extname(file.file))) {
      continue;
    }

    const ast = parseJavaScript(file.content, file.relative);

    if (!ast) {
      continue;
    }

    walk(ast, (node) => {
      if (node.type !== "TemplateLiteral") {
        return;
      }

      const raw = node.quasis.map((item) => item.value.raw).join("${...}");

      if (/class|badge|status|state|type|theme/i.test(raw)) {
        result.push({
          file: file.relative,

          line: node.loc?.start.line,

          pattern: raw,
        });
      }
    });
  }

  return result;
}

// ------------------------------------------------------------
// PERFORMANCE GAS
// ------------------------------------------------------------

function findSpreadsheetCallsInLoops(files) {
  const issues = [];

  for (const file of files) {
    if (!file.file.endsWith(".gs")) {
      continue;
    }

    const ast = parseJavaScript(file.content, file.relative);

    if (!ast) {
      continue;
    }

    walk(ast, (node) => {
      const loopTypes = [
        "ForStatement",
        "ForInStatement",
        "ForOfStatement",
        "WhileStatement",
        "DoWhileStatement",
      ];

      if (!loopTypes.includes(node.type)) {
        return;
      }

      walk(node.body, (child) => {
        if (child.type !== "CallExpression") {
          return;
        }

        const text = file.content.slice(child.start, child.end);

        if (/(getRange|getValue|getValues|setValue|setValues|appendRow|deleteRow)/.test(text)) {
          issues.push({
            file: file.relative,

            line: child.loc?.start.line,

            code: text,
          });
        }
      });
    });
  }

  return uniqueBy(issues, (issue) => `${issue.file}:${issue.line}:${issue.code}`);
}

// ------------------------------------------------------------
// UTILITAIRES
// ------------------------------------------------------------

function getLine(content, index) {
  return content.slice(0, index).split("\n").length;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function uniqueBy(items, keyFunction) {
  const seen = new Set();

  return items.filter((item) => {
    const key = keyFunction(item);

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);

    return true;
  });
}

function printList(items, formatter) {
  for (const item of items) {
    console.log(formatter(item));
  }
}

function header(title) {
  console.log("\n" + "═".repeat(65));

  console.log(` ${title}`);

  console.log("═".repeat(65));
}

// ------------------------------------------------------------
// MAIN
// ------------------------------------------------------------

function main() {
  const files = loadFiles();

  const jsFiles = files.filter((file) => JS_EXTENSIONS.includes(path.extname(file.file)));

  const htmlFiles = files.filter((file) => HTML_EXTENSIONS.includes(path.extname(file.file)));

  console.log("\n");

  console.log("╔══════════════════════════════════════════════════════════════╗");

  console.log("║                  AUDIT BADCALENDAR V4                       ║");

  console.log("╚══════════════════════════════════════════════════════════════╝");

  console.log(`\n📁 Fichiers JS/GAS : ${jsFiles.length}`);

  console.log(`📄 Fichiers HTML   : ${htmlFiles.length}`);

  console.log(`📦 Total           : ${files.length}`);

  // ----------------------------------------------------------
  // AST
  // ----------------------------------------------------------

  header("ANALYSE AST");

  let parsed = 0;

  for (const file of jsFiles) {
    if (parseJavaScript(file.content, file.relative)) {
      parsed++;
    }
  }

  console.log(`\n✓ ${parsed}/${jsFiles.length} fichiers JS/GAS analysés.`);

  if (parsed !== jsFiles.length) {
    console.log("\n⚠ Certains fichiers n'ont pas pu être analysés.");
  }

  // ----------------------------------------------------------
  // SERVICES
  // ----------------------------------------------------------

  const services = extractServices(jsFiles);

  header("SERVICES");

  console.log(`\nServices détectés : ${services.length}`);

  for (const service of services) {
    console.log(`\n  ${service.name}`);

    console.log(`    ${service.file}:${service.line}`);

    for (const method of service.methods) {
      console.log(`    ├─ ${method.name}()` + (method.private ? " 🔒" : ""));
    }
  }

  // ----------------------------------------------------------
  // FONCTIONS
  // ----------------------------------------------------------

  const functions = extractFunctions(jsFiles);

  const references = extractReferences(jsFiles);

  const htmlReferences = extractHtmlReferences(htmlFiles);

  const allReferences = [...references, ...htmlReferences];

  // ----------------------------------------------------------
  // UNUSED
  // ----------------------------------------------------------

  header("ÉLÉMENTS POTENTIELLEMENT INUTILISÉS");

  const unused = findUnusedFunctions(functions, allReferences);

  if (unused.length) {
    printList(
      unused,
      (func) =>
        `\n  ⚠ ${func.fullName}()\n` + `    ${func.file}:${func.line}\n` + `    type : ${func.type}`
    );
  } else {
    console.log("\n✓ Aucun élément manifestement inutilisé.");
  }

  // ----------------------------------------------------------
  // PRIVATE
  // ----------------------------------------------------------

  const unusedPrivate = findUnusedPrivateMethods(functions, allReferences);

  if (unusedPrivate.length) {
    header("MÉTHODES PRIVÉES À VÉRIFIER");

    printList(
      unusedPrivate,
      (func) => `\n  ⚠ ${func.fullName}()\n` + `    ${func.file}:${func.line}`
    );
  } else {
    header("MÉTHODES PRIVÉES");

    console.log("\n✓ Toutes les méthodes privées semblent référencées.");
  }

  // ----------------------------------------------------------
  // GOOGLE SCRIPT RUN
  // ----------------------------------------------------------

  const remoteCalls = allReferences.filter(
    (reference) =>
      reference.kind === "google.script.run" || reference.kind === "html-google.script.run"
  );

  header("APPELS google.script.run");

  if (remoteCalls.length) {
    printList(
      uniqueBy(remoteCalls, (item) => `${item.fullName}:${item.file}:${item.line}`),
      (item) => `  ✓ ${item.fullName}() — ${item.file}:${item.line}`
    );
  } else {
    console.log("\n  Aucun appel détecté.");
  }

  // ----------------------------------------------------------
  // HTML INCLUDE
  // ----------------------------------------------------------

  const includes = htmlReferences.filter((reference) => reference.kind === "html-include");

  header("INCLUDES HTML");

  if (includes.length) {
    printList(
      uniqueBy(includes, (item) => `${item.fullName}:${item.file}:${item.line}`),
      (item) => `  ✓ include('${item.fullName}') — ` + `${item.file}:${item.line}`
    );
  } else {
    console.log("\n  Aucun include détecté.");
  }

  // ----------------------------------------------------------
  // SERVICES
  // ----------------------------------------------------------

  const methodCalls = allReferences.filter((reference) => reference.kind === "method-call");

  header("APPELS DE SERVICES");

  if (methodCalls.length) {
    printList(
      uniqueBy(methodCalls, (item) => `${item.fullName}:${item.file}:${item.line}`),
      (item) => `  → ${item.fullName}() — ` + `${item.file}:${item.line}`
    );
  } else {
    console.log("\n  Aucun appel Service.method() détecté.");
  }

  // ----------------------------------------------------------
  // THIS
  // ----------------------------------------------------------

  const thisCalls = allReferences.filter((reference) => reference.kind === "this-method-call");

  header("APPELS this.method()");

  if (thisCalls.length) {
    printList(
      uniqueBy(thisCalls, (item) => `${item.fullName}:${item.file}:${item.line}`),
      (item) => `  → this.${item.fullName}() — ` + `${item.file}:${item.line}`
    );
  } else {
    console.log("\n  Aucun appel this.method() détecté.");
  }

  // ----------------------------------------------------------
  // DEPENDENCIES
  // ----------------------------------------------------------

  const dependencies = buildServiceDependencies(services, methodCalls);

  header("DÉPENDANCES ENTRE SERVICES");

  let hasDependencies = false;

  for (const [serviceName, deps] of dependencies) {
    if (!deps.size) {
      continue;
    }

    hasDependencies = true;

    console.log(`\n  ${serviceName}`);

    for (const dependency of deps) {
      console.log(`    └─ ${dependency}`);
    }
  }

  if (!hasDependencies) {
    console.log("\n  Aucune dépendance détectée.");
  }

  // ----------------------------------------------------------
  // CSS
  // ----------------------------------------------------------

  const selectors = extractCssSelectors(htmlFiles);

  const dynamicCss = findDynamicCss(jsFiles);

  header("CSS");

  console.log(`\nSélecteurs analysés : ${selectors.length}`);

  const unusedCss = [];

  for (const selector of selectors) {
    const usages = findCssUsages(files, selector);

    if (usages.length === 0) {
      unusedCss.push(selector);
    }
  }

  if (unusedCss.length) {
    console.log("\n⚠ CSS POTENTIELLEMENT INUTILISÉ");

    printList(
      unusedCss,
      (selector) =>
        `\n  ${selector.type === "class" ? "." : "#"}${selector.name}\n` +
        `    ${selector.file}:${selector.line}`
    );
  } else {
    console.log("\n✓ Aucun sélecteur manifestement inutilisé.");
  }

  if (dynamicCss.length) {
    console.log("\n↪ CSS DYNAMIQUE DÉTECTÉ");

    printList(dynamicCss, (item) => `\n  ${item.file}:${item.line}\n` + `    ${item.pattern}`);
  }

  // ----------------------------------------------------------
  // PERFORMANCE
  // ----------------------------------------------------------

  const performanceIssues = findSpreadsheetCallsInLoops(jsFiles);

  header("PERFORMANCE GAS");

  if (performanceIssues.length) {
    console.log("\n⚠ APPELS SPREADSHEET DANS DES BOUCLES");

    printList(performanceIssues, (item) => `\n  ${item.file}:${item.line}\n` + `    ${item.code}`);
  } else {
    console.log("\n✓ Aucun appel Spreadsheet évident dans une boucle.");
  }

  // ----------------------------------------------------------
  // RÉSUMÉ
  // ----------------------------------------------------------

  header("RÉSUMÉ");

  console.log(`\n  Fichiers                         ${files.length}`);

  console.log(`  Fichiers JS/GAS                 ${jsFiles.length}`);

  console.log(`  Fichiers correctement parsés   ${parsed}/${jsFiles.length}`);

  console.log(`  Services                        ${services.length}`);

  console.log(`  Fonctions / méthodes            ${functions.length}`);

  console.log(`  Éléments à vérifier             ${unused.length}`);

  console.log(`  Méthodes privées à vérifier     ${unusedPrivate.length}`);

  console.log(`  Sélecteurs CSS                  ${selectors.length}`);

  console.log(`  CSS potentiellement inutilisé   ${unusedCss.length}`);

  console.log(`  CSS dynamique                    ${dynamicCss.length}`);

  console.log(`  Alertes performance GAS         ${performanceIssues.length}`);

  console.log("\nℹ️ Cet audit fournit des pistes.");

  console.log("   Il ne modifie ni ne supprime aucun fichier.");

  console.log("\n");
}

main();
