import Vue from 'vue'
import Router from 'vue-router'

//获取原型对象上的Replace函数
const originalReplace = Router.prototype.push
//修改原型对象中的Replace方法
Router.prototype.push = function push(location) {
  return originalReplace.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      alias: '/notebooks',
      component: () => import('@/components/NotebookList.vue')
    },
    {
      path: '/login',
      component: () => import("@/components/Login.vue")
    },
    {
      path: '/note',
      component: () => import("@/components/NoteDetail.vue")
    },
    {
      path: '/trash',
      component: () => import("@/components/TrashDetail.vue")
    }
  ]
})
