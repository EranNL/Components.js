let path = require('path');
let webpack = require('webpack');

module.exports = {
	entry: './src/javascript/core.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015'],
				},
			},
			/*{
				test: /\.scss$/,
				loader: 'style-loader!css-loader!sass-loader'
			},
				{
			    test: /\.(png|jpg)$/,
			    loader: 'url-loader?limit=10000'
			}*/
		],
	},
    plugins: [
        new webpack.optimize.UglifyJsPlugin({compress: { warnings: false }})
    ],
    target: 'node'

};
