const path = require('path');

module.exports = {
	entry: path.join(__dirname, '/source/js/index.js'),
	output: {
		path: path.join(__dirname, '/docs/js'),
		filename: 'index.js'
	}
}
