// import typescriptEslint from "@typescript-eslint/eslint-plugin";
// import globals from "globals";
// import tsParser from "@typescript-eslint/parser";
// import path from "node:path";
// import { fileURLToPath } from "node:url";
// import js from "@eslint/js";
// import { FlatCompat } from "@eslint/eslintrc";

const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const globals = require("globals");
const tsParser = require("@typescript-eslint/parser");
// const path = require("node:path");
// const {fileURLToPath} = require("node:url");
const js = require("@eslint/js");
const {FlatCompat} = require("@eslint/eslintrc");

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const compat = new FlatCompat({
//     baseDirectory: __dirname,
//     recommendedConfig: js.configs.recommended,
//     allConfig: js.configs.all
// });

module.exports = [{
    ignores: ["**/build/*", "**/node_modules/*", "**/public/*"],
}, {
    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        globals: {
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",
    },

    rules: {},
}];