const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const contactSchema = new Schema({//反馈表规则
    name: {
        type:String,
        required:true},
    email: {
        type:String,
        required:true},
    message: {
        type:String,
        required:true},
    data:{
        type:Number,
        default:Date.now
    },
    reading:{//管理员是否阅读过该条反馈
        type:Boolean,
        default:false
    }
})
module.exports = mongoose.model('contact', contactSchema)