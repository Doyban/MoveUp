const path = require('path');
const fs = require('fs');
const fs_extra = require('fs-extra');
const mkdir = require('mkdirp');
const remove_dir = require('delete');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserAsyncPlugin = require('browser-sync-webpack-plugin');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

let gameDir = `./src`;

remove_dir.sync('./dist');

const copyFilesAndDirectory=(src,dest)=>{
  console.log(">>>>src---"+src,dest);
  fs_extra.copySync(src, dest);
};

let toCopy = [
  {from: `${gameDir}/assets/`,to:'./dist/assets/'},
  // {from:`${gameDir}/components/`,to:'./dist/components/'},
  // {from:`${gameDir}/helpers/`,to:'./dist/helpers/'},
  {from:`${gameDir}/lib/`,to:'./dist/lib/'},
];

for (let i=0;i<toCopy.length;i++){
  copyFilesAndDirectory(toCopy[i].from,toCopy[i].to);
}

// keep this as option
// const definePlugin = new webpack.DefinePlugin({
//   __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
// });

let extraPlugins = [];

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist'),
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json'
  },
  watch:true, // helps to run browser-sync plugin
  plugins: [
    // definePlugin,
    new HtmlWebpackPlugin({
      filename: '../dist/index.html',
      template: `./index.html`,
    }),
    new BrowserAsyncPlugin({
      host: process.env.IP || 'localhost',
        port: process.env.PORT || 3000,
        server: {
          baseDir: ['./dist']
        }
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        terserOptions: {
          output: {
            comments: false,
            quote_keys:false,
            keep_quoted_props:false,
          },
          mangle:{
            keep_fnames:false,
            keep_classnames:false,
            toplevel:true,
            safari10:true,
          },
          compress:{
            arguments:false,
            collapse_vars:true,
            conditionals:false,
            arrows:false,
            unsafe_arrows:false,
            loops:true,
            toplevel:true,
            reduce_funcs:true,
            reduce_vars:true,
            join_vars:true,
          },
        },
      }),
    ],
  },
};
