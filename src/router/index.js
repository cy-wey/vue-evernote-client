import Vue from 'vue'
import Router from 'vue-router'

//获取原型对象上的Replace函数
const originalReplace = Router.prototype.replace
//修改原型对象中的Replace方法
Router.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      alias: '/notebooks',
      component:() => import('@/components/NotebookList.vue')
    },
    {
      path: '/login',
      component: ()=> import("@/components/Login.vue")
    },
    {
      path: '/note',
      component: ()=> import("@/components/NoteDetail.vue")
    },
    {
      path: '/trash',
      component:  ()=> import("@/components/TrashDetail.vue")
    }
  ]
})
