module.exports = {
  type: 'react-app',
  babel: {
    stage: 2,
  },
  cssPreprocessors: {
    less: {
      test: /\.less/,
      loader: require.resolve('less-loader'),
      defaultConfig: 'lessLoader'
    }
  }
}
