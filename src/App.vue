<template>
  <div id="app">
    <sidebar/>
    <router-view/>
  </div>
</template>

<script>
import sidebar from "./components/Sidebar";
import router from "./router/index";
import {provide, ref} from 'vue'

export default {
  name: 'App',
  components: {
    sidebar
  }, setup() {
    const width = document.documentElement.clientWidth;
    const menuVisible = ref(true);
    const isMobile = ref(width <= 800 ? true : false)
    provide("menuVisible", menuVisible); // set
    provide("isMobile", isMobile); // set
    router.afterEach(() => {
      if (width <= 800)
        isMobile.value = true;
    })
  }

}
</script>

<style lang="less">
/*@import '//at.alicdn.com/t/font_496303_kqrjhri8l25d0a4i.css';*/
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body, #app {
  height: 100%;
}

body {
  font-family: 'Avenir', Helvatica, Arial, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #eee;
}

a {
  text-decoration: none;
  color: #444;
}

ul, li {
  list-style: none;
}

.btn {
  color: #666;
  font-size: 12px;
  padding: 2px 4px;
  background-color: #fff;
  box-shadow: 0px 0px 2px 0px #ccc;
  border: none;
  cursor: pointer;
  display: inline-block;
}

#app {
  display: flex;
  align-items: stretch;
}

.el-message-box {
  @media (max-width: 800px) {
    width: 80% !important;
  }
}


</style>
