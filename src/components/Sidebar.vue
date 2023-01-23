<template>
  <div id="sidebar">
    <avatar/>
    <div class="icons">

      <router-link to="/note/" title="笔记">
        <i class="iconfont icon-note"></i>
        <span>笔记</span>
      </router-link>
      <router-link to="/notebooks" title="笔记本">
        <i class="iconfont icon-notebook"></i>
        <span>笔记本</span>
      </router-link>
      <router-link to="/trash/" title="回收站">
        <i class="iconfont icon-trash"></i>
        <span>回收站</span>
      </router-link>
    </div>
    <div v-if="!isMobile" class="logout" title="注销登录" @click="onLogout">
      <i class="iconfont icon-logout"></i>
    </div>
  </div>
</template>

<script>
import Avatar from "./Avatar";
import {mapActions} from 'vuex'
import {inject} from "vue";
export default {
  setup() {
    const menuVisible = inject('menuVisible')
    const isMobile = inject('isMobile')
    return {menuVisible,isMobile}
  },
  name: "Sidebar",
  components: {Avatar},
  methods: {
    ...mapActions([
      'logout'
    ]),
    onLogout() {
      this.logout({path: '/login'})
    }
  }
}
</script>

<style lang="less" scoped>
#sidebar {
  width: 56px;
  position: relative;
  text-align: center;
  background-color: #2c333c;

  @media (max-width: 800px) {
    width: 100%;
    bottom: 0;
    height: 70px;
    position: fixed;
    z-index: 10;
  }

  .icons {
    margin-top: 15px;
    @media (max-width: 800px) {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      margin: 0;

    }

    a {
      padding: 6px 0;
      display: block;

      span {
        display: none;
      }

      @media (max-width: 800px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        height: 70px;
        padding: 0;
        span {
          display: block;
          color: white;
        }

        .iconfont {
          font-size: 26px;
        }
      }
    }

    .router-link-active {
      background-color: #5e6266;
      @media (max-width: 800px) {

        background-color: #2c333c;
        .iconfont {
          font-size: 26px;
          color: #0099FF;
        }
        span {
          color: #0099FF;
        }
      }
    }
  }

  .logout {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    cursor: pointer;
    @media (max-width: 800px) {
      display: none;
      position: fixed;
      top: 12px;
      right: 6px;
      text-align: right;
      width: 20px;
      height: 20px;
      .iconfont {
        color: black;
      }
    }
  }

  .iconfont {
    color: #fff;
  }


}
</style>
