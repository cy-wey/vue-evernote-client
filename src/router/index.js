import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from "../components/Login";
import NoteDetail from "../components/NoteDetail";
import Notebooks from "../components/NotebookList";
import TrashDetail from "../components/TrashDetail";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/notebooks',
      component: Notebooks
    },
    {
      path: '/note/:noteId',
      component: NoteDetail
    },
    {
      path: '/trash/:trashId',
      component: TrashDetail
    }
  ]
})
