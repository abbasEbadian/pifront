<template>
<div>
<div style="backgronud:hsl(12deg 78% 93%); background-color:hsl(12deg 78% 93%);background-size: 100% 100%; width:100% ; min-height:100% ; position:absolute ; top:0 ; left:0">
<div style=" margin-top: 100px ; text-align:center ; height: 450px ; color:#2b3247 ; font-family: 'PingFang SC'; font-weight:1000!important">
<h2 style="font-size:33px;font-weight:bold!important">Auto trade cryptocurrency with</h2> 
<h1 style="font-size:50px;font-weight:bold!important"> 16 Free in-built trading bots</h1>
<img src="https://www.pionex.com/static/media/img_haderImg_en-US.760e00b6.png" style="width:48%; margin:auto ; margin-top:100px" alt="">
</div>
</div>

<div style="width:100% ; height: 100%"></div>
</div>
</template>

<script>
import Vue from 'vue'
import Trend from 'vuetrend'
import axios from 'axios'
Vue.use(Trend)

export default {
  name: 'dashboard-1',
  metaInfo: {
    title: 'Home'
  },
  data () {
    return {
      dashboardinfo: [],
      rows: 2,
      brands: [],
      amount: [],
      info: [],
      his: [],
      userinfo:'',
    }
  },
  mounted () {
    this.get_user ()
  },
  methods: {
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
  }
}
</script>
<style>
.cent{
  text-align: center;
}
</style>
