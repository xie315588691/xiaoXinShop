<template>
  <div>
    <h3>{{photoInfo.title}}</h3>
    <p class="photoInfo-title">
      <span>发布时间：{{ photoInfo.add_time |dataFormat}}</span>
      <span>点击：{{ photoInfo.click}}次</span>
    </p>
    <div class="photo-preview-img">
      <vue-preview :slides="list" @close="handleClose"></vue-preview>
    </div>


    <div class="photoInfo-content">
      <div v-html="photoInfo.content"></div>

    </div>
    <comment :newsId="id"></comment>
  </div>
</template>

<script>
  import comment from '../subComment/comment.vue'

  export default {
    name: "photoInfo",
    data() {
      return {
        id: this.$route.params.id,
        photoInfo: {},
        list: []
      }


    },
    created() {
      this.getphotoInfo(),
        this.getImgList()
    }
    ,
    methods: {
      getphotoInfo() {
        this.$http.get('api/getimageInfo/' + this.id).then(resu => {
          if (resu.data.status == 0) {
            this.photoInfo = resu.data.message[0]
          }
        })
      },
      getImgList() {
        this.$http.get('/api/getthumimages/' + this.id).then(resu => {
          console.log(resu);
          if (resu.data.status == 0) {
            resu.data.message.forEach(item => {
              item.w = 600;
              item.h = 400;
              item.msrc = item.src

            })
            this.list = resu.data.message;
          }
        })
      },
      handleClose() {
        console.log('close event')
      }
    }
    ,
    components: {
      comment
    }
  }
</script>

<style scoped>
  h3 {
    font-size: 14px;
    text-align: center;
    padding: 5px 0 0;
  }

  .photoInfo-title {
    display: flex;
    justify-content: space-between;
    padding-bottom: 5px;
    border-bottom: 1px solid #ccc;
    font-size: 12px;
  }

  .photoInfo-content {
    font-size: 12px;
  }

  .photo-preview-img {
    width: 30px;
  }

</style>
