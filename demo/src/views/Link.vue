<template>
  <div id="link">
    <article class="link-template">
      <h2>友链</h2>
      <p>请在 <router-link to="/message">留言区</router-link> 按照以下格式申请友链</p>
      <p>名称：Cadillac</p>
      <p>主页：http://baidu.com</p>
      <p>图标：https://www.baidu.com/img/PC_880906d2a4ad95f5fafb2e540c5cdad7.png</p>
      <p>描述：华东理工大学CS在读 热衷于前端开发</p>
    </article>
    <article class="link-content">
      <ul>
        <li v-for="item in linkInfo" :key="item._id">
          <a :href="item.home" target="_blank" :title="item.describe">
            <div>
              <img class="logo" :src="item.logo">
              <p class="name">{{item.name}}</p>
            </div>
          </a>
        </li>
      </ul>
    </article>
  </div>
</template>

<script>
export default {
  name: "Link",
  data(){
    return{
      linkInfo:[]
    }
  },
  methods:{
    async getLinkData(){
       let {data}= await this.$axios({
           method:"GET",
           url:"/getData/link",
         })
        //  console.log(data);
        this.linkInfo=data.data;
    }
  },
  created(){
    this.getLinkData()
  }
};
</script>

<style lang="less" scoped>
article {
  width: 100%;
  padding: 25px 20px;
  margin-bottom: 15px;
  background-color: #fff;
  font-family: Quicksand, Microsoft YaHei, sans-serif;
  box-sizing: border-box;
  box-shadow: 0 0 4px #ddd;
}
article.link-template {
  h2 {
    margin-bottom: 15px;
    border-left: 5px solid #73b899;
    font-size: 20px;
    letter-spacing: 3px;
    line-height: 24px;
    text-indent: 10px;
  }
  p {
    text-indent: 2em;
    color: #444;
    font-size: 14px;
    letter-spacing: 4px;
    line-height: 30px;
    a {
      color: #409eff;
      &:hover {
        text-decoration: underline;
      }
    }
    span {
      color: #bd4147;
      background-color: rgba(27, 31, 35, 0.05);
      font-weight: 700;
    }
  }
}
article.link-content {
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      position: relative;
      padding: 15px;
      text-align: center;
      box-sizing: border-box;
      a {
        display: block;
        width: 100%;
        height: 100%;

        img.logo {
          width: 40px;
          height: 40px;
          border-radius: 8px;
        }
        p{
          overflow: hidden;
          height: 30px;
          line-height: 30px;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 14px;
          color: #409eff;
        }
      }
    }
  }
}
</style>