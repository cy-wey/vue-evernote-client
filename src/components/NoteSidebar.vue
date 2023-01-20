<template>
  <div class="note-sidebar">
    <span class="btn add-note">添加笔记</span>
    <el-dropdown class="notebook-title" @click="handleCommand" placement="bottom">
    <span class="el-dropdown-link">
      我的笔记本1<i class="iconfont icon-down"></i>
    </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="notebook in notebooks" :command="notebook.id">{{ notebook.title }}</el-dropdown-item>
        <el-dropdown-item command="trash">回收站</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li v-for="note in notes">
        <router-link :to="`/note?noteId=${note.id}`">
          <span class="date">{{ note.updateAtFriendly }}</span>
          <span class="title">{{ note.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "NoteSidebar",
  data() {
    return {
      notebooks: [
        {
          id: 1,
          title: 'hello1'
        },
        {
          id: 2,
          title: 'hello2',
          updateAtFriendly:'3分钟前'
        }
      ],
      notes:[
        {
          id:11,
          title:'第一个笔记',
          updateAtFriendly:'3分钟前'
        },
        {
          id:12,
          title:'第二个笔记',
          updateAtFriendly:'4分钟前'
        },
        {
          id:13,
          title:'第三个笔记',
          updateAtFriendly:'6分钟前'
        }
      ]
    }
  },
  methods:{
    handleCommand(cmd) {
      console.log(cmd);
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/note-sidebar.less);
</style>
