const express=require('express')
const router=express.Router();
const userDB=require('../../database/userinfo')
const messageDB=require('../../database/message')
const linkDB=require('../../database/link')
const articleDB=require('../../database/article')
const  visitorDB=require('../../database/visitor')

//请求留言数据
router.get("/msg", async (req,res)=>{
    let msgDoc = await messageDB
        .find({}, {}, {sort:{date:-1}})
        .populate("author", {password:0, __v:0, admin:0})
        .populate("children.author",{password:0, __v:0, admin:0})//同时查询写子级回复的用户信息
        .populate("children.replyUser",{password:0, __v:0, admin:0}); //查询子级回复里存储的父级评论的用户信息
    console.log(msgDoc);
    console.log(666);
    res.send({
        code:0,
        message:"留言请求成功",
        data: msgDoc
    });
});

//请求友链数据
router.get('/link',async (req,res)=>{
    let linkDoc=await linkDB.find();
    res.send({
        code:0,
        message:'成功获取友链数据',
        data:linkDoc
    })

})

//获取全部文章数据
router.get("/article",async(req,res)=>{
    // let articleDoc=await articleDB.find();
    let articleDoc=await articleDB.find({},{},{
        sort:{readingNum:-1}//阅读数大的排前面
    });

    // let articleDoc=await articleDB.find({},{},{
    //     skip:0,
    //     limit:5
    // });
    if (articleDoc.length===0) {
        res.send({
            code:1,
            message:'暂无文章',
        })
    }
    res.send({
        code:0,
        message:'成功获取所有文章数据',
        data:articleDoc
    })

})

//根据id获取文章详情数据
router.get("/articleDetails",async(req,res)=>{
    let {id}=req.query//get请求用query
    
    let doc=await articleDB.findById(id)

    if (!doc) {
        return res.send({code:1,message:'文章id有误'})
    }
    //设置readingNum自增1
    await articleDB.findByIdAndUpdate(id,{$inc:{readingNum:1}})
    //查到文章数据时
    res.send({code:0,message:'查询成功',data:doc})

})


//获取访客数据
router.get('/visitor',async(req,res)=>{
    let doc=await visitorDB.find().populate('visitor',{password:0,__v:0})
    res.send({code:0,message:'查询成功',data:doc})
})

module.exports=router;