var webpack = require('webpack'),
	path = require('path'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	htmlWebpackPlugin = require('html-webpack-plugin');

const config = {
	//入口文件
	entry: {
		main: './app/main.js',
		module1: './app/module1.js'
	},
	//输出文件
	output: {
		filename:'[name].bundle.js',
		path:path.resolve(__dirname,'./public')
	},
	//
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
					parsets:['es2015']
				}
			},
			{
			    test: /\.scss$/,
			    // use:[ 'style-loader','css-loader','sass-loader']    //将css代码将打包到bundle.js文件里，因此html里不需要引用css文件
			    use: ExtractTextPlugin.extract({
			    	fallback: 'style-loader',
			    	use: ['sass-loader','css-loader']
			    })
			}
		]
	},
	// 配置devServer各种参数
    devServer: {
        contentBase: "./public/index.html", // 本地服务器所加载的页面所在的目录
        historyApiFallback: true, // 不跳转
        inline: true // 实时刷新
    },
	//插件
	plugins: [
		new ExtractTextPlugin('./css/[name].css'),
		new htmlWebpackPlugin({
            template: './public/index.html' // 模版文件
        })
	]
		 
	
}
module.exports = config;