import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: resolve => require(['../components/Login.vue'], resolve)
    },
    {
      path:'/user',
      component: resolve => require(['../components/userHome.vue'], resolve),
      redirect: '/user/main-interface',
      children:[
        {
          path: '/user/main-interface',
          name: 'main-interface',
          component: resolve => require(['../components/mainInterface.vue'],resolve),
        },
        {
          path: '/user/shopping-cart',
          name: 'shopping-cart',
          component: resolve => require(['../components/shoppingCart.vue'],resolve),
        },
        {
          path: '/user/book-message',
          name: 'book-message',
          component: resolve => require(['../components/bookMessage.vue'],resolve)
        },
        {
          path: '/user/personal-center',
          name: 'personal-center',
          component: resolve => require(['../components/personalCenter.vue'], resolve)
        },
        {
          path: '/user/changeNick',
          name: 'changeNick',
          component: resolve => require(['../components/changeNick.vue'], resolve)
        },
        {
          path: '/user/changePassword',
          name: 'changePassword',
          component: resolve => require(['../components/changePassword.vue'], resolve)
        },
        {
          path: '/user/order-detail',
          name: 'order-detail',
          component: resolve => require(['../components/orderDetail.vue'], resolve)
        },
        {
          path: '/user/changeAddress',
          name: 'changePassword',
          component: resolve => require(['../components/changeAddr.vue'], resolve)
        },
        {
          path: '/user/ad',
          name: 'ad',
          component: resolve => require(['../components/Address.vue'],resolve),
        },
        {
          path: '/user/oc',
          name: 'oc',
          component: resolve => require(['../components/OrderConfirm.vue'],resolve),
        },

        {
          path: '/user/os',
          name: 'os',
          component: resolve => require(['../components/OrderSuccess.vue'],resolve),
        },
        {
          path: '/user/no',
          name: 'no',
          component: resolve => require(['../components/no.vue'],resolve),
        },
      ]
    },
  ]
})
