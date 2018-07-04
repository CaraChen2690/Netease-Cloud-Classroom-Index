const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry:["babel-polyfill", "./app/js/main.js"],
	// {
	// 	app:'./app/js/main.js'
	// },
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist'
	},
	mode: 'none',
	module:{
		rules:[{
			test:/\.html$/,
			use:'html-loader'
		},{
			test:/\.css$/,
			use:[
		        { loader: 'style-loader' },
		        {
		            loader: 'css-loader',
		            options: {
		              modules: false
		            }
		        }
	        ]
		},{
			test:/\.scss$/,
			use:[
		        { loader: 'style-loader' },
		        {
		            loader: 'css-loader',
		            options: {
		              modules: false
		            }
		        },
		        {loader: 'sass-loader'}
	        ]
		},{ 
			test: /\.js$/, 
			exclude: /node_modules/, 
			use: "babel-loader"
		},{
		    test: /\.(jpe?g|png|gif|svg)$/i,
		    use:[
			    { loader: 'url-loader?limit=10000' },
		        { loader: 'img-loader' }
		    ]
	    }]
	},
	plugins:[
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
	        template:'./app/index.html'
	    })
	],
	output:{
		filename:'[name].min.js',
		path: path.resolve(__dirname,'dist')
	}
}