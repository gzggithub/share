module.exports = { //模块输入
    proxy: { //proxy对象
        '/api': {//定义'/api/'属性，此处亦可换成'/api/**',将https://sixsix.taoerxue.com.cn映射为/api
            // 测试代理地址接口域名
            // target: 'https://sixsix.taoerxue.com.cn/taoerxue-app/1',
            // target: 'https://sixsix.taoerxue.com.cn',
            // 正式代理地址接口域名
            // target: 'https://newapi.taoerxue.cn',
            changeOrigin: true,  //是否跨域
            pathRewrite: {//需要rewrite的
                '^/api': ''   // 重定向，把'/api'开头替换成空，即 ''
                // '^/api': '/'   // 重定向，把'/api'开头替换成空，即 ''
            }
            // 因为在ajax的url中加了前缀'/api'，而原本的接口是没有这个前缀的,所以需要通过 pathRewrite 来重写地址，将前缀 '/api' 转为 '/'
        }
    }
}