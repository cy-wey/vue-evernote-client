<template>
  <div id="trash-detail">
    <h1>noteId : {{ $route.query.noteId }}</h1>
  </div>
</template>

<script>
import Auth from "../apis/auth";
import {mapState, mapGetters, mapMutations, mapActions} from "vuex";
export default {
  data() {
    return {
      msg: '笔记本详情页'
    }
  },
  created() {
    this.checkLogin({path:'/login'})
  },
  methods:{
    ...mapActions([
      'checkLogin'
    ])
  }
}
</script>

<style scoped>
h1 {
  color: blue;
}

</style>
