const path = require('path');

let mode;
let devtool = 'eval-source-map';
if(process.env.NODE_ENV === 'production') {
	console.log('Building for production');
	mode = 'production';
}
else {
	console.log('Building for development');
	mode = 'development';
}

module.exports = {
	mode,
	devtool,
	entry: path.join(__dirname, '/source/js/index.js'),
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js'
		}
	},
	output: {
		path: path.join(__dirname, '/docs/js'),
		filename: 'index.js'
	}
}
