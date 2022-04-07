<template>
<div>
  <b-navbar toggleable="lg" :variant="getLayoutNavbarBg()" class="layout-navbar align-items-lg-center container-p-x" style="padding:1px;height:50px">
    <a href="/" style="position:absolute ; height:60px ; width:60px ; left:48% ; z-index:1"><svg viewBox="0 0 148 80" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="w-100 h-100 position-absolute"><defs><linearGradient id="a" x1="46.49" x2="62.46" y1="53.39" y2="48.2" gradientUnits="userSpaceOnUse"><stop stop-opacity=".25" offset="0"></stop><stop stop-opacity=".1" offset=".3"></stop><stop stop-opacity="0" offset=".9"></stop></linearGradient><linearGradient id="e" x1="76.9" x2="92.64" y1="26.38" y2="31.49" xlink:href="#a"></linearGradient><linearGradient id="d" x1="107.12" x2="122.74" y1="53.41" y2="48.33" xlink:href="#a"></linearGradient></defs><path transform="translate(-.1)" d="M121.36,0,104.42,45.08,88.71,3.28A5.09,5.09,0,0,0,83.93,0H64.27A5.09,5.09,0,0,0,59.5,3.28L43.79,45.08,26.85,0H.1L29.43,76.74A5.09,5.09,0,0,0,34.19,80H53.39a5.09,5.09,0,0,0,4.77-3.26L74.1,35l16,41.74A5.09,5.09,0,0,0,94.82,80h18.95a5.09,5.09,0,0,0,4.76-3.24L148.1,0Z" class="fill-primary"></path><path transform="translate(-.1)" d="M52.19,22.73l-8.4,22.35L56.51,78.94a5,5,0,0,0,1.64-2.19l7.34-19.2Z" fill="url(#a)"></path><path transform="translate(-.1)" d="M95.73,22l-7-18.69a5,5,0,0,0-1.64-2.21L74.1,35l8.33,21.79Z" fill="url(#e)"></path><path transform="translate(-.1)" d="M112.73,23l-8.31,22.12,12.66,33.7a5,5,0,0,0,1.45-2l7.3-18.93Z" fill="url(#d)"></path></svg></a>
      <a style="margin: 8px; color: #444444;" class=" d-lg-none d-xl-none d-lg-none  nav-item nav-link px-0 mr-lg-4" href="javascript:void(0)" @click="toggleSidenav">
      </a>
    <!-- Brand demo (see demo.css) -->

    <!-- Sidenav toggle (see demo.css) -->
    <b-navbar-toggle target="app-layout-navbar"></b-navbar-toggle>

    <b-collapse is-nav id="app-layout-navbar">
      <!-- Divider -->
      <hr class="d-lg-none w-100 my-2">

      <b-navbar-nav class="align-items-lg-center">
        <!-- Search -->
        <label class="nav-item navbar-text navbar-search-box p-0 active">
          <span class="navbar-search-input pl-2">
          </span>
        </label>
      </b-navbar-nav>

      <b-navbar-nav class="align-items-lg-center ml-auto">
        <b-nav-item-dropdown v-if="store.state.isAuthenticated" no-caret :right="!isRtlMode" class="demo-navbar-notifications mr-lg-3">
          <template slot="button-content">
            <i class="ion ion-md-notifications-outline navbar-icon align-middle" @click="seen()"></i>
            <span v-if="nunseen" class="badge badge-primary badge-dot indicator"></span>
            <span class="d-lg-none align-middle">&nbsp; Notifications</span>
          </template>

          <b-list-group flush style="max-height:250px ; overflow:auto">
            <b-list-group-item v-for="(item, idx) in notification" v-bind:key="idx" href="javascript:void(0)" class="media d-flex align-items-center" style="max-height:200px">
              <div class="media-body line-height-condenced ml-3">
                <div class="text-body">{{item.title}}</div>
                <div class="text-light small mt-1">
                  {{item.text}}
                </div>
                <div class="text-light small mt-1">{{item.get_age}}</div>
              </div>
            </b-list-group-item>
          </b-list-group>
          <b-list-group v-if="!notification.length" flush>
            <b-list-group-item href="javascript:void(0)" class="media d-flex align-items-center">
                <h5 style="text-align:center; width:100%">پیامی دریافت نکرده اید</h5>
            </b-list-group-item>
          </b-list-group>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown v-if="store.state.isAuthenticated" no-caret :right="!isRtlMode" class="demo-navbar-messages mr-lg-3">
          <template slot="button-content">
            <i class="ion ion-ios-mail navbar-icon align-middle" @click="read()"></i>
            <span v-if="tunseen" class="badge badge-primary badge-dot indicator"></span>
            <span class="d-lg-none align-middle">&nbsp; Messages</span>
          </template>
          <b-list-group v-for="(item, idx) in tickets" v-bind:key="idx" flush>
            <router-link :to="`/ticket/${item.id}`">
            <b-list-group-item href="javascript:void(0)" class="media d-flex align-items-center">
              <div class="media-body ml-3">
                <h5>{{item.title}}</h5>
                <div class="text-body line-height-condenced">{{item.get_lastticket}}</div>
                <div class="text-light small mt-1">
                   {{item.get_age}}
                </div>
              </div>
            </b-list-group-item>
            </router-link>
          </b-list-group>
          <b-list-group v-if="!tickets.length" flush>
            <b-list-group-item href="javascript:void(0)" class="media d-flex align-items-center">
                <h5 style="text-align:center; width:100%">هنوز تیکتی ایجاد نکردید</h5>
            </b-list-group-item>
          </b-list-group>
          <router-link to="/ticket">
          <div class="bg-primary text-center text-white font-weight-bold p-3">
          ایجاد تیکت جدید
          </div>
          </router-link>
          </b-nav-item-dropdown>

        <!-- Divider -->
        <div class="nav-item d-none d-lg-block text-big font-weight-light line-height-1 opacity-25 mr-3 ml-1">|</div>

        <b-nav-item-dropdown :right="!isRtlMode" class="demo-navbar-user">
          <template slot="button-content">
            <span class="d-inline-flex flex-lg-row-reverse align-items-center align-middle">
              <i class="ion ion-ios-contact"></i>
              <div v-if="store.state.isAuthenticated">
              <span v-if="userinfo.last_name" class="px-1 mr-lg-2 ml-2 ml-lg-0"> {{userinfo.last_name}} {{userinfo.first_name}} </span>
              <span v-else class="px-1 mr-lg-2 ml-2 ml-lg-0"> کاربر جدید سلام </span>
              </div>
            </span>
          </template>
          <div v-if="store.state.isAuthenticated">
           <b-dd-item to="/userpanel"><i class="ion ion-ios-person text-lightest"></i> &nbsp; پنل کاربری </b-dd-item>
          <b-dd-item><i class="ion ion-ios-mail text-lightest"></i> &nbsp; پیام ها</b-dd-item>
          <b-dd-item><i class="ion ion-md-settings text-lightest"></i> &nbsp;  احراز هویت</b-dd-item>
          <b-dd-divider />
          <b-dd-item @click="logout()"><i class="ion ion-ios-log-out text-danger"></i> &nbsp; خروج </b-dd-item>
          </div>
           <div v-if="!store.state.isAuthenticated">
           <b-dd-item v-if="!store.state.isAuthenticated" to="/login"><i class="ion ion-ios-person text-lightest"></i> &nbsp; ورود  </b-dd-item>
          <b-dd-item v-if="!store.state.isAuthenticated" to="/signup"><i class="ion ion-ios-mail text-lightest"></i> &nbsp;  ثبت نام</b-dd-item>
          </div>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  </div>
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
  data () {
    return {
      showMobileMenu: false,
      userinfo: {
      },
      store: this.$store,
      notification: [],
      nunseen: false,
      tickets: [],
      tunseen: false
    }
  },
  beforeCreate () {
    setTimeout(() => {
    }, 300)
  },
  mounted () {
    this.get_notifications()
    this.get_tickets()
  },
  methods: {
    async get_admin () {
      await axios
        .get('adminpanel/staff')
        .then(response => {
          const admin = response.data.level
          this.$store.commit('setAdmin', admin)
          this.$store.state.isAdmin = true
          localStorage.setItem('admin', admin)
        })
        .catch(() => {
        })
    },
    async get_notifications () {
      await axios
        .get('/notifications')
        .then(response => {
          this.notification = response.data.reverse()
          var i = 0
          for (var item in response.data) {
            if (!response.data[i].seen) {
              this.nunseen = true
            }
            item.reverse()
            i++
          }
        })
        .catch(() => {
        })
    },
    async get_tickets () {
      await axios
        .get('/subject')
        .then(response => {
          this.tickets = response.data.reverse()
          var i = 0
          for (var item in response.data) {
            if (!response.data[i].read) {
              this.tunseen = true
            }
            item.reverse()
            i++
          }
        })
        .catch(() => {
        })
    },
    async seen () {
      await axios
        .post('/notifications')
        .then(response => {
          this.nunseen = false
        })
        .catch(() => {
        })
    },
    async read () {
      await axios
        .put('/subject')
        .then(response => {
          this.tunseen = false
        })
        .catch(() => {
        })
    },
    toggleSidenav () {
      this.layoutHelpers.toggleCollapsed()
    },
    getLayoutNavbarBg () {
      return this.layoutNavbarBg
    },
    async get_user () {
      await axios
        .get('/userinfo')
        .then(response => {
          if (!response.data[0].is_active) {
            this.$swal('<div class="swal2-icon swal2-error swal2-icon-show" style="display: flex;"><span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span></div><h5>حساب شما مسدود شده است لطفا با پشتیبانی تماس حاصل فرمایید</h5>')
            setTimeout(() => {
              const toPath = this.$route.query.to || '/logout'
              this.$router.push(toPath)
            }, 2000)
          }
          this.userinfo = response.data[0]
          this.get_admin()
        })
        .catch(() => {
          setTimeout(() => {
            if (this.$store.state.isAuthenticated) {
              if (this.$route.path !== '/user') {
                alert('ابتدا اطلاعات کاربری را وارد کنید')
                const toPath = this.$route.query.to || '/user'
                this.$router.push(toPath)
                this.get_admin()
              }
            }
          }, 500)
        })
    },
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
