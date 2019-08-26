<template>
  <div>
    <!--    轮播图-->
    <mt-swipe :auto="2000">
      <mt-swipe-item v-for="item in imgList" :key="item.id">
        <img :src="item.img" alt="">
      </mt-swipe-item>
    </mt-swipe>
    <!--    九宫格-->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newsList">
          <img src="../lib/images/menu1.png" alt="">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photoList">
          <img src="../lib/images/menu2.png" alt="">
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link href="#" to="/home/goodsList">
          <img src="../lib/images/menu3.png" alt="">
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
        <img src="../lib/images/menu4.png" alt="">
        <div class="mui-media-body">留言反馈</div>
      </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
        <img src="../lib/images/menu5.png" alt="">
        <div class="mui-media-body">视频专区</div>
      </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
        <img src="../lib/images/menu6.png" alt="">
        <div class="mui-media-body">联系我们</div>
      </a></li>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios'
  import {Toast} from 'mint-ui';

  export default {
    name: "home",
    data() {
      return {
        imgList: []
      }
    },
    created() {
      this.getImgList()
    },
    methods: {
      getImgList() {
        axios.get('http://www.liulongbin.top:3005/api/getlunbo').then(resu => {
          if (resu.status == 200) {
            this.imgList = resu.data.message
          } else {
            Toast({
              message: '轮播图获取失败',
              duration: 3000
            });
          }
        })
      }
    }
  }
</script>

<style scoped>
  .mint-swipe {
    height: 200px;
  }

  .mint-swipe-item img {
    height: 100%;
    width: 100%;
    text-align: center;
  }

  .mui-grid-view.mui-grid-9 {
    background-color: #fff;
  }

  .mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: none;
  }

  .mui-table-view-cell img {
    width: 60px;
  }

  .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body {
    font-size: 14px;
  }

</style>
