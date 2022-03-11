const express=require('express')
const router=express.Router()
const userDB=require('../../database/userinfo')//userinfo表的操作对象
const visitorDB=require('../../database/visitor') 


//添加访客
async function addVisitor(userId){
    //通过id查找访客数据
    let doc= await visitorDB.findOne({visitor:userId})
    if(doc){
    //如果表中存在该id对应的访客数据 更新访问时间为当前时间
        await visitorDB.findByIdAndUpdate({visitor:userId},{date:Date.now()})
    }else{
    //如果表中不存在id对应的数据 添加访客到表中
        await visitorDB.create({visitor:userId})
    }
}

router.post('/',async (req,res)=>{

    let {user,password}=req.body;
    if (/^[a-zA-Z0-9_\u4e00-\u9fa5]{1,8}$/.test(user)&&/^[a-zA-Z]\w{5,17}$/.test(password)) {
        
        //验证用户名和密码是否正确
        let userDoc=await userDB.findOne({user})
        //null
        //用户不存在
        if (!userDoc) {
            res.send({
                code:2,
                message:"用户不存在 请先注册"
            })
            return //不存在直接结束
        }
        if (userDoc.password===password) {
            
            let userInfo ={
                user:userDoc.user,
                _id:userDoc._id,
                admin:userDoc.admin,
                photo:userDoc.photo,
            }
            //将用户的信息数据存到session中
            req.session.userInfo=userInfo
            //添加访客
            addVisitor(userInfo._id)//传入当前访客的id
            //密码正确 登陆成功
            res.send({
                code:0,
                message:"登录成功",
                data:userInfo//给前端用户数据
            })
            
            let u
        }
        else{
            //密码错误
            res.send({
                code:3,
                message:'密码错误'
            })
        }
    }else{
        res.send({
            code:1//发过来的数据格式不规范
        })
    }
})
//检测是否登录
router.post('/isCheck',(req,res)=>{
    console.log('----isCheck-----',req.session,'----isCheck---');
    let data=req.session.userInfo;
    if (data) {
        //更新访客的访问时间

        addVisitor(req.session.userInfo._id)//传入当前的访客用户id
        //已登录
        res.send({
            code:0,
        msg:'已经登录',
        data
        })
    }else{
        //未登录
        res.send({
            code:1,
            msg:"未登录",
            data:{}
        })
    }


})

//退出登录
router.post("/out",(req,res)=>{
    req.session.destroy()//销毁当前的session
    res.send({
        code:0,
        message:'已退出，请重新登录一下'
    })
})
module.exports = router;
