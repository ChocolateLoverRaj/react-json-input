module.exports = process.env.NODE_ENV === 'test'
  ? {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }],
      '@babel/preset-typescript',
      '@babel/preset-react'
    ],
    plugins: [
      ['css-modules-transform', {
        preprocessCss: './preprocess.cjs',
        extensions: ['.module.scss']
      }],
      'react-require'
    ]
  }
  : {
    presets: [
      ['@babel/preset-env', { modules: false, targets: { node: 14 } }],
      '@babel/preset-typescript',
      '@babel/preset-react'
    ],
    plugins: [
      ['css-modules-transform', {
        preprocessCss: './preprocess.cjs',
        extensions: ['.module.scss']
      }],
      'react-require'
    ]
  }
