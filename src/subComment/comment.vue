<template>
  <div>
    <h3>评论详情</h3>
    <hr/>
    <form @submit.prevent="getContentSubmit">
      <textarea placeholder="最多吐槽120字;" v-model="content" maxlength="120"></textarea>
      <input type="submit" value="提交评论"/>
    </form>

    <ul>
      <li v-for="(item,index) in commentList" :key="item.add_time">
        <span>第{{ index+1 }}楼 用户:{{ item.user_name }} 发表时间：{{ item.add_time|dataFormat }}</span>
        <p>{{item.content=='undefined'?'此用懒得评论':item.content}}</p>
      </li>

    </ul>
    <button type="button" class="mui-btn mui-btn-warning mui-btn-outlined" @click="getMore">
      加载更多
    </button>
  </div>

</template>

<script>
  import axios from 'axios'
  import {Toast} from 'mint-ui';

  export default {
    name: "comment",
    data() {
      return {
        commentList: [],
        index: 1,
        content: ''
      }
    },
    props: ['newsId'],
    created() {
      this.getCommentList()
    },
    methods: {
      getCommentList() {
        axios.get('http://www.liulongbin.top:3005/api/getcomments/' + this.newsId + '?pageindex=' + this.index).then(resu => {
          if (resu.data.status == 0) {
            this.commentList = this.commentList.concat(resu.data.message)
          } else {
            Toast({
              message: '获取评论列表失败！',
              duration: 2000
            });
          }
        })

      },
      getMore() {
        this.index++;
        this.getCommentList()
      },

      getContentSubmit() {
        if (this.content.trim()) {
          axios.post('http://www.liulongbin.top:3005/api/postcomment/' + this.newsId, {
            content: this.content.trim()
          }).then(resu => {
            if (resu.data.status == 0) {
              this.commentList.unshift({
                add_time: Date.now(),
                user_name:'匿名用户',
                content:this.content.trim()
              })
              this.content=''
              console.log(resu);
              // Toast({
              //   message: '提交评论成功！',
              //   duration: 2000
              // });
            } else {
              Toast({
                message: '提交评论失败！',
                duration: 2000
              });
            }
          })
        }

      }
    },


  }
</script>

<style scoped>
  textarea {
    margin: 0;
  }

  p {
    margin: 0;
    padding: 0;
  }

  ul, li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    padding: 5px;
    font-size: 12px;
  }

  li span {
    background-color: #ccc;
    display: block;
    /*padding: 5px 20px;*/
  }

  li p {
    padding: 0 20px;
  }

  input {
    width: 100%;
  }

  button {
    width: 100%;
  }

</style>
