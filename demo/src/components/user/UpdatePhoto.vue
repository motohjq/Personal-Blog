<template>
  <el-upload
    class="avatar-uploader"
    :action="baseURL + '/personal/photo'"
    :show-file-list="false"
    :with-credentials="true"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <!-- 缩略图 -->
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
import {mapMutations} from'vuex'
export default {
  name: "UpdatePhoto",
  data() {
    return {
      imageUrl: "", //缩略图
    };
  },
  methods:{
      ...mapMutations(['updateUserInfo']),
      // 上传文件之前的钩子函数，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
  beforeAvatarUpload(file) {
    
    const isJPG = file.type === "image/jpeg";
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJPG) {
      this.$message.error("上传的图片只能是jpg格式");
    }
    if (!isLt2M) {
      this.$message.error("上传的图片大小只能小于2M");
    }
    
 
    return isJPG && isLt2M;
  },
  //文件上传成功时的钩子函数
  handleAvatarSuccess(res,file){
      if (res.code) {
          return this.$message.error(res.message) //上传失败
      }
      this.imageUrl=URL.createObjectURL(file.raw)//上传之后会在页面缩略图显示出来
    //   console.log(res,file);
    //修改vuex里的用户信息
    this.updateUserInfo(res.data)
  },
  }
};
</script>
<style lang="less" scoped>
/deep/.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  .avatar {
    display: block;
    max-width: 178px;
    max-height: 178px;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    margin: auto 0;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
}
</style>