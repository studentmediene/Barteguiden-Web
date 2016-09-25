module.exports = {
  type: 'react-app',
  babel: {
    stage: 2,
  },
  cssPreprocessors: {
    less: {
      test: /\.scss/,
      loader: require.resolve('less-loader'),
      defaultConfig: 'lessLoader'
    }
  }
}
