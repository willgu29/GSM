var webpack = require("webpack");


module.exports = {
    entry: './index.jsx',
    output: {
        filename: 'bundle.js', //this is the default name, so you can skip it
        //at this directory our bundle file will be available
        //make sure port 8090 is used when launching webpack-dev-server
        publicPath: 'http://localhost:8090/assets'
    },
    module: {
	loaders: [
            {
                //tell webpack to use jsx-loader for all *.jsx files
            	test: /\.jsx?$/,
      		exclude: /(node_modules|bower_components)/,
      		loader: 'babel'
	    },
		{
			test: /\.css$/, // Only .css files
     			 loader: 'style!css' // Run both loaders
		}
        ]
    },
    externals: {
        //don't bundle the 'react' npm package with our bundle.js
        //but get it from a global 'React' variable
        'react': 'React',
        // require("jquery") is external and available
        //  on the global var jQuery
        // "jquery": "jQuery"
    },
    resolve: {

        // alias: {
        //     jquery: "./node_modules/jquery/dist/jquery"
        // },
        extensions: ['', '.js', '.jsx']
    },
    /*
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]*/
}
