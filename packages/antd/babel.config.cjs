module.exports = process.env.NODE_ENV === 'test'
  ? {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }],
      '@babel/preset-typescript',
      '@babel/preset-react'
    ],
    plugins: [
      'react-require'
    ]
  }
  : {
    presets: [
      // Node 12 because next.js doesn't support nullish ??
      ['@babel/preset-env', { modules: false, targets: { node: 12 } }],
      '@babel/preset-typescript',
      '@babel/preset-react'
    ],
    plugins: [
      'react-require'
    ]
  }
