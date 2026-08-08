const globals = require("globals");

module.exports = [
  {
    files: ["**/*.gs", "**/*.js"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",

      globals: {
        ...globals.es2021,

        // Google Apps Script
        SpreadsheetApp: "readonly",
        DriveApp: "readonly",
        GmailApp: "readonly",
        MailApp: "readonly",
        DocumentApp: "readonly",
        FormApp: "readonly",
        CalendarApp: "readonly",
        ScriptApp: "readonly",
        PropertiesService: "readonly",
        CacheService: "readonly",
        LockService: "readonly",
        UrlFetchApp: "readonly",
        Utilities: "readonly",
        Session: "readonly",
        ContentService: "readonly",
        HtmlService: "readonly",
        Logger: "readonly",
        Browser: "readonly",

        // GAS / HTML
        google: "readonly",
        console: "readonly",
      },
    },

    rules: {
      "no-undef": "error",

      "no-unused-vars": [
        "warn",
        {
          args: "after-used",
          ignoreRestSiblings: true,
        },
      ],

      "no-unreachable": "error",

      "no-constant-condition": "warn",

      "no-debugger": "warn",

      eqeqeq: ["warn", "always"],

      "no-var": "warn",

      "prefer-const": "warn",

      "no-duplicate-case": "error",

      "no-empty": "warn",

      "no-fallthrough": "warn",

      complexity: ["warn", 15],
    },
  },

  {
    ignores: ["node_modules/**", "eslint.config.js", "stylelint.config.js"],
  },
];
