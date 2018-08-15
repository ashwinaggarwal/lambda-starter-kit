module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "root": true,
  "parserOptions": {
      "ecmaVersion": 2017
  },
  "rules": {
      "arrow-body-style": 0,
      "comma-dangle": ['error', 'never'],
      "require-jsdoc": 0,
      "no-console": 0,
      "class-methods-use-this": 0,
      "no-useless-constructor": 0,
      "import/prefer-default-export": "off",
      "no-param-reassign": "off"
  }
};
