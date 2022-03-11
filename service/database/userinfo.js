const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const userSchema=new Schema({
    //用户表规则
    user:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    admin:{
        type:Boolean,
        default:false//默认非管理员
    },
    photo:{
        type:String,
        default:'/images/photo/666.jpg'
    }
})
module.exports= mongoose.model('userinfo',userSchema)//到处userinfo表的操作对象