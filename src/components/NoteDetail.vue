<template>
  <div id="note" class="detail">
    <note-sidebar></note-sidebar>
    <div class="note-detail">
      <div class="note-empty" v-show="false">请选择笔记</div>
      <div class="note-detail-ct" v-show="true">
        <div class="note-bar">
          <span>创建日期：2天前</span>
          <span>更新日期：1分钟前</span>
          <span>已保存</span>
          <span class="iconfont icon-delete"/>
          <span class="iconfont icon-fullscreen"/>
        </div>
        <div class="note-title">
          <input type="text" placeholder="输入标题">
        </div>
        <div class="editor">
          <textarea v-show="true" placeholder="输入内容，支持 markdown"/>
          <div class="preview markdown-body" v-show="false"></div>
        </div>
      </div>
    </div>
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

<style lang="less" scoped>
@import url(../assets/css/note-detail);

#note {
  display: flex;
  align-items: stretch;
  background: #fff;
  flex: 1;
}
</style>
