<template>
  <b-navbar toggleable="lg" :variant="getLayoutNavbarBg()" class="layout-navbar align-items-lg-center container-p-x">

  </b-navbar>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app-layout-navbar',
  props: {
    sidenavToggle: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    this.logout()
  },
  methods: {
    logout () {
      axios.defaults.headers.common.Authorization = ''
      localStorage.removeItem('token')
      localStorage.removeItem('admin')
      localStorage.removeItem('username')
      localStorage.removeItem('userid')
      this.$store.commit('removeToken')
      this.$router.push('/login')
    }
  }
}
</script>
