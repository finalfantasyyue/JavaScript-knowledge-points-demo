const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin=require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const I18nPlugin = require("i18n-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const languages = {
	cn: require('../resource/zh-cn.json'),
	en: require('../resource/en.json')
}
const config = Object.keys(languages).map(function(language) {
	return {
		//mode: "development", // production
  		// devtool: "source-map", // 开启调试
  		name:language,
		entry: {
			main: './src/main.js',
			main2: './src/main2.js'
		},
		output: {
			path: path.resolve(__dirname,'../dist'),   //__dirname   node全局变量，存储的是文件所在的文件目录
			filename:language+'.[hash:8].[name].js'    //打包成多个文件  
			//filename: 'bundle.js'  打包成一个文件
		},//
		module: {
			rules:[
				{
				 	test:/\.js$/,
				 	loader:'babel-loader',
				 	query:{
				 		presets:['es2015']   //es6编译成es5
				 	}
				 },
				 {
	                test: /\.(htm|html)$/i,
	                use: [ {
				      loader: 'html-loader',
				      options: {
				        minimize: true
				      }
				    }]
	            },
		        {	
		            // test 表示测试什么文件类型
		            test:/\.css$/,
		            use:['style-loader','css-loader']
		        },
		        /*{
	                test: /\.css$/,
	                loader:[MiniCssExtractPlugin.loader,'css-loader']
	            },*/
		        {
			        test: /\.(scss|sass)$/,
			        use: [
			          {
			            loader: "style-loader" // 将 JS 字符串生成为 style 节点
			          },
			          {
			            loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
			          },
			          {
			            loader: "sass-loader" // 将 Sass 编译成 CSS
			          }
			        ]
		      	},
		      	{
					test:/\.less$/,
					use: ['style-loader','css-loader','less-loader']
				},
				{
		            test:/\.(gif|png|jpg|woff|svg|ttf|eot)$/,
		            use:[
			            {
			                loader:'file-loader',
			                options:{ // 这里的options选项参数可以定义多大的图片转换为base64
			                    name: 'images/[hash:8].[name].[ext]',
			                    limit:50000, // 表示小于50kb的图片转为base64,大于50kb的是路径
			                    //outputPath:'../', //定义输出的图片文件夹
			                    publicPath:'../dist/images'
			                }
			            },
			            {
			            	loader: "img-loader",
				            options: {
				              plugins: [
				                require("imagemin-pngquant")({
				                  quality: "80"
				                })
				              ]
				            }
			            }
			            /*,
			            {	//压缩图片要在file-loader之后使用
			            	loader:'image-webpack-loader',
		                    options:{
		                        bypassOnDebug: true
		                    }
			            }*/
		            ]
		        }
			]
		},
		plugins: [
			require('autoprefixer'), //自动添加前缀插件
			// new ExtractTextPlugin("style.css"),
			new webpack.ProvidePlugin({
	            $: "jquery",
	            jQuery: "jquery"
	        }),
	     	new HtmlWebpackPlugin({
	     		filename: 'index.html',
	     		template: 'src/html/index.html',
	     		chunks: ['dist','main'],
	     		chunksSortMode: 'none'
	     	}),
	     	new HtmlWebpackPlugin({
	     		filename: 'list.html',
	     		template: 'src/html/list.html',
	     		chunks: ['dist','main2'],
	     		chunksSortMode: 'none',
	     		hash: true,
	     		minify:{
                	removeAttributeQuotes:true,//去掉属性值后的双引号
                	collapseWhitespace:true //折叠空白区域 也就是压缩代码
            	}
	     	}),
	     	new I18nPlugin(languages[language]),
	     	new UglifyJSPlugin()
	     	// new CleanWebpackPlugin(['../dist']) //传入数组,指定要删除的目录
		],
		devServer: {
			contentBase: path.resolve(__dirname,'../dist'),
			host:'localhost',
			port:8888,
			// lazy: true,
			quiet: false, //控制台中不输出打包的信息
			inline: true, //开启页面自动刷新  默认true
			progress: true, //显示打包的进度
			compress:true,
			open:true,// 自动打开浏览器
			proxy: {
				'/baiduNews': {
	                target : 'http://news.baidu.com/widget?id=LocalNews&ajax=json&channel=guonei&picn1=2&t=1542704535271',
	                changeOrigin : true, //启用跨域
	                secure: false
	            },
	            '/baiduAni': {
	            	target: 'https://www.huxiu.com/relatedArticle/272225',
	            	changeOrigin: true,
	            	secure: false
	            },
	            '/movie': {
	            	target: 'https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&page_limit=50&page_start=0',
	            	changeOrigin: true,
	            	secure: false
	            }
			}
		}
	}
})

module.exports = (env, argv) => {
	if (argv.mode == 'development') {
	    config.devtool = 'cheap-module-eval-source-map';
	  }

  	if (argv.mode == 'production') {
    	config.devtool = 'cheap-module-source-map'
  	}
  	return config;
}