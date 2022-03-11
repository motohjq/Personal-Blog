//对后台管理的路由监听的入口文件
const express=require('express')
const router=express.Router()

//鉴权 判断当前发起请求的用户是否具备管理员权限
router.use((req,res,next)=>{
    //判断用户是否已登录(在线)||该用户的admin是否为true
    if (!req.session.userInfo||!req.session.userInfo.admin) {
        //用户没有登录 接着执行后面的 用户的admin为false
        return res.send({
            code:6,
            message:"您没有管理员权限"
        })
    }
    next()
})

router.post("/isCheck",(req,res)=>{
    res.send({
        code:0,
        message:'欢迎管理员登录'
    })
})

// 监听对友链的增删改操作的路由
router.use('/link',require('./link'))

//监听对文章相关操作的路由
router.use('/article',require('./article'))

//管理反馈
router.use("/contact", require("./contact"));


module.exports=router;