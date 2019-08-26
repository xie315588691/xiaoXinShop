<template>
  <div>
    <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl"
           class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a :class="['mui-control-item',item.id== 0?'mui-active':'']" href="#item1mobile"
             data-wid="tab-top-subpage-1.html"
             v-for="item in categoryList" :key="item.id" @click="getImgList(item.id)">
            {{item.title}}
          </a>
        </div>
      </div>

    </div>

    <ul class="imgitems">
      <router-link v-for="item in imgList" class="imgitem" :to="'/home/photoInfo/'+item.id " :key="item.id" tag="li">
        <img v-lazy="item.img_url">
        <div class="info">
          <h1>{{item.title}}</h1>
          <p>{{item.zhaiyao}}</p>
        </div>
      </router-link>
    </ul>

  </div>

</template>

<script>
  import axios from 'axios'
  import mui from '../lib/mui/js/mui.min.js'


  export default {
    name: "photoList",
    data() {
      return {
        categoryList: [],
        imgList: []
      }
    },
    created() {
      this.getAllCategory()
      this.getImgList(0)
    },
    methods: {
      getAllCategory() {
        this.$http.get('api/getimgcategory').then(resu => {
          if (resu.status == 200) {
            this.categoryList = resu.data.message

          }
        })
      },
      getImgList(id) {
        this.$http.get('api/getimages/' + id).then(resu => {
          if (resu.data.status == 0) {
            this.imgList = resu.data.message
          }
        })

      }
    },
    mounted() {
      mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      });
    }
  }
</script>

<style scoped>
  * {
    touch-action: pan-y;
  }

  img[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto;

  }

  ul {
    margin: 0;
    padding: 0 10px;
  }

  .imgitem {
    list-style: none;
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    padding: 0;
    vertical-align: middle;
    position: relative;
  }

  li img {
    width: 100%;
    vertical-align: middle;
  }

  .info {
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .3);
  }

  .info h1 {
    font-size: 14px;
    color: #fff;
  }

  .info p {
    font-size: 12px;
    text-align: left;
    color: #fff;
  }
</style>
