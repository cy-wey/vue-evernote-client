<template>
  <div id="note" class="detail">
    <note-sidebar @update:notes="val => notes = val"/>
    <div class="note-detail">
      <div class="note-empty" v-show="!curNote.id">请选择笔记</div>
      <div class="note-detail-ct" v-show="curNote.id">
        <div class="note-bar">
          <span>创建日期：{{ curNote.createdAtFriendly }}</span>
          <span>更新日期：{{ curNote.updatedAtFriendly }}</span>
          <span>{{ statusText }}</span>
          <span class="iconfont icon-delete" @click="onDeleteNote" title="删除笔记"/>
          <span class="iconfont" :class="isShowPreview?'icon-edit':'icon-eye'" @click="isShowPreview = !isShowPreview"
                :title="isShowPreview?'编辑模式':'预览模式'"/>
        </div>
        <div class="note-title">
          <input type="text" v-model:value="curNote.title" @input="onUpdateNote" @keydown="statusText='正在输入...'"
                 placeholder="输入标题">
        </div>
        <div class="editor">
          <codemirror class="codemirror" v-model="curNote.content" :options="cmOptions" v-show="!isShowPreview"
                      @input="onUpdateNote" @inputRead="statusText='正在输入...'"></codemirror>
          <!--          <textarea v-show="isShowPreview" v-model:value="curNote.content" @input="onUpdateNote"-->
          <!--                    @keydown="statusText='正在输入...'" placeholder="输入内容，支持 markdown"/>-->

          <div class="preview markdown-body" v-html="previewContent" v-show="isShowPreview"></div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import noteSidebar from "./NoteSidebar";
import _ from 'lodash';
import MarkdownIt from 'markdown-it'
import {codemirror} from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/markdown/markdown.js'
import 'codemirror/theme/neat.css'
import 'codemirror/addon/display/placeholder.js'
import {mapState, mapGetters, mapMutations, mapActions} from "vuex";
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/github-dark.css";

import bash from 'highlight.js/lib/languages/bash'
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import java from 'highlight.js/lib/languages/java';
import sql from 'highlight.js/lib/languages/sql';
import nginx from 'highlight.js/lib/languages/nginx';
import json from 'highlight.js/lib/languages/json';
import yaml from 'highlight.js/lib/languages/yaml';
import xml from 'highlight.js/lib/languages/xml';
import shell from 'highlight.js/lib/languages/shell'

hljs.registerLanguage('bash', bash)
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('java', java);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('nginx', nginx);
hljs.registerLanguage('json', json);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('shell', shell);

let md = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: true,
  xhtmlOut: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          "</code></pre>"
        );
      } catch (__) { }
    }

    return (
      '<pre class="hljs"><code>' +
      md.utils.escapeHtml(str) +
      "</code></pre>"
    );
  },
})

export default {
  components: {
    noteSidebar,
    codemirror
  },

  data() {
    return {
      statusText: '笔记未改动',
      isShowPreview: false,
      cmOptions: {
        tabSize: 4,
        mode: 'text/x-markdown',
        theme: 'neat',
        lineNumbers: false,
        line: true,
        lineWrapping: true,
        placeholder:'输入内容，支持 markdown'
        // more codemirror options, 更多 codemirror 的高级配置...
      }
    }
  },
  created() {
    this.checkLogin({path: '/login'})
  },
  computed: {
    ...mapGetters([
      'notes',
      "curNote"
    ]),
    previewContent() {
      return md.render(this.curNote.content || '')
    }
  },

  methods: {
    ...mapMutations([
      'setCurNote'
    ]),
    ...mapActions([
      'updateNote',
      'deleteNote',
      'checkLogin'
    ]),
    onUpdateNote: _.debounce(function () {
      this.updateNote({noteId: this.curNote.id, title: this.curNote.title, content: this.curNote.content})
        .then(data => {
          this.statusText = '已保存'
        }).catch(data => {
        this.statusText = '保存出错'
      })
    }, 3000),

    onDeleteNote() {
      this.deleteNote({noteId: this.curNote.id})
        .then(() => {
          this.setCurNote()
          this.$router.replace({
            path: '/note',
            query: {
              noteId: this.curNote.id,
              notebookId: this.$route.query.notebookId
            }
          })

        })
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.setCurNote({curNoteId: to.query.noteId})
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

  p {
    border: 1px solid red;
  }
}

</style>
