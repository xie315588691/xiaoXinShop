<template>
  <div class="goods-items">
    <router-link tag="div" :to="'/home/goodsInfo/'+item.id" class="goods-item" v-for="item in goodsList" :key="item.id">
      <img :src="item.img_url" alt="">
      <h2>{{item.title}}</h2>
      <div class="goods-info">
        <p class="goods-price">
          <span class="oldPrice">￥ {{item.sell_price}}</span>
          <span class="newPrice">￥{{item.market_price}}</span>
        </p>
        <p class="goods-sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity}}件</span>
        </p>
      </div>
    </router-link>

    <mt-button type="danger" size="large" @click="getMoreList">加载更多</mt-button>
  </div>

</template>

<script>
  export default {
    name: "goodsList",
    data() {
      return {
        index: 1,
        goodsList: [],
      }
    },
    created() {
      this.getGoodsList(this.index)
    },
    methods: {
      getGoodsList(index) {

        this.$http.get('api/getgoods?pageindex=' + index).then(resu => {
          if (resu.data.status == 0) {
            this.goodsList = this.goodsList.concat(resu.data.message)
          }

        })
      },
      getMoreList() {
        this.index++
        this.getGoodsList(this.index)
        console.log(this.index);
      }
    },

  }
</script>

<style scoped>
  .goods-items {
    display: flex;
    flex-wrap: wrap;
    margin: 5px;
    justify-content: space-between;

  }

  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    margin-bottom: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .goods-item img {
    width: 100%;
  }

  .goods-info {
    background-color: #efefef;
    margin: 2px;

  }

  .goods-price {
    margin-top: 5px;
  }

  .goods-item h2 {
    font-size: 12px;
    margin: 0;
    padding: 0;
    line-height: 14px;
  }

  .goods-item p {
    margin: 0;
    padding: 0 5px 5px 5px;
  }

  .goods-sell {
    font-size: 12px;
    display: flex;
    justify-content: space-between;
  }

  .oldPrice {
    color: red;
    font-size: 14px;
    margin-right: 20px;
    font-weight: 700;
  }

  .newPrice {
    font-size: 12px;
    text-decoration: line-through;
  }
</style>
