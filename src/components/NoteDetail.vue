<template>
  <div id="note" class="detail">
    <note-sidebar></note-sidebar>
    <h1>notebookId:{{ $route.query.notebookId }}</h1>
    <h1>noteId:{{ $route.query.noteId }}</h1>
  </div>
</template>

<script>
import Auth from "../apis/auth";
import noteSidebar from "./NoteSidebar";

export default {
  components: {noteSidebar},

  data() {
    return {
      msg: '笔记本详请页'
    }
  },
  created() {
    Auth.getInfo().then(res => {
      if (!res.isLogin) {
        this.$router.push({path: '/login'})
      }
    })
  }
}
</script>

<style scoped>
#note {
  display: flex;
  align-items: stretch;
  background: #fff;
  flex: 1;
}
</style>
