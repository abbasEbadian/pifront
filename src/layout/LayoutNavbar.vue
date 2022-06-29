<template>
<div>
  <b-navbar toggleable="lg" :variant="getLayoutNavbarBg()" class="navbard layout-navbar align-items-lg-center container-p-x navbar">
    <b-navbar-nav>
      <b-nav-item style="font:16px'arial'" href="/margin-trade/BTCUSDT">Trade</b-nav-item>
      <b-nav-item style="font:16px'arial'" href="/spot">Market</b-nav-item>
      <b-nav-item style="font:16px'arial'" href="#"></b-nav-item>
      <b-nav-item-dropdown v-if="store.state.isAuthenticated" :right="!isRtlMode" class="demo-navbar-user">
          <template slot="button-content">
            <span class="d-inline-flex flex-lg-row-reverse align-items-center align-middle">
              <div v-if="store.state.isAuthenticated">
              <span style="font:16px'arial'" class="px-1 mr-lg-2 ml-2 ml-lg-0">Support</span>
              </div>
            </span>
          </template>
          <div v-if="store.state.isAuthenticated">
          <b-dd-item @click="email()"><i class="ion ion-ios-mail text-lightest"></i> &nbsp; Email </b-dd-item>
          <b-dd-item disabled to="#"><i class="ion ion-ios-chatbubbles text-lightest"></i> &nbsp; Live Chat</b-dd-item>
          <b-dd-item to="/tutorial"><i class="ion ion-ios-bookmarks text-lightest"></i> &nbsp;  Tutorial</b-dd-item>
          <b-dropdown-item href="https://t.me/joinchat/F1PMdBfhAoyNyWTT7V7K7Q"><i class="ion ion-ios-contacts text-lightest"></i> &nbsp; Community </b-dropdown-item>
          <b-dd-item to="/article"><i class="ion ion-md-volume-mute text-lightest"></i> &nbsp; Announcement </b-dd-item>
          </div>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    <a href="/" style="position:absolute ; height:60px  ; left:43% ; z-index:1 ; padding: 10px"><img src="/caitexlogo.png" style="height:100%" alt=""></a>
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
              <b-nav-item>
         
         
       
        </b-nav-item>

        <b-nav-item-dropdown v-if="store.state.isAuthenticated" no-caret :right="!isRtlMode" class="demo-navbar-notifications mr-lg-3 "  id="settings">

          <template slot="button-content" >
            <i class="ion ion-md-cog navbar-icon align-middle" @click="seen()"></i>
            <span class="d-lg-none align-middle">&nbsp; Notifications</span>
          </template>
          <template id="settings">
            <b-card  style="float:left ; width: 49% ; margin-right:1%; border-radius:10px ; height: 85px">
              <a>
                <i style="; color:black" class="material-icons notranslate">paid</i>
                <a v-if="store.state.rtl === 'true'" style="position:absolute; top:5px;right:35px ; color:black">نوع ارز</a>
                <a v-else style="position:absolute; top:5px;left:35px ; color:black">نوع ارز</a>

                </a><br>
                <a v-b-modal.currency-modal style="margin-right:31px">
                  تغییر نوع ارز
                </a>
              
            </b-card>
            <b-card  style="float:left ; width: 49% ; margin-left:1%; border-radius:10px ; height: 85px">
              <a>
                <i style="; color:black" class="material-icons notranslate">language</i>
                <a v-if="store.state.rtl === 'true'" style="position:absolute; top:5px;right:35px ; color:black"> زبان</a>
                <a v-else style="position:absolute; top:5px;left:35px ; color:black"> Language</a>

                </a><br>
                <a v-b-modal.translate-modal style="margin-right:31px">
                  Select Language
                </a>
            </b-card>
            <b-card hidden style=" border-radius:10px ; height: 85px">
              <a>
              <i style="; color:black" class="material-icons notranslate">candlestick_chart</i>
                <a v-if="store.state.rtl === 'true'" style="position:absolute; top:5px;right:35px ; color:black"> Language</a>
                <a v-else style="position:absolute; top:5px;left:35px ; color:black"> Language</a>

                </a><br>
                <a style="margin-right:31px">
                  Select Language
                </a>
            </b-card>
            <b-card  style=" border-radius:10px ; height: 85px">
              <div>
                <a>
                <i style="; color:black" class="material-icons notranslate ">dark_mode</i>
                <a  v-if="store.state.rtl === 'true'" style="position:absolute; top:5px;right:35px ; color:black">Dark Mode</a>
                <a  v-else style="position:absolute; top:5px;left:35px ; color:black">Dark Mode</a>
                <div v-if="store.state.rtl === 'true'" style="position:absolute ; left:5px ; top: 25px" @click="darkThemeSwitch()">
                    <switches  v-model="dark" theme="default"  type-bold="true" color="orange"></switches>
                </div>
                <div v-else style="position:absolute ; right:5px ; top: 25px" @click="darkThemeSwitch()">
                  <switches  v-model="dark" theme="default"  type-bold="true" color="orange"></switches>
                </div>

                </a><br>
                <a style="margin-right:31px">
                  Select Theme
                </a>
              </div>
            </b-card>
          </template>
        </b-nav-item-dropdown>
        
        <b-nav-item-dropdown v-if="store.state.isAuthenticated" no-caret :right="!isRtlMode" class="demo-navbar-notifications mr-lg-3 right">

          <template slot="button-content">
            <i class="ion ion-md-notifications-outline navbar-icon align-middle" @click="seen()"></i>
            <span v-if="nunseen" class="badge badge-primary badge-dot indicator"></span>
            <span class="d-lg-none align-middle">&nbsp; Notifications</span>
          </template>

          <b-list-group flush style="max-height:250px; overflow:auto">
            <b-list-group-item v-for="(item, idx) in notification" v-bind:key="idx" href="javascript:void(0)" class="media d-flex align-items-center" >
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
                <h5 style="text-align:center; width:100%">No Notification Yet!</h5>
            </b-list-group-item>
          </b-list-group>
        </b-nav-item-dropdown>


        <b-nav-item-dropdown v-if="store.state.isAuthenticated" no-caret :right="!isRtlMode" class="demo-navbar-messages mr-lg-3 right">
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
                <h5 style="text-align:center; width:100%">No Ticket Yet!</h5>
            </b-list-group-item>
          </b-list-group>
          <router-link to="/ticket">
          <div class="bg-primary text-center text-white font-weight-bold p-3">
          Create Ticket
          </div>
          </router-link>
          </b-nav-item-dropdown>

        <!-- Divider -->
        <div class="nav-item d-none d-lg-block text-big font-weight-light line-height-1 opacity-25 mr-3 ml-1">|</div>

        <b-nav-item-dropdown v-if="store.state.isAuthenticated" :right="!isRtlMode" class="demo-navbar-user" id="profile">
          <template slot="button-content">
            <span class="d-inline-flex flex-lg-row-reverse align-items-center align-middle">
              <i class="ion ion-ios-contact" style="font-size:28px"></i>
              <div v-if="store.state.isAuthenticated">
              <span v-if="userinfo.last_name" class="px-1 mr-lg-2 ml-2 ml-lg-0"> {{userinfo.last_name}} {{userinfo.first_name}} </span>
              <span v-else class="px-1 mr-lg-2 ml-2 ml-lg-0"> Username not set </span>
              </div>
            </span>
          </template>
          <div v-if="store.state.isAuthenticated" style="width:320px ; left:-200px">
            <b-card style=" border-radius:8px; margin-bottom:10px">
          <b-dd-item style="padding:-5px" to="/user">
          
          <i class="ion ion-ios-contact" style="font-size:40px "></i>
          
          <a style="position:absolute ; left:75px">
          {{userinfo.last_name}} {{userinfo.first_name}}  <br>
          {{userinfo.email}}
          </a>
           
          </b-dd-item>
          </b-card>
          <b-card style=" border-radius:8px; margin-bottom:10px">
          <b-dd-item to="/wallets"><i class="ion ion-ios-mail text-lightest"></i> &nbsp; My Balance  <br>
          {{credit}} USD
          </b-dd-item>
          <b-dd-divider style="border-color: white" />
          <b-dd-item to="/payments/deposit"><i class="ion ion-md-settings text-lightest"></i> &nbsp;  Deposit</b-dd-item>
          <b-dd-item to="/payments/withdraw"><i class="ion ion-md-settings text-lightest"></i> &nbsp;  Withdraw</b-dd-item>
          </b-card>
          <b-card style=" border-radius:8px; margin-bottom:10px">
          <b-dd-item><i class="ion ion-md-settings text-lightest"></i> &nbsp;  Referral Program</b-dd-item>
          </b-card>
          <b-card style=" border-radius:8px; margin-bottom:10px">
          <b-dd-item @click="logout()"><i class="ion ion-ios-log-out text-danger"></i> &nbsp; Logout </b-dd-item>
          </b-card>
          </div>
           <div v-if="!store.state.isAuthenticated">
           <b-dd-item to="/login"><i class="ion ion-ios-person text-lightest"></i> &nbsp; Login  </b-dd-item>
          <b-dd-item to="/signup"><i class="ion ion-ios-mail text-lightest"></i> &nbsp;  Register</b-dd-item>
          </div>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <a v-if="!store.state.isAuthenticated" href="/signup" class="btn btn-outline-info" style="margin: 0 10px">Sign Up</a>
      <a v-if="!store.state.isAuthenticated" href="/login" class="btn btn-outline-dark">Sign In</a>
    </b-collapse>
  </b-navbar>
     <translate-modal></translate-modal>
     <currency-modal></currency-modal>
  </div>
</template>

<script>
import axios from 'axios'
import TranslateModal from "./TranslateModal";
import CurrencyModal from "./CurrencyModal";
import themeChanger from "../theme";
import Switches from 'vue-switches';
import { Translator } from 'vue-google-translate';

export default {
  name: 'app-layout-navbar',
  components: {
    Switches,
    Translator,
    TranslateModal,
    CurrencyModal
  },
  props: {
    sidenavToggle: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      dark: '',
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
  computed: {
    credit() {
      console.log(this.$store.state.rates, this.$store.state.user.wallet_set)
      let t = 0
      if(this.$store.state.user && this.$store.state.user.wallet_set){
        t = this.$store.state.user.wallet_set.reduce((total, current) => {

            const k = current.currency.symbol + "USD"
            const rate = this.$store.state.rates[k]
            return total +  (current.amount * rate)

        }, 0)
      }

      return Number(t).toFixed(3)
    }
  },
  mounted () {
    this.checkgoo()
    this.checktop()
    this.get_notifications()
    this.get_tickets()
    this.get_credit()
  },
  created() {
    this.themeChanger = new themeChanger();
  },
  updated(){
    this.get_user()
  },
  methods: {
    checkgoo(){
      var body = document.querySelector('body')
      if(document.querySelector('.goog-te-banner-frame')){
        if(document.querySelector('.goog-te-banner-frame').hidden !== true){
          document.querySelector('.goog-te-banner-frame').hidden = true
          body.style.position = 'absolute'
          this.checkgoo()
        }
      }else{
        setTimeout(() => {
        this.checkgoo()
      }, 10);
      }
    },
    checktop(){
      var body = document.querySelector('body')
      if(body.style.top === '0px'){
        setTimeout(() => {
          this.checktop()
        }, 10);
      }else{
        body.style.top = 0
      }
    },
    darkThemeSwitch() {
      this.themeChanger = new themeChanger()
      if(this.$store.state.dark === 'dark'){
        this.dark = false
        this.$store.state.dark = 'light'
        localStorage.setItem('dark', this.$store.state.dark)
        this.themeChanger._removeDarkTheme();
      }else{
        this.dark = true
        this.$store.state.dark = 'dark'
        localStorage.setItem('dark', this.$store.state.dark)
        this.themeChanger._addDarkTheme();
      }
    },
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
    async get_credit () {
      await axios
        .get('/cp_credit')
        .then(response => {
          this.credit = response.data
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
    email(){
      window.open('mailto:test@example.com')
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
        })
        .catch(() => {
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
  },

}
</script>
<style>
#settings .dropdown-menu{
  border-radius: 10px;
  padding: 5px;
  left:-250px
}
#settings .dropdown-menu .card-body{
    border-radius: 7px;
    padding: 4px;
}
#settings .dropdown-menu .card{

    margin-bottom: 5px;
}
#profile .dropdown-menu hr{
  border-color: #dddddd;
  margin:0;
  padding:0
}
#profile .dropdown-menu .card-body{
    padding: 0;
}
#profile .dropdown-menu{
  border-radius: 10px;
  padding: 5px;
}
#profile .dropdown-menu{
  left:-155px!important;
}

#profile .dropdown-menu div{
  width:100%
}
#profile .dropdown-menu .card{
  width:100%;
  background: none!important;
  min-height: 0;
}
#profile .dropdown-menu card-body{
  width:100%
}
.list-group-flush::-webkit-scrollbar{
  display: none;
}
</style>