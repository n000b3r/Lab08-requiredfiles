import globals    from "globals";
import pluginJs   from "@eslint/js";
import pluginSec  from "eslint-plugin-security";
import pluginNoU  from "eslint-plugin-no-unsanitized";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    plugins: {
      security:     pluginSec,
      "no‑unsanitized": pluginNoU,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      "security/detect-eval-with-expression": "error",
    },
  },
];
