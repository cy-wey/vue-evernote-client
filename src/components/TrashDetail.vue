<template>
  <div id="trash" class="detail">
    <div v-if="!isMobile || menuVisible" class="note-sidebar">
      <h3 class="notebook-title">回收站</h3>
      <div class="menu">
        <div>更新时间</div>
        <div>标题</div>
      </div>
      <ul class="notes">
        <li v-for="trashNote in trashNotes" @click="menuVisible = false">
          <router-link :to="`/trash?noteId=${trashNote.id}`">
            <span class="date">{{ trashNote.updatedAtFriendly }}</span>
            <span class="title">{{ trashNote.title }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div v-if="!isMobile || !menuVisible" class="note-detail">
      <div class="note-bar">
        <svg v-if="isMobile" @click="menuVisible = true" class="iconfont" aria-hidden="true">
          <use xlink:href="#icon-arrow-left-bold"></use>
        </svg>
        <span>创建日期: {{ curTrashNote.createdAtFriendly }}</span>
        <span>|</span>
        <span>更新日期: {{ curTrashNote.updatedAtFriendly }}</span>
        <span>|</span>
        <span>所属笔记本: {{ belongTo }}</span>
        <a class="btn action" @click="onRevert">恢复</a>
        <a class="btn action" @click="onDelete">彻底删除</a>
      </div>
      <div class="note-title">
        <a v-if="isMobile" class="btn action1" @click="onRevert">恢复</a>
        <a v-if="isMobile" class="btn action2" @click="onDelete">彻底删除</a>
        <span>{{ curTrashNote.title }}</span>
      </div>
      <div class="editor">
        <div class="preview markdown-body" v-html="compiledMarkdown"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from "vuex";
import {inject} from "vue";

import {md} from '../lib/markdown-it'
export default {
  setup() {
    const menuVisible = inject('menuVisible')
    const isMobile = inject('isMobile')
    return {menuVisible, isMobile}
  },
  data() {
    return {}
  },
  created() {
    this.checkLogin({path: '/login'})
    this.getNotebooks()
    this.getTrashNotes()
      .then(() => {
        this.setCurTrashNote({curTrashNoteId: this.$route.query.noteId})
        this.$router.replace({
          path: '/trash',
          query: {noteId: this.curTrashNote.id}
        })
      })
  },

  computed: {
    ...mapGetters([
      'trashNotes',
      'curTrashNote',
      'belongTo'
    ]),
    compiledMarkdown() {
      return md.render(this.curTrashNote.content || '')
    }
  },
  methods: {
    ...mapMutations([
      'setCurTrashNote'
    ]),
    ...mapActions([
      'checkLogin',
      'deleteTrashNote',
      'revertTrashNote',
      'getTrashNotes',
      'getNotebooks'
    ]),
    onRevert() {
      this.revertTrashNote({noteId: this.curTrashNote.id})
        .then(() => {
          this.setCurTrashNote()
          this.$router.replace({
            path: '/trash',
            query: {noteId: this.curTrashNote.id}
          })
        })
    },
    onDelete() {
      this.menuVisible = true;
      this.$confirm('删除后将无法恢复', '确定删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteTrashNote({noteId: this.curTrashNote.id})
          .then(() => {
            this.setCurTrashNote()
            this.$router.replace({
              path: '/trash',
              query: {noteId: this.curTrashNote.id}
            })
          })
      })
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.setCurTrashNote({curTrashNoteId: to.query.noteId})
    next()
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/note-sidebar.less);
@import url(../assets/css/note-detail.less);

#trash {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;


  .note-title {
    @media (max-width: 800px) {
      .action1 {
        position: absolute;
        font-size: 12px;
        top: 30px;
        right: 20px;
      }

      .action2 {
        position: absolute;
        font-size: 12px;
        top: 30px;
        right: 60px;
      }
    }
  }

  .note-bar {
    .action {
      @media (max-width: 800px) {
        display: none;
      }
      float: right;
      margin-left: 10px;
      padding: 2px 4px;
      font-size: 12px;

    }
  }

}
</style>
