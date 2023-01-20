<template>
  <div id="note" class="detail">
    <note-sidebar @update:notes="val => notes = val"/>
    <div class="note-detail">
      <div class="note-empty" v-show="!curNote.id">请选择笔记</div>
      <div class="note-detail-ct" v-show="curNote.id">
        <div class="note-bar">
          <span>创建日期：{{curNote.createdAtFriendly}}</span>
          <span>更新日期：{{curNote.updatedAtFriendly}}</span>
          <span>{{curNote.statusText}}</span>
          <span class="iconfont icon-delete"/>
          <span class="iconfont icon-fullscreen"/>
        </div>
        <div class="note-title">
          <input type="text" v-model:value="curNote.title" placeholder="输入标题">
        </div>
        <div class="editor">
          <textarea v-show="true" :value="curNote.content" placeholder="输入内容，支持 markdown"/>
          <div class="preview markdown-body" v-show="false"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "../apis/auth";
import noteSidebar from "./NoteSidebar";
import Bus from "../helpers/bus";
export default {
  components: {noteSidebar},

  data() {
    return {
      curNote: {},
      notes:[]
    }
  },
  created() {
    Auth.getInfo().then(res => {
      if (!res.isLogin) {
        this.$router.push({path: '/login'})
      }
    })
    Bus.$on('update:notes', val=> {
      this.curNote = val.find(note => note.id == this.$route.query.noteId) || {}
    })
  },
  beforeRouteUpdate(to, from, next) {
    this.curNote = this.notes.find(note => note.id == to.query.noteId) || {}
    next()
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/note-detail);

#note {
  display: flex;
  align-items: stretch;
  background: #fff;
  flex: 1;
}
</style>
