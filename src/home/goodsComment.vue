<template>
  <div>
    <commentBox :newsId="$route.params.id"></commentBox>
  </div>
</template>

<script>
  import commentBox from '../subComment/comment.vue'

  export default {
    name: "goodsComment",
    components: {
      commentBox
    }
  }
</script>

<style scoped>

</style>
