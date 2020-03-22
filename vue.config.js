module.exports = {
    // 这段代码的意思是html文件中如果存在字符串模版，通过html-loader来进行加载，
    configureWebpack: {
        module: {
          rules: [
            {
              test: /\.(html)$/,
              exclude: /node_modules/,
              use: {
                loader: 'html-loader',
                options: {
                  minimize: true
                }
              }
            }
          ]
        }
      },
}