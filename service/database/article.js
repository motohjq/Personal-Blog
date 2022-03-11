const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const articleSchema = new Schema({
    title:{type:String,default:"暂无"},//标题
    describe:{type:String,default:"暂无"},//文章描述
    mdUrl:{type:String,required:true},//md文件地址
    coverUrl:{type:String,default:"/file/cover/999.jpg"},//cover封面地址
    date:{type:Number,default:Date.now()},//发表时间
    readingNum:{type:Number,default:0},//阅读数
    author:{type:Schema.Types.ObjectId,ref:"userinfo",required:true}//发表人
})
module.exports = mongoose.model('article', articleSchema)