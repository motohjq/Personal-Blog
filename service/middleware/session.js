const session=require('express-session')
const mongoStore=require('connect-mongo')

//基础配置
module.exports=session({
    // name:'hjq',  connet.sid  设置在cookie中保存的session内容的字段名称
    //秘钥字符串 服务端生成session的签名 可随意写
    secret:'hjq',
    //给前端设置的cookie相关的设置 过期时间 一般配置maxAge即可
    cookie:{maxAge:7*24*60*60*1000},//7天
    //向服务端发送请求后 是否重置cookie时间 建议true
    rolling:true,//退出重新登录再重新7天
    //是否强制重新保存session 即使它没有发生变化 建议false
    resave:false,
    //是否在session还未初始化时就存储 有利于前后鉴权 建议true
    saveUninitialized:true,
    //修改session的默认存储方式
    store:mongoStore.create({
        mongoUrl:"mongodb://localhost:27017/blog"//数据库链接地址
    })
})