<template>
  <div class="shopping">
    <!--    商品详细信息-->
    <div class="mui-card" v-for="(item,index) in goodsList" :key="item.id">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <mt-switch v-model="$store.getters.getGoodsSelect[item.id]"
                     @change="carSelect(item.id,$store.getters.getGoodsSelect[item.id])"></mt-switch>
          <img :src="item.thumb_path" alt="">
          <div class="shopping-info">
            <h2>{{item.title}}</h2>
            <div class="shopping-info-box">
              <span>￥ {{item.sell_price}}</span>
              <shopCarBox :initCount="$store.getters.getGoodsCount[item.id]" :goodsId="item.id"></shopCarBox>
              <a href="#" @click.prevent="remove(item.id,index)">删除</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--    结算-->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner goods-balance">
          <div class="balance-left">
            <p>总计(不含运费)</p>
            <p>已勾选商品 <span class="red">{{$store.getters.getCarCountAndAmound.count}}</span> 件, 总价 <span
              class="red">￥ {{$store.getters.getCarCountAndAmound.amount}}</span> 元</p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
    <p>{{$store.getters.getCarCountAndAmound}}</p>
  </div>
</template>

<script>
  import shopCarBox from '../subComment/shopCarBox.vue'

  export default {
    name: "shopping",
    data() {
      return {
        goodsList: []
      }
    },
    created() {
      this.getGoodsList()
    },
    methods: {
      getGoodsList() {
        var idArr = []
        this.$store.state.car.forEach(item => idArr.push(item.id))
        if (idArr.length) {
          this.$http.get('api/goods/getshopcarlist/' + idArr.join(',')).then(resu => {
            if (resu.data.status == 0) {
              this.goodsList = resu.data.message
            }
          })
        }


      },
      remove(id, index) {
        this.goodsList.splice(index, 1)
        this.$store.commit('removeCarById', id)
      },
      carSelect(id, val) {
        console.log(id + "===" + val)
        this.$store.commit('updateCarSelect', {
          id: id,
          selected: val
        })
      }
    },
    components: {
      shopCarBox
    }
  }
</script>

<style scoped>
  .shopping {
    background-color: #eee;
    overflow: hidden;
  }

  .mui-card-content-inner img {
    width: 60px;
    height: 60px;
  }

  .mui-card-content-inner h2 {
    font-size: 14px;
  }

  .mui-card-content-inner {
    display: flex;
    align-items: center;
  }

  .shopping-info {
    width: 100%;
  }

  .shopping-info .shopping-info-box {
    margin-top: 15px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .shopping-info-box span {
    color: red;
    font-weight: 700;
  }

  .goods-balance {
    justify-content: space-between;
  }

  .red {
    color: red;
    font-weight: 700;
  }
</style>
