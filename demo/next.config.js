// Based on example in https://github.com/netlify/next-on-netlify/tree/master#1-set-nextjs-target-to-serverless
const withTranspile = require('next-transpile-modules')

module.exports = withTranspile(['react-json-input'])({
  target: 'serverless'
})
