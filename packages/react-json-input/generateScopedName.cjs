const path = require('path')

module.exports = (className, filename) => `react-json-input__${path.relative(__dirname, filename).replace(/[/\\]/g, '_')}__${className}`
