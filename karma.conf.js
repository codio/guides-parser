// Karma configuration

module.exports = function(config) {
  config.set({

    basePath: '',
    frameworks: ['mocha', 'browserify'],
    files: [
      'test/*.spec.coffee'
    ],
    exclude: [],
    preprocessors: {
        'test/*': ['browserify']
    },
    browserify: {
        extensions: ['.coffee'],
        transform: ['coffeeify', 'brfs'],
        external: ['esprima']
    },
    reporters: ['dots'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: false
  });
};
