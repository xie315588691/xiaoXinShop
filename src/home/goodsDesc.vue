<template>
  <div class="goodsinfo-container">
    <h2>{{info.title}}</h2>
    <hr/>
    <div v-html="info.content" class="info-comment"></div>
  </div>
</template>

<script>
  export default {
    name: "goodsDesc",
    data() {
      return {
        id: this.$route.params.id,
        info: {}
      }
    },
    created() {
      this.getGoodsInfo()
    },
    methods: {
      getGoodsInfo() {
        this.$http.get('api/goods/getdesc/' + this.id).then(resu => {
          console.log(resu.data);
          if (resu.data.status == 0) {
            this.info = resu.data.message[0]
          }
        })
      }
    }
  }
</script>

<style >
  .goodsinfo-container{
    padding: 4px;
  }
  h2 {
    font-size: 16px;
    text-align: center;
  }
  .info-comment img{
    width: 100%;
  }

</style>
