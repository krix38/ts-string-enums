const path = require('path');

module.exports = {
  entry: './src/test.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [{ loader: 'ts-loader'}, { loader: path.resolve('./loader/string-enums-loader.js')}],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
