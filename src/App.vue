<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style src="./style.scss" lang="scss"></style>
<style>
body{
  font-family: 'yekan';
}
</style>

<script>
import axios from 'axios'
import themeSettings from '@/vendor/libs/theme-settings/theme-settings.js'
import themeChanger from "./theme";
export default {
  created () {
    document.title = 'CAITEX'
  },
  computed: {
    isIdle () {
      return this.$store.state.idleVue.isIdle
    }
  },
  methods: {
  },
  mounted () {
    

    axios.get("/userinfo")
    .then(({data: r})=>{
      this.$store.commit('setUser', r && r[0])
    })
    .catch(e=>{
      console.log(e)
    })


    fetch("https://www.alfacoins.com/api/rates.json", {
      headers: {accept: "application/json"}
    })
    .then(res => {
      return res.json()
    })
    .then(r=>{
      const d = {}
      Object.keys(r).map(key => {
        let k = key + "USD"
        let v = r[key].find(g => g["code"] === "USD")
        d[k] = +v['rate']
      })
      this.$store.commit('setRates', d)
    })
    .catch(e=>{
      console.log(e)
    })
  },
  name: 'app',
  metaInfo: {
    title: 'Index',
    titleTemplate: 'CAITEX - %s'
  },
  updated () {
    // Remove loading state
    function readCookie(name) {
          var c = document.cookie.split('; '),
          cookies = {}, i, C;

          for (i = c.length - 1; i >= 0; i--) {
              C = c[i].split('=');
              cookies[C[0]] = C[1];
          }

          return cookies[name];
      }
      this.$store.commit('initializeStore')
      if(readCookie('googtrans')){
        var lan = readCookie('googtrans').replace('/fa/' , '')
        if(lan === 'ar'){
          if(this.$store.state.rtl === 'false'){
          themeSettings.setRtl(true)
          this.$store.commit('setrtl', true)
          localStorage.setItem('rtl' , true)
        }
        }else{
        if(this.$store.state.rtl === 'true'){
          themeSettings.setRtl(false)
          this.$store.commit('setrtl', false)
          localStorage.setItem('rtl' , false)
        }
        }
      }else{
        if(!this.$store.state.rtl === 'false'){
          alert(2)
            this.$store.commit('setrtl', false)
            localStorage.setItem('rtl' , false)
            themeSettings.setRtl(false)
          }
      }
    setTimeout(() => document.body.classList.remove('app-loading'), 1)
    document.body.classList.remove('app-loading')
    this.$store.commit('initializeStore')
    const token = this.$store.state.token
    if (token) {
      axios.defaults.headers.common.Authorization = 'Token ' + token
      this.$store.state.isAuthenticated = true
    } else {
      axios.defaults.headers.common.Authorization = ''
    }
    if(this.$store.state.dark === 'dark'){
      this.themeChanger = new themeChanger()
      this.themeChanger._addDarkTheme();
    }else{
      this.themeChanger = new themeChanger()
      this.themeChanger._removeDarkTheme()
    }
  },
  beforeCreate () {
    document.body.classList.remove('app-loading')
    this.$store.commit('initializeStore')
    const token = this.$store.state.token
    if (token) {
      axios.defaults.headers.common.Authorization = 'Token ' + token
      this.$store.state.isAuthenticated = true
    } else {
      axios.defaults.headers.common.Authorization = ''
    }
    if(this.$store.state.dark === 'dark'){
      this.themeChanger = new themeChanger()
      this.themeChanger._addDarkTheme();
    }else{
      this.themeChanger = new themeChanger()
      this.themeChanger._removeDarkTheme()
    }
  }
}
</script>
<style>
body{
  position: absolute;
  top:0
}
</style>