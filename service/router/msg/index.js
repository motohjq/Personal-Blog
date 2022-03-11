const express=require('express')
const router=express.Router();
const userDB=require('../../database/userinfo')
const messageDB=require('../../database/message')

//鉴权 判断用户是否登录
router.use((req,res,next)=>{
    if (!req.session.userInfo) {
        return res.send({
            code:7,
            message:'用户未登录 不能发表留言'
        })
    }
    next()
})

//发表留言的路由
router.post("/publish",async(req,res)=>{
    let {valMsg}=req.body;
    valMsg=valMsg.trim();
    //验证数据格式是否正确
    if (!valMsg||!valMsg.trim()||valMsg.length>100) {
        return res.send({
            code:1,
            message:'发表的评论内容格式不正确'
        })
    }
    //将评论存到数据库
    await messageDB.create({
        content:valMsg,
        author:req.session.userInfo._id //发表这条评论的作者id
        
    })
    res.send({
        code:0,
        message:"评论发表成功"
    })
})

//给父级评论点赞的路由
router.post("/likes/comment",async(req,res)=>{
    let {id}=req.body;//评论id
    // console.log(id);
    //判断id存不存在
    if (!id) {
        return res.send({
            code:1,
            message:'你没法评论的id过来'
        })
    }
    let commentDoc=await messageDB.findById(id);
    if (!commentDoc) {
        return res.send({
            code:1,
            message:'发过来的评论id在数据库中查找不到'
        })
    }
    let userId=req.session.userInfo._id;//当前发起请求的用户Id
    //判断用户是否点过赞/判断当前点击按钮的用户是否存在likes数组中
    if (commentDoc.likes.includes(userId)) {
        //存在 点过赞了 需取消赞
        await messageDB.findByIdAndUpdate(id,{$pull:{likes:userId}})
    }else{
        //没点过赞 要点赞
        await messageDB.findByIdAndUpdate(id,{$push:{likes:userId}})
    }
    res.send({
        code:0,
        message:'点赞操作功能已完成'
    })

})

//在父级评论下 提交回复内容
router.post("/reply/submit",async(req,res)=>{
    //父评论的id 评论内容 父评论的作者id
    let {id,content,replyUser}=req.body;
    //判断数据格式 数据是否为空 长度是否超过100
    if (!content) {
        return res.send({
            code:1,
            message:'回复的内容为空'
        })
    }
    if (content.length>100) {
        return res.send({
            code:2,
            message:'回复的内容超过100'
        })
    }
    console.log(999);
    console.log('aaaaa');
    //判断当前这条父评论是否存在 父级评论的作者是谁
   let doc1= await messageDB.findById(id)
   if (!doc1) {
       return res.send({
        code:1,
        message:'评论id错误'
    })
   }
   let doc2= await userDB.findById(replyUser)
   if (!doc2) {
       return res.send({
        code:3,
        message:'你要回复的用户id错误 用户不存在'
    })
   }
    await messageDB.findByIdAndUpdate(id,{
        //往这条父评论下的children数组中添加回复数据
        $push:{
            children:{
                content,
                author:req.session.userInfo._id,//写回复的用户id 这条回复是谁写的
                replyUser //这条回复的父级作者id
            }
        }
    })
    res.send({
        code:0,
        message:"回复成功"
    })

})

//子级回复的点赞功能
router.post('/like/reply',async(req,res)=>{
    let {parentId,childId,childIndex}=req.body;
    let parentDoc=await messageDB.findById(parentId);//父文档
    let childDoc=await parentDoc.children.id(childId)//子文档 当前点赞了的子级回复数据
    // console.log(childDoc)
    //父级评论的id是否存在
    if (!parentDoc) {
        return res.send({
            code:1,
            message:'父级评论的id不存在 没有这条评论'
        })
    }
    //子级评论的id是否存在
    if (!childDoc) {
        return res.send({
            code:1,
            message:'子级评论的id不存在 没有这条子回复'
        })
    }
    //修改子评论的likes
    let userId=req.session.userInfo._id;//当前发起请求的用户Id
    //判断用户是否点过赞/判断当前点击按钮的用户是否存在likes数组中
    if (childDoc.likes.includes(userId)) {
        //存在 点过赞了 需取消赞
        await messageDB.findByIdAndUpdate(parentId,
            {
                $pull:{
                    [`children.${childIndex}.likes`]:userId
                }
            })//在数组中删除该用户的id
    }else{
        //没点过赞 要点赞
        await messageDB.findByIdAndUpdate(parentId,
            {
                $push:{
                    [`children.${childIndex}.likes`]:userId
                }
            })
    }
    res.send({
        code:0,
        message:'点赞操作功能已完成'
    })
})

module.exports=router;