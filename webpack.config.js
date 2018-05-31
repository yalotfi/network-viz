const path = require('path');

module.exports = {
	mode: 'production',
	target: 'node',
	entry: './index.js',
	output: {
		path: path.resolve(__dirname, 'public', 'js'),
		filename: 'network-viz.bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			}
		]
	}
};