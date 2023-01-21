import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/Login";
import NoteDetail from "../components/NoteDetail";
import Notebooks from "../components/NotebookList";
import TrashDetail from "../components/TrashDetail";

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
      path: '/login',
      component: Login
    },
    {
      path: '/notebooks',
      component: Notebooks
    },
    {
      path: '/note',
      component: NoteDetail
    },
    {
      path: '/trash',
      component: TrashDetail
    }
  ]
})
