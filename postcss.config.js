const webpack = require('webpack');
const stylelint = require('stylelint');
const postcssImport = require('postcss-import');
const postcssReporter = require('postcss-reporter');
// const precss = require('postcss-scss');
module.exports = {
    plugins: [
    	postcssImport({ addDependencyTo: webpack }),
        require('precss'),
        require('autoprefixer'),
        stylelint({
        	config: require('./stylelint.config.js'),
	      	failOnError: true,
	      	// syntax: precss
	    }),
	    postcssReporter({ clearAllMessages : true })
    ]
    // parser:require('postcss-scss')
}