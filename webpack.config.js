var path = require('path');

module.exports = {
	// resolve: {
 //  		root: [
    // 		path.resolve('./src/javascript')
 //  		]
	// },
	entry: './src/javascript/core.js',
	output: {
		path: 'build',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			},
			/*{
				test: /\.scss$/,
				loader: 'style-loader!css-loader!sass-loader'
			},
				{
			    test: /\.(png|jpg)$/,
			    loader: 'url-loader?limit=10000'
			}*/
	 ]
 }
};
