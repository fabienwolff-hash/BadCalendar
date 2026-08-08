const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const IGNORED_DIRS = new Set([
  "node_modules",
  ".git",
  ".clasp",
  ".vscode"
]);

const IGNORED_FILES = new Set([
  "audit.js",
  "css-audit.js",
  "eslint.config.js",
  "stylelint.config.js"
]);

// ------------------------------------------------------------
// FILES
// ------------------------------------------------------------

function getFiles(dir) {
  const result = [];

  for (const entry of fs.readdirSync(dir, {
    withFileTypes: true
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

    if (
      path.extname(entry.name).toLowerCase() === ".html"
    ) {
      result.push(fullPath);
    }
  }

  return result;
}

function relative(file) {
  return path.relative(ROOT, file).replaceAll("\\", "/");
}

// ------------------------------------------------------------
// STYLE BLOCKS
// ------------------------------------------------------------

function extractStyleBlocks(file) {
  const blocks = [];

  const regex =
    /<style\b[^>]*>([\s\S]*?)<\/style>/gi;

  for (const match of file.content.matchAll(regex)) {
    blocks.push({
      css: match[1],
      offset: match.index
    });
  }

  return blocks;
}

// ------------------------------------------------------------
// CSS RULES
// ------------------------------------------------------------

function removeComments(css) {
  return css.replace(
    /\/\*[\s\S]*?\*\//g,
    ""
  );
}

function extractRules(file) {
  const rules = [];

  for (const block of extractStyleBlocks(file)) {
    const css = removeComments(block.css);

    const regex =
      /([^{}]+)\{([^{}]*)\}/g;

    for (const match of css.matchAll(regex)) {
      const selectorText =
        match[1].trim();

      const declarations =
        match[2].trim();

      if (
        !selectorText ||
        selectorText.startsWith("@")
      ) {
        continue;
      }

      rules.push({
        selectors: selectorText
          .split(",")
          .map(s => s.trim())
          .filter(Boolean),

        declarations,

        file: file.relative,

        line: getLine(
          file.content,
          block.offset + match.index
        )
      });
    }
  }

  return rules;
}

// ------------------------------------------------------------
// SELECTORS
// ------------------------------------------------------------

function extractSelectorReferences(
  files
) {
  const references = {
    classes: new Set(),
    ids: new Set()
  };

  for (const file of files) {
    const content = file.content;

    // class="foo bar"
    for (
      const match of content.matchAll(
        /class\s*=\s*["']([^"']+)["']/gi
      )
    ) {
      for (
        const className of match[1].split(/\s+/)
      ) {
        if (className) {
          references.classes.add(
            className
          );
        }
      }
    }

    // id="foo"
    for (
      const match of content.matchAll(
        /id\s*=\s*["']([^"']+)["']/gi
      )
    ) {
      references.ids.add(
        match[1]
      );
    }

    // classList.add/remove/toggle/contains("foo")
    for (
      const match of content.matchAll(
        /classList\.(?:add|remove|toggle|contains)\s*\(([^)]*)\)/gi
      )
    ) {
      for (
        const classMatch of match[1].matchAll(
          /["']([^"']+)["']/g
        )
      ) {
        references.classes.add(
          classMatch[1]
        );
      }
    }

    // className = "foo"
    for (
      const match of content.matchAll(
        /className\s*=\s*["']([^"']+)["']/gi
      )
    ) {
      for (
        const className of match[1].split(/\s+/)
      ) {
        if (className) {
          references.classes.add(
            className
          );
        }
      }
    }

    // querySelector(".foo")
    for (
      const match of content.matchAll(
        /querySelector(?:All)?\s*\(\s*["']([^"']+)["']/gi
      )
    ) {
      extractSelectorFromQuery(
        match[1],
        references
      );
    }

    // getElementById("foo")
    for (
      const match of content.matchAll(
        /getElementById\s*\(\s*["']([^"']+)["']/gi
      )
    ) {
      references.ids.add(
        match[1]
      );
    }
  }

  return references;
}

function extractSelectorFromQuery(
  selector,
  references
) {
  for (
    const match of selector.matchAll(
      /\.([a-zA-Z_][\w-]*)/g
    )
  ) {
    references.classes.add(
      match[1]
    );
  }

  for (
    const match of selector.matchAll(
      /#([a-zA-Z_][\w-]*)/g
    )
  ) {
    references.ids.add(
      match[1]
    );
  }
}

// ------------------------------------------------------------
// DYNAMIC CLASSES
// ------------------------------------------------------------

function extractDynamicReferences(
  files
) {
  const dynamicClasses = new Set();

  for (const file of files) {
    const content = file.content;

    // ${type} dans un template literal lié à une classe
    for (
      const match of content.matchAll(
        /class(?:Name)?\s*[^=]*=\s*`([^`]+)`/gi
      )
    ) {
      const template = match[1];

      for (
        const classMatch of template.matchAll(
          /([a-zA-Z_-]+)\$\{/g
        )
      ) {
        dynamicClasses.add(
          classMatch[1]
        );
      }
    }

    // classList.add(`badge-${type}`)
    for (
      const match of content.matchAll(
        /classList\.(?:add|remove|toggle)\s*\(\s*`([^`]+)`/gi
      )
    ) {
      const template = match[1];

      for (
        const classMatch of template.matchAll(
          /([a-zA-Z_-]+)\$\{/g
        )
      ) {
        dynamicClasses.add(
          classMatch[1]
        );
      }
    }
  }

  return dynamicClasses;
}

// ------------------------------------------------------------
// UNUSED SELECTORS
// ------------------------------------------------------------

function findUnusedSelectors(
  rules,
  references,
  dynamicReferences
) {
  const results = [];

  const seen = new Set();

  for (const rule of rules) {
    for (const selector of rule.selectors) {
      const classes = [
        ...selector.matchAll(
          /\.([a-zA-Z_][\w-]*)/g
        )
      ];

      const ids = [
        ...selector.matchAll(
          /#([a-zA-Z_][\w-]*)/g
        )
      ];

      for (const match of classes) {
        const name = match[1];

        const key =
          `class:${name}:${rule.file}:${rule.line}`;

        if (seen.has(key)) {
          continue;
        }

        seen.add(key);

        if (
          references.classes.has(name)
        ) {
          continue;
        }

        // Cas dynamique :
        // badge-${type}
        const dynamicPrefix =
          [...dynamicReferences].some(
            prefix =>
              name.startsWith(prefix)
          );

        if (dynamicPrefix) {
          continue;
        }

        results.push({
          type: "class",
          name,
          selector,
          file: rule.file,
          line: rule.line
        });
      }

      for (const match of ids) {
        const name = match[1];

        const key =
          `id:${name}:${rule.file}:${rule.line}`;

        if (seen.has(key)) {
          continue;
        }

        seen.add(key);

        if (
          references.ids.has(name)
        ) {
          continue;
        }

        results.push({
          type: "id",
          name,
          selector,
          file: rule.file,
          line: rule.line
        });
      }
    }
  }

  return results;
}

// ------------------------------------------------------------
// DUPLICATE SELECTORS
// ------------------------------------------------------------

function findDuplicateSelectors(
  rules
) {
  const occurrences = new Map();

  for (const rule of rules) {
    for (const selector of rule.selectors) {
      if (!occurrences.has(selector)) {
        occurrences.set(
          selector,
          []
        );
      }

      occurrences
        .get(selector)
        .push({
          file: rule.file,
          line: rule.line
        });
    }
  }

  return [...occurrences.entries()]
    .filter(
      ([, locations]) =>
        locations.length > 1
    )
    .map(
      ([selector, locations]) => ({
        selector,
        locations
      })
    );
}

// ------------------------------------------------------------
// DUPLICATE PROPERTIES
// ------------------------------------------------------------

function parseDeclarations(
  declarations
) {
  const properties = [];

  for (
    const match of declarations.matchAll(
      /([-\w]+)\s*:\s*([^;]+);?/g
    )
  ) {
    properties.push({
      property: match[1],
      value: match[2].trim()
    });
  }

  return properties;
}

function findDuplicateProperties(
  rules
) {
  const results = [];

  for (const rule of rules) {
    const declarations =
      parseDeclarations(
        rule.declarations
      );

    const seen = new Map();

    for (const declaration of declarations) {
      if (
        seen.has(
          declaration.property
        )
      ) {
        results.push({
          selector:
            rule.selectors.join(", "),

          property:
            declaration.property,

          file:
            rule.file,

          line:
            rule.line
        });
      }

      seen.set(
        declaration.property,
        declaration.value
      );
    }
  }

  return results;
}

// ------------------------------------------------------------
// IMPORTANT
// ------------------------------------------------------------

function findImportant(
  rules
) {
  const results = [];

  for (const rule of rules) {
    const declarations =
      parseDeclarations(
        rule.declarations
      );

    for (const declaration of declarations) {
      if (
        declaration.value
          .includes("!important")
      ) {
        results.push({
          selector:
            rule.selectors.join(", "),

          property:
            declaration.property,

          file:
            rule.file,

          line:
            rule.line
        });
      }
    }
  }

  return results;
}

// ------------------------------------------------------------
// COLORS
// ------------------------------------------------------------

function findColors(
  rules
) {
  const colors = new Map();

  const colorRegex =
    /#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)/g;

  for (const rule of rules) {
    for (
      const match of
        rule.declarations.matchAll(
          colorRegex
        )
    ) {
      const color =
        match[0].toLowerCase();

      if (!colors.has(color)) {
        colors.set(
          color,
          []
        );
      }

      colors.get(color).push({
        selector:
          rule.selectors.join(", "),

        file:
          rule.file,

        line:
          rule.line
      });
    }
  }

  return [...colors.entries()]
    .filter(
      ([, locations]) =>
        locations.length >= 3
    )
    .sort(
      (a, b) =>
        b[1].length -
        a[1].length
    );
}

// ------------------------------------------------------------
// SIMILAR RULES
// ------------------------------------------------------------

function normalizeDeclarations(
  declarations
) {
  return parseDeclarations(
    declarations
  )
    .map(
      item =>
        `${item.property}:${item.value}`
    )
    .sort()
    .join(";")
    .toLowerCase();
}

function findSimilarRules(
  rules
) {
  const groups = new Map();

  for (const rule of rules) {
    const normalized =
      normalizeDeclarations(
        rule.declarations
      );

    if (!normalized) {
      continue;
    }

    if (!groups.has(normalized)) {
      groups.set(
        normalized,
        []
      );
    }

    groups
      .get(normalized)
      .push(rule);
  }

  return [...groups.values()]
    .filter(
      group =>
        group.length >= 2
    );
}

// ------------------------------------------------------------
// HELPERS
// ------------------------------------------------------------

function getLine(
  content,
  index
) {
  return (
    content
      .slice(0, index)
      .split("\n")
      .length
  );
}

function printTitle(title) {
  console.log(
    "\n" +
    "═".repeat(65)
  );

  console.log(
    ` ${title}`
  );

  console.log(
    "═".repeat(65)
  );
}

// ------------------------------------------------------------
// MAIN
// ------------------------------------------------------------

function main() {
  const files =
    getFiles(ROOT).map(
      file => ({
        file,
        relative:
          relative(file),
        content:
          fs.readFileSync(
            file,
            "utf8"
          )
      })
    );

  const rules =
    files.flatMap(
      file =>
        extractRules(file)
    );

  const references =
    extractSelectorReferences(
      files
    );

  const dynamicReferences =
    extractDynamicReferences(
      files
    );

  console.log(
    "\n"
  );

  console.log(
    "╔══════════════════════════════════════════════════════════════╗"
  );

  console.log(
    "║                    CSS AUDIT                               ║"
  );

  console.log(
    "╚══════════════════════════════════════════════════════════════╝"
  );

  console.log(
    `\n📄 Fichiers HTML analysés : ${files.length}`
  );

  console.log(
    `🎨 Règles CSS analysées    : ${rules.length}`
  );

  // ----------------------------------------------------------
  // UNUSED
  // ----------------------------------------------------------

  const unused =
    findUnusedSelectors(
      rules,
      references,
      dynamicReferences
    );

  printTitle(
    "SÉLECTEURS POTENTIELLEMENT INUTILISÉS"
  );

  if (!unused.length) {
    console.log(
      "\n✓ Aucun sélecteur manifestement inutilisé."
    );
  } else {
    for (const item of unused) {
      console.log(
        `\n  ⚠ ${
          item.type === "class"
            ? "."
            : "#"
        }${item.name}`
      );

      console.log(
        `    ${item.file}:${item.line}`
      );

      console.log(
        `    règle : ${item.selector}`
      );
    }
  }

  // ----------------------------------------------------------
  // DUPLICATES
  // ----------------------------------------------------------

  const duplicates =
    findDuplicateSelectors(
      rules
    );

  printTitle(
    "SÉLECTEURS DÉFINIS PLUSIEURS FOIS"
  );

  if (!duplicates.length) {
    console.log(
      "\n✓ Aucun doublon de sélecteur."
    );
  } else {
    for (const item of duplicates) {
      console.log(
        `\n  ⚠ ${item.selector}`
      );

      for (
        const location of
          item.locations
      ) {
        console.log(
          `    ${location.file}:${location.line}`
        );
      }
    }
  }

  // ----------------------------------------------------------
  // DUPLICATE PROPERTIES
  // ----------------------------------------------------------

  const duplicateProperties =
    findDuplicateProperties(
      rules
    );

  printTitle(
    "PROPRIÉTÉS DUPLIQUÉES"
  );

  if (
    !duplicateProperties.length
  ) {
    console.log(
      "\n✓ Aucune propriété dupliquée dans une même règle."
    );
  } else {
    for (
      const item of
        duplicateProperties
    ) {
      console.log(
        `\n  ⚠ ${item.selector}`
      );

      console.log(
        `    ${item.property}`
      );

      console.log(
        `    ${item.file}:${item.line}`
      );
    }
  }

  // ----------------------------------------------------------
  // IMPORTANT
  // ----------------------------------------------------------

  const important =
    findImportant(
      rules
    );

  printTitle(
    "!IMPORTANT"
  );

  if (!important.length) {
    console.log(
      "\n✓ Aucun !important."
    );
  } else {
    for (
      const item of important
    ) {
      console.log(
        `\n  ⚠ ${item.selector}`
      );

      console.log(
        `    ${item.property}`
      );

      console.log(
        `    ${item.file}:${item.line}`
      );
    }
  }

  // ----------------------------------------------------------
  // COLORS
  // ----------------------------------------------------------

  const colors =
    findColors(
      rules
    );

  printTitle(
    "COULEURS RÉPÉTÉES"
  );

  if (!colors.length) {
    console.log(
      "\n✓ Pas de couleur fortement répétée."
    );
  } else {
    for (
      const [
        color,
        locations
      ] of colors
    ) {
      console.log(
        `\n  ${color} — ${locations.length} occurrences`
      );

      for (
        const location of
          locations.slice(0, 5)
      ) {
        console.log(
          `    ${location.file}:${location.line}`
        );
      }

      if (
        locations.length > 5
      ) {
        console.log(
          `    ... ${
            locations.length - 5
          } autres`
        );
      }
    }
  }

  // ----------------------------------------------------------
  // SIMILAR RULES
  // ----------------------------------------------------------

  const similar =
    findSimilarRules(
      rules
    );

  printTitle(
    "RÈGLES CSS IDENTIQUES / TRÈS SIMILAIRES"
  );

  if (!similar.length) {
    console.log(
      "\n✓ Aucune répétition évidente."
    );
  } else {
    for (const group of similar) {
      console.log(
        "\n  ⚠ Même ensemble de propriétés :"
      );

      for (
        const rule of group
      ) {
        console.log(
          `    ${rule.selectors.join(", ")} — ` +
          `${rule.file}:${rule.line}`
        );
      }
    }
  }

  // ----------------------------------------------------------
  // SUMMARY
  // ----------------------------------------------------------

  printTitle(
    "RÉSUMÉ"
  );

  console.log(
    `\n  Fichiers HTML analysés          ${files.length}`
  );

  console.log(
    `  Règles CSS                      ${rules.length}`
  );

  console.log(
    `  Sélecteurs potentiellement morts ${unused.length}`
  );

  console.log(
    `  Sélecteurs dupliqués             ${duplicates.length}`
  );

  console.log(
    `  Propriétés dupliquées             ${duplicateProperties.length}`
  );

  console.log(
    `  !important                        ${important.length}`
  );

  console.log(
    `  Couleurs fortement répétées       ${colors.length}`
  );

  console.log(
    `  Groupes CSS similaires             ${similar.length}`
  );

  console.log(
    "\nℹ️ Les éléments signalés sont des pistes de vérification."
  );

  console.log(
    "   Aucun fichier n'est modifié automatiquement."
  );

  console.log("\n");
}

main();