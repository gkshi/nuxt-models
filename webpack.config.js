const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
    example: './src/example.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  },
  resolve: {
    alias: {
      Common: path.resolve(__dirname, './')
    }
  }
}
