const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
  
  module.exports = {  
    mode: "production",
     entry: {
      app: './src/scripts/script.js',
    },
    plugins: [
       new HtmlWebpackPlugin({
        title: 'Production',
   })],
    
    output: {

        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
      },
    module: {
       rules: [
         {
          test: /\.css$/i,
          use: [
            {
              loader:MiniCssExtractPlugin.loader,
            },
          {
            loader: "css-loader", 
            // options: {
            //   minimize: true
            // }
          }],

         },
         {
           test: /\.html$/i,
           loader: "html-loader",
         },
         {
           test: /\.(png|svg|jpg|jpeg|gif)$/i,
           type: "asset/resource",
         },

       ],
    },

    plugins: 
      [ 

       new MiniCssExtractPlugin(),

      new HtmlWebpackPlugin({
         template: "./src/components/index.html",
         minify: {
          removeRedundantAttributes: false, // do not remove type="text"
         }
       }),
     ],

    optimization: {
      minimize: true, // Enable optimization minimizers
      minimizer: [
        new CssMinimizerPlugin(), // Minify CSS
      ],
  },
  }

