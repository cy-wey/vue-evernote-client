<template>
  <span @click="onLogout" v-if="!isMobile || this.$route.path === '/notebooks'" :title="username">{{ slug }}</span>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {inject, Ref} from 'vue'

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
    this.logout({path: '/login'})
  },
  mounted() {
  },
  methods: {
    ...mapActions([
      'checkLogin',
      'logout'
    ]),
    onLogout() {
      this.isMobile && this.logout({path: '/login'})
    }
  },

  computed: {
    ...mapGetters([
      'username',
      'slug'
    ])

  }
}
</script>

<style lang="less" scoped>
span {
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 32px;
  border-radius: 50%;
  background-color: #f2b81c;
  color: #fff;
  text-shadow: 1px 0 1px #795c19;
  text-transform: uppercase;
  font-size: 18px;
  margin-top: 15px;

  @media (max-width: 800px) {
    position: fixed;
    top: 6px;
    right: 10px;
    margin: 0;
  }
}
</style>
