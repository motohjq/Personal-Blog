<template>
  <div class="visitor">
    <h4>最近访客</h4>
    <ul>
      <li v-for="item in visitorData" :key="item._id" :style="{backgroundImage:`url(${baseURL}${item.visitor.photo})`}">
        <p>{{item.visitor.user}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    name:'Visitor',
    data(){
      return{
        visitorData:[]//访客数据
      }
    },
    methods:{
      async getVisitor(){
        console.log(666);
        let {data}=await this.$axios({
          method:'GET',
          url:'/getdata/visitor'
        })
        console.log(888);
        if (data.code) {
          return;
        }
        console.log(data.data);
        // this.$message.success(data.message)
        this.visitorData=data.data.slice(0,8)
      }
    },
    created(){
      this.getVisitor()
    }
}
</script>

<style lang='less' scoped>
  .visitor{
    width: 100%;
    background-color: white;
    padding: 20px;
    margin-top: 20px;
    font-family: 'Quicksand';
    box-shadow: 0 0 4px #ddd;
    box-sizing: border-box;
    h4{
      line-height: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid #e8e9e7;
        color: #383937;
        font-size: 16px;
        font-weight: bold;
    }
    ul{
      display: flex;
      flex-wrap: wrap;
      margin-top: 20px;
      li{
        position: relative;
        width: 50px;
        height: 50px;
        margin-right: 10px;
        margin-bottom: 10px;
         background:no-repeat 50%/cover;
        &:nth-child(4n){
          margin-right: 0;
        }
        p{
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 16px;
          background-color: #000;
          color: white;
          text-align:center;
          line-height: 16px;
          font-size: 12px;
          overflow:hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
</style>