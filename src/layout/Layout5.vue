<template>
  <div class="layout-wrapper layout-2">
    <div class="layout-inner">
      

      <div class="layout-container">
        <app-layout-navbar />
        <div>
            <router-view />
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