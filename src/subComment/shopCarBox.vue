<template>
  <div>
    <div class="mui-numbox" data-numbox-min='1' style="height: 25px;">
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input id="test" class="mui-input-numbox" type="number" :value="initCount" @change="countChange" ref="numBox"
             readonly>
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
  </div>
</template>

<script>
  import mui from '../lib/mui/js/mui.min.js'

  export default {
    name: "numberBox",
    props: ['maxNum', 'initCount', 'goodsId'],
    data() {
      return {
        num: 1,

      }
    },
    methods: {
      countChange() {
        console.log(this.$refs.numBox.value + "===" + this.goodsId);
        this.$store.commit('updateToCar', {
          id: this.goodsId,
          count: this.$refs.numBox.value
        })
      },

    },
    mounted() {
      mui('.mui-numbox').numbox()
    },
    watch: {
      'maxNum': function (newVal, oldVal) {
        mui('.mui-numbox').numbox().setOption('max', newVal)
      }
    }
  }
</script>

<style scoped>

</style>
