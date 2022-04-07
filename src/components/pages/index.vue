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
    title: 'Dashboard 1 - Dashboards'
  },
  data () {
    return {
      dashboardinfo: [],
      rows: 2,
      brands: [],
      amount: [],
      info: [],
      his: []
    }
  },
  mounted () {
    this.history()
  },
  methods: {
    async price () {
      await axios
        .get('/indexprice')
        .then(response => {
          this.info = response.data
          setTimeout(() => {
            this.price()
          }, 5000)
        })
    },
    async history () {
      var start = (new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000))).toISOString()
      var end = new Date().toISOString()
      await axios
        .post('/indexhistory', { start: start, end: end })
        .then(response => {
          console.log(response.data)
          this.his = response.data
        })
    }
  }
}
</script>
<style>
.cent{
  text-align: center;
}
</style>
