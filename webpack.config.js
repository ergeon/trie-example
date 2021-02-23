module.exports = {
  entry: './src/main.js',
  mode: 'development',
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
}
