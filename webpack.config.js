const path = require('path');

const webpackConfig = {
  entry: './src/index.ts',
  output: {
    path: path.resolve('dist/bundles'),
    filename: 'ionix-sqlite.umd.js',
    library: 'ionixSqlite',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts' }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts']
  }
};

module.exports = webpackConfig;
