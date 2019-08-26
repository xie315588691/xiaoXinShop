<template>
  <div>
    <div class="mui-numbox" data-numbox-min='1'>
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChange" ref="numBox">
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
  </div>
</template>

<script>
  import mui from '../lib/mui/js/mui.min.js'

  export default {
    name: "numberBox",
    props: ['maxNum'],
    data() {
      return {
        num: 1,

      }
    },
    methods: {
      countChange() {
        const val = this.$refs.numBox.value
        this.$emit('getCount', parseInt(val))
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
