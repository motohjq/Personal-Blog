<template>
  <div class="home">
    <!-- 介绍 -->
    <article class="introduce">

<div class="describe">
 <h2>Hello</h2>
 <p>你好！欢迎来到我的博客！我是一名上海211高校CS科班生，热衷于研究web前端，学习并掌握HTML、Css、JavaScript、NodeJs、Vue、React等前端技术<br> &nbsp;&nbsp;&nbsp;这是我的主页！我会在这里发表一些不成熟的技术经验文章，记录一些学习的日常。博客目前使用的是Vue + Element + Node + Express + MongoDB搭建的，如果对源码感兴趣的话可以联系我哦~ 欢迎提出宝贵的建议哦！</p>
</div>
<div class="info">
  <div class="me">
    <h3>个人信息</h3>
    <ul>
      <li>
        <p>姓名</p>
        <p>黄嘉庆</p>
      </li>
      <li>
        <p>本科院校</p>
        <p>华东理工大学</p>
      </li>
      <li>
        <p>专业</p>
        <p>计算机科学与技术</p>
      </li>
      <li>
        <p>毕业去向</p>
        <p>前端开发</p>
      </li>
    </ul>
  </div>
  <div class="skills">
    <h3>技术掌握情况</h3>
    <ul>
      <li>
        <p class="lang">
          <span>HTML &amp; CSS3</span>
          <span>80%</span>
        </p>
        <p class="level1"></p>
      </li>
      <li>
        <p class="lang">
          <span>JavaScript</span>
          <span>70%</span>
        </p>
        <p class="level2"></p>
      </li>
      <li>
        <p class="lang">
          <span>Nodejs</span>
          <span>70%</span>
        </p>
        <p class="level3"></p>
      </li>
      <li>
        <p class="lang">
          <span>Vue</span>
          <span>70%</span>
        </p>
        <p class="level4"></p>
      </li>
      <li>
        <p class="lang">
          <span>React</span>
          <span>60%</span>
        </p>
        <p class="level5"></p>
      </li>
      
    </ul>
  </div>
</div>
    </article>
    <!-- 推荐 -->
    <article class="recommend">
      <div class="describe">
<h2>经验技术文章</h2>
<p><a href="/article">更多热门文章</a>请访问文章</p>
</div>
<div class="article-list">
  <ul>
    <li v-for="item in recommendArticle" :key="item._id">
      <img :src="baseURL+item.coverUrl" alt="图片">
      <h3>{{item.title}}</h3>
    <div class="cover">
      <a :href="`/article/${item._id}`">
      <p>{{item.describe}}</p>
      <p>点击</p>
      </a></div></li>
    
  </ul>
</div>
    </article>
    <!-- work -->
    <article class="work">
<h2>经历</h2>
<ul>
        <li>
          <p class="time">2020-2024</p>
          <div class="introduce">
            <h3>本科在读</h3>
            <p class="company">华东理工大学</p>
            <p class="describe">
              在华东理工大学读计算机科学与技术专业，学习掌握了计算机组成原理、数据结构、操作系统、计算机网络、编译原理等计算机底层知识，课下时间自学了web前端开发技术，并学习了相关框架实现了几个小项目，对前端领域有较大热情，毕业后的工作方向也是前端开发
            </p>
          </div>
        </li>
      </ul>
    </article>
  <div class="contact">
        <div class="describe">
    <h2>联系我</h2>

    <p>有任何问题请联系我吧，收到消息后会给您回复邮件的哦♪(^∇^*)</p>
    </div>
     <el-form
     ref="contactForm"
    :model="contactForm"
    :rules="rules"
    label-position="top"
  >
    <el-form-item label="你的名字" prop="name">
      <el-input v-model="contactForm.name"></el-input>
    </el-form-item>
    <el-form-item label="你的邮箱" prop="email">
      <el-input v-model="contactForm.email"></el-input>
    </el-form-item>
    <el-form-item label="你要发送的消息内容" prop="message">
      <el-input v-model="contactForm.message"></el-input>
    </el-form-item>
    
    <el-form-item>
      <el-button type="primary" @click="submitForm"
        >发送你的消息</el-button>
    </el-form-item>
  </el-form>

  </div>
  </div>
</template>

<script>


export default {
  name:'Home',
  data(){
    return{
      //推荐文章数据的数组
      recommendArticle:[],
      contactForm:{//表单对应的数据对象
        name:'',
        email:'',
        message:''
      },
      rules:{//表单的验证规则 与标签中的prop属性值对应
      name :[
        {
          required:true,
          message:'name值必须填写',
          trigger:'blur'
        
        }
      ],
      email:[{
        required:true,
        type:'email',
        trigger:'blur'//离开焦点才触法
      }],
      message:[{
        required:true,
        trigger:'blur'
      }]
      }
    }
  },
  methods:{
    submitForm(){//点击提交后触发的事件
      //先验证表单里的数据格式是否符合要求
      /*在html标签里写ref属性 比如ref='hjq' 
      在js中 通过this.$refs.hjq 得到写了ref属性的dom结点*/
      // console.log(this.$refs.contactForm);//表单节点
      this.$refs.contactForm.validate(async result=>{
        // console.log(result);//校验成功失败的布尔值
        if (result) {
          //校验通过 发起请求，将数据发送给后端
          let {data}=await this.$axios({
        method:'POST',
        url:'/contact',
        data:this.contactForm
      })
      if (data.code) {
        return this.$message.error(data.message)
      }
      this.$message.success('已收到您的反馈')
      this.$refs.contactForm.resetFields()
      console.log(data);
        }else{
          //校验未通过
          return false
        }
      })
    },
    async getArticles(){
      let {data}=await this.$axios({
        method:'GET',
        url:'/getdata/article',
      })
      if (data.code) {
        return this.$message.error(data.message)//没有文章时候
      }
      // console.log(data);
     this.recommendArticle=data.data.slice(0,4)
    },
  },
  created(){
    this.getArticles()
  }
}
</script>
<style lang="less" scoped>
.home>*{
  width: 100%;
  padding: 20px;
  margin-bottom: 15px;
  background-color: white;
  box-shadow: 0 0 4px #ddd;
  font-family: 'Quicksand';

}
.home h2{

    margin-bottom: 15px;
    font-size: 26px;
    letter-spacing: 3px;
    padding-top: 10px;
    font-family:'Quicksand' ;
    font-weight: bold;
}
.home{
  .describe{
    p{
      padding-bottom: 20px;
      border-bottom: 1px solid #ddd;
      margin-bottom: 20px;
      text-indent: 2em;
      color: #444;
      font-size: 14px;
      letter-spacing: 4px;
      line-height: 30px;
    }
  }
  .info{
    display: flex;
    width: 100%;
    font-size: 14px;
    >div{
      width: 50%;

    }
    h3{
      margin-bottom: 30px;
      font-weight: 400;
      font-size: 22px;
      color: #666;
    }
    .me{
      overflow: hidden;
      li{
        display: flex;
        margin-bottom: 60px;
        &:nth-last-child(1){
          margin-bottom: 0;
        }
        p{
          flex:1;
        }
        p:nth-child(1){
          font-weight: 700;
        }
      }
    }
    .skills{
      li{
        margin-bottom: 30px;
        .lang{
        display: flex;
        justify-content: space-between;
        span{
          font-weight: bold;
          letter-spacing: 2px;
        }
        span:nth-child(2){
          color: #999;
        }
      }
    

        .level1{
          width: 100%;
          height: 8px;
          background-image: linear-gradient(to right,#bfe2e6 80%,transparent,#ececec 80%);
      
      }
      .level2{
          width: 100%;
          height: 8px;
          background-image: linear-gradient(to right,#bfe2e6 70%,transparent,#ececec 70%);
      
      }
      .level3{
          width: 100%;
          height: 8px;
          background-image: linear-gradient(to right,#bfe2e6 70%,transparent,#ececec 70%);
      
      }
      .level4{
          width: 100%;
          height: 8px;
          background-image: linear-gradient(to right,#bfe2e6 70%,transparent,#ececec 70%);
      
      }
      .level5{
          width: 100%;
          height: 8px;
          background-image: linear-gradient(to right,#bfe2e6 60%,transparent,#ececec 60%);
      
      }
      }
    }

  }
  .recommend{
    .describe a{
      text-decoration: underline;
      color: #aaa;
    }
    .article-list ul{
      display: flex;
      overflow: hidden;
      width: 100%;
      justify-content: space-between;
      li{
        position: relative;
        width: 24%;
        img{
          width: 100%;
          height: 100%;
        }
        h3{
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 25px;
          background-color: #000;
          color: #fff;
          line-height: 25px;
          text-align:center;
          font-size: 1px;
        }
        .cover{
         position: absolute;
         top: 0;
         left: 0;
         opacity: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, .3);
          a{
            display: block;
            width: 100%;
            height: 100%;
            color: white;
            text-align:center;
            p{
                position: absolute;
              font-weight: bold;
              font-size: 18px;
              transition: 0.3s;
            }
            p:nth-child(1){
              width: 100%;
              top: 20%;
              font-size: 18px;

            }
            p:nth-child(2){
              left: 50%;
              bottom: 20%;
              width: 50%;
              height: 30px;
              line-height: 30px;
              background-color: rgb(191, 226, 230);
              color: #000;
              transform: translateX(-50%);
              border-radius: 15px;
              font-size: 14px;
            }
          }
        }
        &:hover .cover {
          opacity: 1;
          p:nth-child(1){
              top: 30%;
           }
            p:nth-child(2){
              bottom: 30%;
            }
        }
      }
    }
  }
  .work{
    ul{
      margin: 40px 0;
      li{
        display: flex;

        p.time{
          position: relative;
          top: -12px;
          width: 160px;
          height: 30px;
          margin-right: 30px;
          line-height: 30px;
          text-align:center ;
          font-weight: 700;
          background-color: #bfe2e6;
          &::after{
            position: absolute;
            top: 0;
            right: -30px;
            content:"";
            width: 0;
            height: 0;
            border: 15px solid transparent;
            border-left-color: #bfe2e6;

          }
        }
        .introduce{
          position: relative;
          flex: 1;
          padding:0 20px 40px 20px ;
          border-left:2px solid #bfe2e6 ;
          &::after{
            position: absolute;
            
            top: 0;
            left: -3px;
            content:"";
            width: 4px;
            height: 4px;
            background-color: #000;
          }

          h3{
            position: relative;
            margin-bottom: 20px;
            margin-top: -10px;
            line-height: 25px;
            font-size: 20px;
            font-weight: bold;
          }
          .company{
            color: #000;
            margin-bottom: 20px;
          }
          .describe{
            color: #777;
            letter-spacing:1px ;
            font-size: 16px;
            line-height: 26px;
          }
        }
        &:nth-last-child(1) .introduce{
            padding-bottom: 0;
          }
      }
    }
  }
}
</style>
