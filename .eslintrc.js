module.exports = {
  "extends": "eslint-config-edx",
  "parser": "babel-eslint",
  "rules": {
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": [
          "config/*.js",
          "**/*.test.jsx"
        ]
      }
    ],
    "class-methods-use-this": [
      "off"
    ],
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/issues/340#issuecomment-338424908
    "jsx-a11y/anchor-is-valid": [ "error", {
      "components": [ "Link" ],
      "specialLink": [ "to" ]
    }]
  },
  "env": {
    "jest": true
  },
  "globals": {
    "page": true,
    "browser": true,
    "expectPage": true
  }
};
