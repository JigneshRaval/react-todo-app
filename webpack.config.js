const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const nodeModules = 'C:\Users\jignesh.rawal\Documents\GitHub\react-todo-app\node_modules';

module.exports = {
	entry: {
		'app': './src/main.jsx',
		'vendor': ['react', 'react-dom', 'react-router-dom']
	},
	output: {

		path: path.resolve(__dirname, "dist"), // string
		// the target directory for all output files
		// must be an absolute path (use the Node.js path module)

		filename: "[name].js", // string
		//filename: "[name].js", // for multiple entry points
		//filename: "[chunkhash].js", // for long term caching
		// the filename template for entry chunks
		chunkFilename: "[id].chunk.js",

		publicPath: "/assets/", // string
		//publicPath: "",
		//publicPath: "https://cdn.example.com/",
		// the url to the output directory resolved relative to the HTML page

		libraryTarget: "umd", // universal module definition
        /*
		libraryTarget: "umd2", // universal module definition
        libraryTarget: "commonjs2", // exported with module.exports
        libraryTarget: "commonjs-module", // exports with module.exports
        libraryTarget: "commonjs", // exported as properties to exports
        libraryTarget: "amd", // defined with AMD defined method
        libraryTarget: "this", // property set on this
        libraryTarget: "var", // variable defined in root scope
        libraryTarget: "assign", // blind assignment
        libraryTarget: "window", // property set to window object
        libraryTarget: "global", // property set to global object
        libraryTarget: "jsonp", // jsonp wrapper
		*/
		// the type of the exported library
	},
	"plugins": [
		
		new webpack.optimize.CommonsChunkPlugin({
			name: ['app', 'vendor']
		}),
		new UglifyJsPlugin({
			include: /\.min\.js$/,
			minimize: true
		}),
		/* new webpack.optimize.CommonsChunkPlugin({
			"name": [
				"react"
			],
			"minChunks": (module, count) => {
				console.log('React :::', count, '==', module.resource, '====', module.resource && module.resource.startsWith(nodeModules + '\\react'));

				return module.resource
					&& (module.resource.startsWith(nodeModules + '\\react') || module.resource.startsWith(nodeModules + '\\react-dom') || module.resource.startsWith(nodeModules + '\\react-router-dom'));
			},
			"chunks": [
				"vendor"
			]
		}), */
	],
	module: {
		rules: [
			/*
				// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
				{
					enforce: "pre",
					test: /\.js$/,
					loader: "source-map-loader"
				},
				{
					enforce: 'pre',
					test: /\.jsx?$/,
					use: "source-map-loader"
				},
	
				// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
				// There is no need to use babel-loader if you are using typescript-loader because typescript is similar to babel.
				// Both compiles ES6 code into ES5
				{
					test: /\.tsx?$/,
					loader: "awesome-typescript-loader",
					exclude: /(node_modules|bower_components)/
				},*/

			{
				test: /.jsx?$/, // /\.js$/
				loader: 'babel-loader',
				exclude: /(node_modules|bower_components)/
			}
		]
	},

	// Enable sourcemaps for debugging webpack's output.
	devtool: "source-map",

	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".jsx", ".ts", ".tsx", ".js", ".json"]
	},
};
