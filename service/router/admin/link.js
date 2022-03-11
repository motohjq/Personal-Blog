//处理对友链的增删改操作
const express=require('express')
const router=express.Router();
const linkDB=require("../../database/link")
const {URL}=require('url');
const { link } = require('fs');

//添加友链数据到数据库
router.post("/addData",async (req,res)=>{
    //数据格式的校验:鉴定各字段是否为空;鉴定两个url格式是否正确
    


    let {origin}=new URL(req.body.home)
    console.log(origin)
    let linkDoc=await linkDB.findOne({home:new RegExp(origin)})//正则匹配查询home字段值里有没有同一个网站的友链
    if (linkDoc) {
        return res.send({code:10,message:'请不要重复添加相同网站下的友链'})
    }
    
    await linkDB.create(req.body);//添加数据到表
    res.send({
        code:0,
        message:'添加友链成功'
    })

})

//修改友链数据
router.post('/update',async (req,res)=>{
    let {_id,name,home,logo,describe}=req.body;
    //数据校验 友链id是否存在
    let linkDoc=await linkDB.findById(_id);
    if (!linkDoc) {
        return res.send({code:1,message:'要修改的友链不存在'})
    }

    await linkDB.findByIdAndUpdate(_id,{name,home,logo,describe})
    res.send({code:0,message:'友链修改成功'})
})

//删除友链数据
router.delete('/delete',async(req,res)=>{
    let {_id}=req.body//友链id
    //友链存在 才进行删除
    let linkDoc=await linkDB.findById(_id)
    if (!linkDoc) {
        return res.send({code:1,message:'要删除的友链不存在'})
    }
    await linkDB.findByIdAndDelete(_id)//根据id删除数据
    res.send({code:0,message:'删除友链成功'})
})



module.exports=router