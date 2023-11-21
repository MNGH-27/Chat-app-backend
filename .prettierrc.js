module.exports = {
  semi: true,
  singleQuote: true,
  // trailingComma: '',
  arrowParens: 'always',
  printWidth: 200,
  tabWidth: 2,
  overrides: [
    {
      files: ['*.json', '*.md'],
      options: {
        parser: 'json',
        tabWidth: 2
      }
    },
    {
      files: '*.js', // Change the pattern as per your requirements
      options: {
        trailingComma: 'none',
        semi: false
      }
    }
  ]
}
