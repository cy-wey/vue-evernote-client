<template>
  <span v-if="this.$route.path==='/notebooks' ? true : false" :title="username">{{ slug }}</span>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  data() {
    return {
    }
  },
  created() {
    this.setUser()
  },
  mounted() {
  },
  methods: {
    ...mapActions({
      'setUser':'checkLogin'
    })
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
    right: 30px;
    margin: 0;
  }
}
</style>
