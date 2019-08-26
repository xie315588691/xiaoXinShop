import Vue from 'vue'
import vueRouter from 'vue-router'

import homebox from './views/home.vue'
import memberbox from './views/member.vue'
import searchbox from './views/search.vue'
import shopbox from './views/shopping.vue'
import newsListBox from './news/newsList.vue'
import newsInfoBox from './news/newsinfo.vue'

import photoListBox from './home/photoList.vue'
import photoInfo from './home/photoInfo.vue'
import goodsList from './home/goodsList.vue'
import goodsInfo from './home/goodsInfo.vue'
import goodsDesc from './home/goodsDesc.vue'
import goodsComment from './home/goodsComment.vue'

Vue.use(vueRouter)
export default new vueRouter({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: homebox
    }, {
      path: '/member',
      component: memberbox
    }, {
      path: '/shopping',
      component: shopbox
    }, {
      path: '/search',
      component: searchbox
    },
    {
      path: '/home/newsList',
      component: newsListBox
    },
    {
      path: '/home/newsinfo/:id',
      component: newsInfoBox
    },
    {
      path: '/home/photoList',
      component: photoListBox
    }, {
      path: '/home/photoInfo/:id',
      component: photoInfo
    }, {
      path: '/home/goodsList',
      component: goodsList
    }, {
      path: '/home/goodsInfo/:id',
      component: goodsInfo
    }, {
      path: '/home/goodsDesc/:id',
      component: goodsDesc
    }, {
      path: '/home/goodsComment/:id',
      component: goodsComment
    }

  ],
  linkActiveClass: 'mui-active'

})
