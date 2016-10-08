var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var publicPath = 'http://friday.yy.com/';

module.exports = {
    //插件项
    plugins: [
        //生成独立样式文件
        new ExtractTextPlugin("css/[name].css"),
        new webpack.optimize.CommonsChunkPlugin('js/common.js')
    ],
    //devtool: 'source-map', 
    //页面入口文件配置
    entry: getEntry(),
    //入口文件输出配置
    output: {
        filename: 'js/[name].bundle.js',
        path: path.join(__dirname, './dist/friday/'),
        publicPath: publicPath
    },
    module: {
        //加载器配置
        loaders: [{
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.scss$/,
            loader: 'style!css!autoprefixer!sass?sourceMap'
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader?limit=8192&name=images/[name].[ext]?[hash]'
        }, {
            test: /\.(html)$/,
            loader: 'file?name=html/[name].[ext]'
        }, {
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.(js)$/,
            exclude: /(node_modules|lib)/,
            loader: 'babel',
            query: {
                presets: ['es2015'],
                plugins: ['transform-runtime']
            }
        }]
    },
    //其它解决方案配置
    resolve: {
        root: '', //绝对路径
        extensions: ['', '.js', '.json', '.scss'],
        alias: {}
    },
    externals: {
        'jquery': 'window.jQuery'
    },
    recordsPath: path.join(__dirname, "webpack.records.json")
};

function getEntry() {
    var jsPath = path.resolve('src','js');
    var dirs = fs.readdirSync(jsPath);
    var matchs = [],
        files = {};
    dirs.forEach(function(item) {
        matchs = item.match(/(.+)\.js$/);
        if (matchs) {
            files[matchs[1]] = path.resolve('src', 'js', item);
        }
    });
    return files;
}
