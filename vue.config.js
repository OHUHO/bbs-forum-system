/*const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave:false
})*/

module.exports = {
    pages:{
        index:{
            entry:'src/main.js',
        }
    },
    lintOnSave: false,   //关闭语法检查

    //开启代理服务器(通过8080转发给8083)，使用vue-cli 实现
    devServer: {
        proxy: 'http://localhost:8083',
    }
}


