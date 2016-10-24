module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      {pattern: './src/specs.ts', watched: false}
    ],
    preprocessors: {
      './src/specs.ts': ['webpack']
    },
    webpack: {
      module: {
        loaders: [
          {test: /\.ts$/, loader: 'ts'}
        ]
      },
      resolve: {
        extensions: ['.js', '.ts']
      }
    },
    webpackMiddleware: {
      stats: 'errors-only'
    },
    browsers: ['Chrome'],
    singleRun: true
  });
};
