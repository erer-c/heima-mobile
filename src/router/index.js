import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login'

Vue.use(VueRouter)
export default new VueRouter({
  routes: [{
    path: '/login',
    component: login
  }, {
    path: '/',
    component: () => import('@/views/tabBar'),
    children: [{
      path: '',
      component: () => import('@/views/home')
    }, {
      path: 'qa',
      component: () => import('@/views/qa')
    }, {
      path: 'video',
      component: () => import('@/views/video')
    }, {
      path: 'my',
      component: () => import('@/views/my')
    }]
  }, {
    path: '/article/:articleId',
    component: () => import('@/views/article'),
    // 将路由参数映射到组件的props中
    props: true
  }, {
    path: '/search',
    component: () => import('@/views/search')
  }]
})
