<template>
  <div class="goodsInfo-container">

    <!--    轮播图-->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <mt-swipe :auto="3000">
            <mt-swipe-item v-for="item in bannerImgs" :key="item.src">
              <img :src="item.src" alt="">
            </mt-swipe-item>
          </mt-swipe>
        </div>
      </div>
    </div>
    <!--    商品购买区域-->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsInfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="goods-price">市场价：<span class="oldPrice">{{goodsInfo.market_price}}</span>销售价：<span class="newPrice">{{goodsInfo.sell_price}}</span>
          </p>
          <p class="goods-num">
            购买数量：
            <numberBox @getCount="getNumboxCount" :maxNum="goodsInfo.stock_quantity"></numberBox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>
    <div class="goods-ball">
      <transition @before-enter="beforeEnter"
                  @enter="enter"
                  @after-enter="afterEnter">
        <div class="ball" v-show="ballFlag" ref="ball"></div>
      </transition>
    </div>
    <!--    商品参数区域-->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodsInfo.goods_no}}</p>
          <p>库存情况：{{goodsInfo.stock_quantity}}</p>
          <p>上架时间：{{goodsInfo.add_time|dataFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" plain size="large" @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" plain size="large" @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
  import numberBox from '../subComment/numberBox.vue'

  export default {
    name: "goodsInfo",
    components: {
      numberBox
    },
    data() {
      return {
        id: this.$route.params.id,
        bannerImgs: [],
        goodsInfo: {},
        ballFlag: false,
        selectCount: 1
      }
    },
    created() {
      this.getGoodsBanner()
      this.getGoodsInfo()
    },

    methods: {
      getGoodsBanner() {
        this.$http.get('api/getthumimages/' + this.id).then(resu => {
          if (resu.data.status == 0) {
            this.bannerImgs = resu.data.message
          }
        })
      },
      getGoodsInfo() {
        this.$http.get('api/goods/getinfo/' + this.id).then(resu => {
          console.log(resu);
          if (resu.data.status == 0) {
            this.goodsInfo = resu.data.message[0]
          }
        })

      },
      goDesc(id) {
        //去看描述
        this.$router.push('/home/goodsDesc/' + id)
      },
      goComment(id) {
        //去评论
        this.$router.push('/home/goodsComment/' + id)
      },
      addToCar() {
        //添加购物车
        this.ballFlag = !this.ballFlag


      },
      beforeEnter(el) {
        el.style.transform = 'translate(0,0)'
      },
      enter(el, done) {
        el.offsetWidth;
        //小球的
        const ballPosition = this.$refs.ball.getBoundingClientRect()
        //灰标的
        const badgePosition = document.getElementById('badge').getBoundingClientRect()

        const xDist = badgePosition.left - ballPosition.left
        const yDist = badgePosition.top - ballPosition.top
        el.style.transform = `translate(${xDist}px,${yDist}px)`
        el.style.transition = 'all 0.5s '
        done()

      },
      afterEnter() {
        this.ballFlag = !this.ballFlag
        //{id:商品的ID,count:数量，price:商品单价，selected:false}
        var goodsinfo = {id: this.id, count: this.selectCount, price: this.goodsInfo.sell_price, selected: false}
        this.$store.commit('addToCar', goodsinfo)

      },
      getNumboxCount(val) {
        this.selectCount = val
      }

    },

  }
</script>

<style scoped>
  .goodsInfo-container {
    background-color: #eee;
    overflow: hidden;
  }

  .mint-swipe {
    height: 200px;
    text-align: center;
  }

  .mint-swipe img {
    height: 200px;
  }

  .goods-price {
    font-size: 14px;

  }

  .mui-card-content-inner {
    position: relative;
  }

  .oldPrice {
    font-size: 12px;
    color: #ccc;
    text-decoration: line-through;
    margin-right: 10px;
  }

  .newPrice {
    font-size: 16px;
    font-weight: 700;
    color: red;
  }

  .goods-num {
    display: flex;
    line-height: 35px;
    position: relative;
  }

  .mui-card-footer {
    display: flex;
    flex-direction: column;
  }

  .mui-card-footer button:nth-of-type(1) {
    margin-bottom: 10px;
  }

  .goods-ball {
    position: relative;
  }

  .ball {
    width: 20px;
    height: 20px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    top: -106px;
    left: 144px;
    z-index: 11;

  }
</style>
