import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/Login";
import NoteDetail from "../components/NoteDetail";
import Notebooks from "../components/NotebookList";
import TrashDetail from "../components/TrashDetail";

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
