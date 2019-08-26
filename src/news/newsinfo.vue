<template>
  <div>
    <h1>{{newsInfo.title}}</h1>
    <p>
      <span>时间：{{newsInfo.add_time|dataFormat}}</span>
      <span>点击次数：{{newsInfo.click}}次</span>
    </p>
    <div v-html="newsInfo.content"></div>

    <commentBox :newsId="$route.params.id"></commentBox>
  </div>
</template>

<script>
  import axios from 'axios'
  import {Toast} from 'mint-ui';
  import commentBox from '../subComment/comment.vue'

  export default {
    name: "newsinfo",
    data() {
      return {
        newsInfo: {}
      }
    },
    created() {
      this.getNewsInfo()
    },
    methods: {
      getNewsInfo() {
        axios.get('http://www.liulongbin.top:3005/api/getnew/' + this.$route.params.id).then(resu => {
          if (resu.data.status == 0) {
            this.newsInfo = resu.data.message[0]

          } else {
            Toast({
              message: '获取新闻详情失败！',
              duration: 2000
            });
          }
        })
      }
    },
    components: {
      commentBox
    }
  }
</script>

<style scoped>
  h1 {
    font-size: 16px;
    text-align: center;
    margin: 5px 0;
    color: red;
  }

  p {
    padding: 10px 5px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
  }


</style>
