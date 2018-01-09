const {resolve} = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //css 独立打包
const glob = require('glob');
const url = require('url');

module.exports = (options={}) => {
	const config = require('./config/' + (process.env.npm_config_config || options.config || 'default'))
	const entries = glob.sync('./src/**/index.jsx');
    const entryJsList = {};
    const entryHtmlList = [];
    for (const path of entries) {
        const chunkName = path.slice('./src/projects/'.length, -'/index.jsx'.length);
        entryJsList[chunkName] = path;
        entryHtmlList.push(new HtmlWebpackPlugin({
            template: path.replace('index.jsx', 'index.html'),
            filename: chunkName + '.html',
            chunks: ['manifest', 'vendor', chunkName]
        }));
    }
	return{
		entry:Object.assign({vendor: ['react', 'react-dom']}, entryJsList),//设置入口文件

		output:{//设置出口文件
			path: resolve(__dirname, 'dist'),
            filename: options.dev ? 'js/[name].js' : 'js/[name].[chunkhash].js?',
            chunkFilename: '[id].js?[chunkhash]'
            /*
            import()加载的文件会被分开打包, 我们称这个包为chunk, chunkFilename用来配置这个chunk输出的文件名.

            [id]: 编译时每个chunk会有一个id.
            [chunkhash]: 这个chunk的hash值, 文件发生变化时该值也会变. 文件名加上该值可以防止浏览器读取旧的缓存文件.
            */
		},
		module:{//配置loader，注意使用rules而不是loaders
			rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                    test: /\.html$/,
                    use: [{
                        loader: 'html-loader',
                        options: {
                            root: resolve(__dirname, 'src'),
                            attrs: ['img:src', 'link:href']
                        }
                    }]
                },
                // {
                //     test: /\.css$/,
                //     use: ExtractTextPlugin.extract({
                //       fallback: 'style-loader',
                //       use: 'css-loader'
                //     })
                // },
                // {
                //     test: /\.scss$/,
                //     use: ExtractTextPlugin.extract({
                //       fallback: 'style-loader',
                //       use: ['css-loader','sass-loader']
                //     })
                // },
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader','postcss-loader']
                    })
                },
                // {
                //     test: /\.css$/,
                //     exclude: /node_modules/,
                //     use: ExtractTextPlugin.extract('style', 'css!postcss')
                // },
                {
                    test: /favicon\.png$/,
                    use: [{
                        loader: 'file-loader',
                        /*
                          name: 指定文件输出名
                          [name]是源文件名, 不包含后缀. [ext]为后缀. [hash]为源文件的hash值,
                          这里我们保持文件名, 在后面跟上hash, 防止浏览器读取过期的缓存文件.
                        */
                        options: {
                            name: '[name].[ext]?[hash]'
                        }
                    }]
                },
                {
                    test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                    exclude: /favicon\.png$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'images/[name].[ext]?[hash]'
                        }
                    }]
                }
            ]
		},
		resolve:{//其他解决方案
			alias: {
                '~': resolve(__dirname, 'src')
            },
            // 现在你import文件的时候可以直接使用import Func from './file'，不用再使用import Func from './file.js'
            extensions: ['.js', '.jsx', '.json', '.coffee']
		},
        performance: {
            hints: options.dev ? false : 'warning'
        },
		plugins:[//配置插件
			...entryHtmlList,
            /*
            使用CommonsChunkPlugin插件来处理重复代码
            因为vendor.js和index.js都引用了spa-history, 如果不处理的话, 两个文件里都会有spa-history包的代码,
            我们用CommonsChunkPlugin插件来使共同引用的文件只打包进vendor.js
            */
            new webpack.optimize.CommonsChunkPlugin({
                names: ['vendor', 'manifest']
            }),
            /*
            首先把重复引用的库打包进vendor.js, 这时候我们的代码里已经没有重复引用了, chunk文件名存在vendor.js中,
            然后我们在执行一次CommonsChunkPlugin, 把所有chunk的文件名打包到manifest.js中.
            这样我们就实现了chunk文件名和代码的分离. 这样修改一个js文件不会导致其他js文件在打包时发生改变, 只有manifest.js会改变.
            */
            new ExtractTextPlugin('css/[name].css', {
                allChunks: true
            }),
            // new webpack.DefinePlugin({
            //     DEBUG: Boolean(options.dev),
            //     VERSION: JSON.stringify(pkgInfo.version),
            //     CONFIG: JSON.stringify(config.runtimeConfig)
            // })
		],
		// devServer:{//在这里对webpack-dev-server进行配置
		// 	contentBase: "./", // 本地服务器在哪个目录搭建页面，一般我们在当前目录即可；
	 //      	historyApiFallback:true,// 当我们搭建spa应用时非常有用，它使用的是HTML5 History Api，任意的跳转或404响应可以指向 index.html 页面；
	 //      	inline:true,// 用来支持dev-server自动刷新的配置，webpack有两种模式支持自动刷新，一种是iframe模式，一种是inline模式；使用iframe模式是不需要在devServer进行配置的，只需使用特定的URL格式访问即可；不过我们一般还是常用inline模式，在devServer中对inline设置为true后，当我们启动webpack-dev-server时仍要需要配置inline才能生效，这一点我们之后再说；
	 //      	hot:true,// 启动webpack热模块替换特性，这里也是坑最多的地方，不少博客都将hot设置了true，我们姑且也设置为true，之后再看；
		// 	port: 8666
		// }
        devServer: config.devServer ? {
            host: '0.0.0.0',
            port: config.devServer.port
            // proxy: config.devServer.proxy,
            // historyApiFallback: {
            //     index: url.parse(config.publicPath).pathname,
            //     disableDotRule: true
            // }
        } : undefined,
	}
}