import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: () => import('@/components/Home')
    },
    {
      path: '/a',
      name: 'A',
      component: () => import('@/components/A'),
    },
    {
      path: '/b',
      name: 'B',
      component: () => import('@/components/B'),
    },
    {
      path: '/c',
      name: 'C',
      component: () => import('@/components/C'),
    },
    {
      path: '/d',
      name: 'D',
      component: () => import('@/components/D'),
    },
    {
      path: '/e',
      name: 'E',
      component: () => import('@/components/E'),
    },
    {
      path: '/f',
      name: 'F',
      component: () => import('@/components/F'),
    }
  ]
})
