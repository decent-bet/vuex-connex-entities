module.exports = {
  root: true,

  env: {
    browser: true,
    node: true
  },

  rules: {
    "import/prefer-default-export": "off",
    "no-console": "off",
    "no-debugger": "off",
    "no-underscore-dangle": "off",
    "import/extensions": "never",
    "comma-dangle": "off",
    "no-param-reassign": [
      "error",
      {
        props: true,
        ignorePropertyModificationsFor: [
          "state",
          "acc",
          "e",
          "ctx",
          "req",
          "request",
          "res",
          "response",
          "$scope"
        ]
      }
    ]
  },
  parserOptions: {
    parser: "@typescript-eslint/parser"
  },
  extends: ["@vue/typescript"],
  overrides: [
    {
      files: ["src/*.ts"]
    }
  ]
};
