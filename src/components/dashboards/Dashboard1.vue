<template>
  <div>
    <h4 class="font-weight-bold py-3 mb-4">
      داشبورد
    </h4>
    <hr>

        <b-card fluid class="mt--7">
         <b-card-header>
           <h3>لینک دعوت دوستان</h3>
         </b-card-header>
         <div style="direction:ltr" class="input-group mb-3">
  <div class="input-group-prepend">
    <button class="btn btn-outline-success" type="button">copy</button>
  </div>
  <input style="text-align:center" :value="referalid" type="text" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1">
</div>
        </b-card><br>
        <b-card>
      <b-row>
        <b-col xl="12" class="mb-5 mb-xl-0">
          <b-card type="default" class="bg-light">
            <b-row align-v="center" slot="header">
              <b-col>
                <b-nav class="nav-pills justify-content-end">
                  <select name="" id="" class="form-control btn-dark" style="width:100%;margin:auto" v-model="sym" @change="tv()">
                    <option v-for="(value , key) in leverage" v-bind:key="key" :value="key"  selected>{{key}}</option>

                  </select>
                </b-nav>
                <br>
              </b-col>
            </b-row>
            <div style="margin:auto" id="tradingview_1be21"></div>
          </b-card>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import Vue from 'vue'
import VueChartJs from 'vue-chartjs'
import themeSettings from '../../vendor/libs/theme-settings/theme-settings'
import axios from 'axios'
const isDarkStyle = themeSettings.isDarkStyle()

export default {
  name: 'dashboard-1',
  metaInfo: {
    title: 'Dashboard 1 - Dashboards'
  },
  data () {
    return {
      referalid: '',
      sym : 'BTCUSDT',
      dashboardinfo : [],
      leverage : [],
      currenciescount: 0,
    }
  },
  mounted () {
    this.get_history()
    this.tv()
    this.get_info()
    this.getlev()
    this.currencies()
    this.get_user()
  },
  methods: {
    tv () {
      new TradingView.widget(
        {
        "width": screen.width * .7,
        "height": 390,
        "symbol": `${this.sym}`,
        "timezone": "Etc/UTC",
        "theme": "light",
        "style": "1",
        "locale": "en",
        "enable_publishing": false,
        "allow_symbol_change": true,
        "container_id": "tradingview_1be21"
      }
  );
    },
      async get_history () {
      await axios
        .get('/pricehistory')
        .then(response => {
          for (item of response.data){
          }
        })
        .catch(data => {
          
        })
    },
    async currencies () {
      await axios
        .get('/cp_mg_main')
        .then(response => {
          console(response)
          for (item of response.data){
            this.currenciescount = response.data.length
          }
        })
        .catch(data => {
          
        })
    },
    async get_info () {
      await axios
        .get('/dashboardinfo')
        .then(response => {
          this.dashboardinfo = response.data[0]
        })
    },
    async getlev () {
      await axios
        .get('/leverages')
        .then(response => {
          this.leverage = response.data
        })
    },
    async get_user () {
      await axios
        .get('/userinfo')
        .then(response => {
          this.referalid = response.data[0].get_referal
          console.log(response)
        })
    },
  },
  beforeDestroy () {
    this.layoutHelpers.off('resize.dashboard-1')
  }
}
</script>
<style>
.cent{
  text-align: center;
}
</style>
