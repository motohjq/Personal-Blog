<template>
  <div class="personal">
      <div class="me">
          <div class="photo"></div>
          <div class="info">
              <h5>Cadillac</h5>
              <p>你要优秀到所有人都不值得你委屈</p>

          </div>
          <div class="contact">
              <a href="https://github.com/" class="iconfont icon-github"  target="_blank"></a>
              <a href="https://weibo.com/" class="iconfont icon-twitter" target="_blank"></a>
              <a href="#" class="iconfont icon-tubiaozhizuo-"></a>
              <!-- 微信二维码弹出层 -->
                  <el-popover
                placement="bottom"
                :width="200"
                trigger="click"
                >
    <template #reference>
      <a href="#" class="iconfont icon-weixin"></a>
    </template>
    <img src="../../assets/images/personal/vx.jpg" width="200" height="200" alt="">
  </el-popover>
              <a href="#" class="iconfont icon-QQ"></a>
          </div>
          <div class="download">
          <a href="#">Download CV</a>
      </div>
      </div>
      
  </div>
</template>

<script>
export default {
    name:'Personal'
}
</script>

<style lang='less'>
    .personal{
        width: 100%;
        height: 220px;
        margin-bottom: 15px;
        box-shadow: 0 0 4px #ddd;

        .me{
            padding: 20px 0 0;
            background-color: #bfe2e6;
            text-align: center;
            .photo{
                display: inline-block;
                width: 60px;
                height: 60px;
                border: 2px solid white;
                border-radius: 50%;
                vertical-align: middle;
                background:url('../../assets/images/personal/666.jpg')no-repeat 50%/cover;
            }
            .info{
                display: inline-block;
                vertical-align: middle;
                // background-color: #ff0;
                margin-left: 12px;
                text-align-last: left;
                h5{
                    font-size: 20px;
                    font-weight: bold;
                    letter-spacing: 2px;

                }
                p{
                    font-family:'Quicksand-Light' ;
                    color: #555;
                    font-size: 12px;
                    margin-top: 10px;
                    letter-spacing: 0px;
                }

            }
            .contact{
                display: flex;
                margin: 15px 0;

                justify-content: space-around;
                a{
                    font-size: 30px;
                    color: rgb(161, 161, 161);
                }
            }
            .download{
                width: 100%;
                padding: 20px 0;
                background-color: #fff;
                a{
                    display: block;
                    width: 60%;
                    height: 40%;
                    border-radius: 30px;
                    margin: 0 auto;
                    background-color: rgb(191, 226, 230);
                    line-height: 40px;
                    color: black;
                    font-family: 'Quicksand';
                    font-size: 14px;
                    font-weight: bold;

                }
            }
        }

    }
</style>