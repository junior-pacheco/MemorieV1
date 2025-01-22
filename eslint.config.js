import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"], 
    rules: {
      "global-require": "off",
      "newline-per-chained-call": "off",
      "import/no-dynamic-require": "off",
      quotes: [
        "error",
        "single",
        {
          allowTemplateLiterals: true,
        },
      ],
      "class-methods-use-this": "off",
      indent: [
        "error",
        2,
      ],
    }, 
  },
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,

];