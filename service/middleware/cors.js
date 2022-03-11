const cors=require('cors')
module.exports=cors({
    origin:'http://localhost:8081',//只允许当前地址进行跨域访问
    credentials:true //强制性只允许8080访问
})