<template>
  <div class="layout-wrapper layout-2">
    <div class="layout-inner">
      

      <div class="layout-container" style="background:#f5f6f7">
        <app-layout-navbar />
        <sidenav style="min-height:100%; width:15%;float:right;position:absolute;right:0;top:100px;margin:0 2.5%">
            <h3 style="font:25px 'Yekan' bold; text-align:right">بازار ها</h3>
            <br>
            <router-link v-bind:class="{ btnsactive: isMenuActive('/spot') }" class="btns" style="margin:5px;text-align:right;border-radius:15px;; width: 90% ; margin-right:10%!important ;padding:5px " to="spot">
               <a style="margin-top:-5px;font:16px 'Yekan' ;">  اسپات</a><i class="fas fa-chart-pie" style="margin: 0 10px ; font-size:18px"></i>
            </router-link>
            <router-link v-bind:class="{ btnsactive: isMenuActive('/leverage') }" class="btns" style="margin:5px;text-align:right;border-radius:15px;; width: 90% ; margin-right:10%!important ;padding:5px " to="leverage">
              <a style="margin-top:-5px;font:16px 'Yekan' ;">  لوریج</a><i class="fas fa-balance-scale-right" style="margin: 0 10px ; font-size:18px"></i>
            </router-link>
            <router-link v-bind:class="{ btnsactive: isMenuActive('/ranks') }" class="btns" style="margin:5px;text-align:right;border-radius:15px;; width: 90% ; margin-right:10%!important ;padding:5px " to="ranks">
              <a style="margin-top:-5px;font:16px 'Yekan' ;">  بیشترین ها</a><i class="fas fa-trophy" style="margin: 0 10px ; font-size:18px"></i>
            </router-link>
          
        </sidenav>
        <div style="width:80%;position:absolute;left:0;top:100px">
        <b-card class="" style="border-radius:15px;width:90%;margin:auto;border-style:none">
            <router-view />
        </b-card>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import LayoutNavbar from './LayoutNavbar'
import LayoutSidenav from './LayoutSidenav'
import { Sidenav, SidenavLink, SidenavRouterLink, SidenavMenu, SidenavHeader, SidenavBlock, SidenavDivider } from '@/vendor/libs/sidenav'

export default {
  name: 'app-layout-2',
  components: {
    'app-layout-navbar': LayoutNavbar,
    'app-layout-sidenav': LayoutSidenav,
    Sidenav,
    SidenavLink,
    SidenavRouterLink,
    SidenavMenu,
    SidenavHeader,
    SidenavBlock,
    SidenavDivider
  },

  mounted () {
    this.layoutHelpers.init()
    this.layoutHelpers.update()
    this.layoutHelpers.setAutoUpdate(true)
  },

  beforeDestroy () {
    this.layoutHelpers.destroy()
  },
  methods: {
    closeSidenav () {
      this.layoutHelpers.setCollapsed(true)
    },
    isMenuActive (url) {
      return this.$route.path.indexOf(url) === 0
    },

    isMenuOpen (url) {
      return this.$route.path.indexOf(url) === 0 && this.orientation !== 'horizontal'
    },

    toggleSidenav () {
      this.layoutHelpers.toggleCollapsed()
    }
  }
}
</script>
<style>
body{
  background:#f5f6f7
}
.btnsactive{
color:#ff7028!important;
background:#ffede3
}
.btns:hover{
color:#ff7028!important;
background:#ffede3
}
.btns{
color:#666
}
</style>