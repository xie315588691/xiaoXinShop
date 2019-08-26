<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
        <router-link :to="'/home/newsinfo/'+item.id">
          <img class="mui-media-object mui-pull-left" :src=" item.img_url">
          <div class="mui-media-body">
            <h1>{{item.title}}</h1>
            <p class='mui-ellipsis'><span>发布时间:{{ item.add_time | dataFormat}}</span><span>点击:{{item.click}}次</span></p>
          </div>
        </router-link>
      </li>

    </ul>
  </div>

</template>

<script>
  import axios from 'axios'
  import {Toast} from 'mint-ui';

  export default {
    name: "newsList",
    data() {
      return {
        newsList: []
      }
    },
    created() {
      this.getNewsList()
    },
    methods: {
      getNewsList() {
        axios.get('http://www.liulongbin.top:3005/api/getnewslist').then((resu) => {
          // console.log(resu);
          if (resu.data.status == 0) {
            console.log(resu.data);
            this.newsList = resu.data.message
          } else {
            Toast({
              message: '获取新闻列表失败！',
              duration: 2000
            });
          }
        })
      }
    }
  }
</script>

<style scoped>
  .mui-ellipsis {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    font-size: 12px;
    color: #226aff;
  }

  .mui-media-body h1 {
    font-size: 14px;
    font-weight: 400;
    margin-top: 4px;

  }
</style>
