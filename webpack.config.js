module.exports = {
    entry: './client/index.jsx',
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
                loader: 'babel',
		exclude: /(node_modules|index.js)/,
            },
                {
                        test: /\.css$/, // Only .css files
                         loader: 'style!css' // Run both loaders
                }
        ]
    },
    externals: {
    },
    module: {
        loaders: [
            {
                //tell webpack to use jsx-loader for all *.jsx files
                test: /\.jsx?$/,
                exclude: /(node_modules|index.js)/,
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
        'react': 'React'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
}
