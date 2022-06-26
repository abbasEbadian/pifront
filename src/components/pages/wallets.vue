<template>
  <div>
    <b-card style="width:44% ; float: left ; margin:1.5% ;margin-top:30px; border-style:none ; border-radius:15px">
      <b-card-header>
        <h2>مجموع دارایی</h2>
      </b-card-header>
    <GChart
      type="PieChart"
      :options="options"
      :data="data"
    />    <br>
    <h4 style="text-align:center">مجموع دارایی : {{allamount.toFixed(2)}}</h4>
    <div class="row">
            <div class="col-12 col-sm-6">
              <router-link to="/payments/deposit">
                <button class="btn btn-primary w-100">
                  Deposit
                </button>
              </router-link>
            </div>
            <div class="col-12 col-sm-6">
              <router-link to="/payments/withdraw">
                <button class="btn btn-danger w-100">
                  Withdraw
                </button>
              </router-link>
            </div>
          </div>
    </b-card>
        <b-card  style="width:50% ; float: left ; margin:1.5% ;margin-top:30px; border-style:none ; border-radius:15px">
        <input class="form-control" type="search" placeholder="Search" style="textalign:left;direction:ltr;font-family:'arial';border-left:none;border-right:none;border-radius:0;text-align:center;color:black;padding:30px; border-radius:15px;border-style:none" @input="search2()" v-model="searchtext">
        
          <div id="bal" class="table-responsive" style="height:500px;overflow:auto;">
          <table  class="table" style="direction:rtl!important;">
            <thead>
              <tr>
                <th>Currency</th>
                <th>Available</th>
                <th>Frozen</th>
                <th>Operations</th>
              </tr>
            </thead>
          <tbody>
            <tr v-for="(section) in wallets" v-bind:key="section.id">
                    <td v-if="section.balance.available " style="width:15%;font-wieght:bold;font-family:'arial';font-size:20px"><router-link :to="`#`" class="text-big font-weight-semibold" >
                    {{section.brand}}
                    </router-link></td>
                    <td v-if="section.balance.available" style="padding:20px;font-family:'arial';font-size:14px"> <router-link :to="`#`"><a v-if="!section.balance.available">0</a> 
                    {{section.balance.available}}<br>
                    <div v-if="!(section.brand.includes('USD'))">
                    <a>{{(section.balance.available * prices[section.brand + 'USDT'].last).toFixed(2)}} USD</a><br>
                    </div>
                    <div v-if="(section.brand.includes('USD'))">
                    <a >{{section.balance.available}} USD</a><br>
                    </div>
                    </router-link></td>
                    <td v-if="section.balance.available " style="padding:20px;font-family:'arial';font-size:14px"> <router-link :to="`#`"><a v-if="!section.balance.frozen">0</a> {{section.balance.frozen}}</router-link></td>
                    <td v-if="section.balance.available" style="padding:0;font-family:'arial';font-size:14px"><router-link  :to="`/cpwallets/${section.name}/withdraw`" class="btnfont btn btn-light walbtn" style="font:16px 'Yekan'">برداشت</router-link><router-link :to="`/cpwallets/${section.name}/history`"  class="btnfont btn btn-light walbtn" style="font:16px 'Yekan'"> تاریخچه </router-link><router-link   :to="`/cpwallets/${section.name}/deposit`" class="btnfont btn btn-light walbtn" style="font:16px 'Yekan'">واریز</router-link></td>
            </tr>
            <tr v-for="(section) in wallets" v-bind:key="section.name">
                    <td v-if="section.brand == 'USDT' |section.brand == 'BTC' |section.brand == 'ETH' |section.brand == 'TRX' && !section.balance.available" style="width:15%;font-wieght:bold;font-family:'arial';font-size:20px"><router-link :to="`#`" class="text-big font-weight-semibold" >
                    {{section.brand}}
                    </router-link></td>
                    <td v-if="section.brand == 'USDT' |section.brand == 'BTC' |section.brand == 'ETH' |section.brand == 'TRX' && !section.balance.available" style="padding:20px;font-family:'arial';font-size:14px"> <router-link :to="`#`"><a v-if="!section.balance.available">0</a> {{section.balance.available}}</router-link></td>
                    <td v-if="section.brand == 'USDT' |section.brand == 'BTC' |section.brand == 'ETH' |section.brand == 'TRX' && !section.balance.available" style="padding:20px;font-family:'arial';font-size:14px"> <router-link :to="`#`"><a v-if="!section.balance.frozen">0</a> {{section.balance.frozen}}</router-link></td>
                    <td v-if="section.brand == 'USDT' |section.brand == 'BTC' |section.brand == 'ETH' |section.brand == 'TRX' && !section.balance.available" style="padding:0;font-family:'arial';font-size:14px"><router-link  :to="`/cpwallets/${section.name}/withdraw`" class="btnfont btn btn-light walbtn" style="font:16px 'Yekan'">برداشت</router-link><router-link :to="`/cpwallets/${section.name}/history`"  class="btnfont btn btn-light walbtn" style="font:16px 'Yekan'"> تاریخچه </router-link><router-link   :to="`/cpwallets/${section.name}/deposit`" class="btnfont btn btn-light walbtn" style="font:16px 'Yekan'">واریز</router-link></td>
            </tr>
            <tr v-for="(section) in wallets" v-bind:key="section.id">
                    <td v-if="!(section.brand == 'USDT' |section.brand == 'BTC' |section.brand == 'ETH' |section.brand == 'TRX') && !section.balance.available" style="width:15%;font-wieght:bold;font-family:'arial';font-size:20px"><router-link :to="`#`" class="text-big font-weight-semibold" >
                    {{section.brand}}
                    </router-link></td>
                    <td v-if="!(section.brand == 'USDT' |section.brand == 'BTC' |section.brand == 'ETH' |section.brand == 'TRX') && !section.balance.available" style="padding:20px;font-family:'arial';font-size:14px"> <router-link :to="`#`"><a v-if="!section.balance.available">0</a> {{section.balance.available}}</router-link></td>
                    <td v-if="!(section.brand == 'USDT' |section.brand == 'BTC' |section.brand == 'ETH' |section.brand == 'TRX') && !section.balance.available" style="padding:20px;font-family:'arial';font-size:14px"> <router-link :to="`#`"><a v-if="!section.balance.frozen">0</a> {{section.balance.frozen}}</router-link></td>
                    <td v-if="!(section.brand == 'USDT' |section.brand == 'BTC' |section.brand == 'ETH' |section.brand == 'TRX') && !section.balance.available" style="padding:0;font-family:'arial';font-size:14px"><router-link  :to="`/cpwallets/${section.name}/withdraw`" class="btnfont btn btn-light walbtn" style="font:16px 'Yekan'">برداشت</router-link><router-link :to="`/wallets/${section.name}/history`"  class="btnfont btn btn-light walbtn" style="font:16px 'Yekan'"> تاریخچه </router-link><router-link   :to="`/cpwallets/${section.name}/deposit`" class="btnfont btn btn-light walbtn" style="font:16px 'Yekan'">واریز</router-link></td>

            </tr>
            </tbody>
            </table>
          </div>
          
        </b-card>

  </div>
</template>

<script>
import axios from 'axios'
import { GChart } from "vue-google-charts";
export default {
  name: 'pages-forums-list',
  metaInfo: {
    title: 'کیف ها'
  },
  components:{
     GChart
  },
  mounted () {
    this.getprices()
    this.getprice()
    this.getw()
    this.getprice2()
    this.getrialprice()
  },
  data: () => ({
    currencies: [],
    withamount: [],
    allamount: 0,
    allamountrial: 0,
    wallets: [],
    searchtext: '',
    walletsback:[],
    usd: 250000,
    rialprice: 0,
    prices: [],
    prices2: [],
    temp: {},
    data: [['Currency', 'Balance']],
      options: {
        backgroundColor: "#ececec",
        responsive : true,
      }
  }),
  methods: {
    async getrialprice () {
      await axios
        .get('/price' )
        .then(response => {
          this.rialprice = response.data[0].rial
        })
    },
    async checklevel (id) {
      await axios
        .get('/userinfo')
        .then(response => {
          if (response.data[0].level === 0) {
            this.$swal.fire({
              title: 'توجه',
              text: 'برای استفاده از این بخش ابتدا احراز هویت را کامل کنید',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'شروع تایید هویت',
              cancelButtonText: 'بعدا انجام میدهم'
            }).then(result => {
              if (result.isConfirmed) {
                const toPath = this.$route.query.to || '/user-level'
                this.$router.push(toPath)
              }else {
                const toPath = this.$route.query.to || '/dashboard'
                this.$router.push(toPath)
              }
            })
          }
        })
    },
    async fasttorial (id) {
      await axios
        .get(`/fasttorial/${id}`)
        .then(response => {
          this.$swal.fire({
            title: 'آیا از تبدیل کل دارایی به مبلغ زیر اطمینان دارید؟',
            text: `مبلغ ریالی : ${response.data.price}‍‍‍`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: ' تایید ',
            cancelButtonText: ' لغو'
          }).then(result => {
            if (result.isConfirmed) {
              this.fasttorialconf(id)
            }
          })
        })
    },
    async fasttorialconf (id) {
      await axios
        .post(`/fasttorial/${id}`)
        .then(response => {
          location.reload()
        })
    },
    async getprices () {
      await axios
        .get(`/oltradeinfo`)
        .then(response => {
          this.prices = response.data
          this.getw2()
        })
    },
    async getc () {
      await axios
        .get('/currencies')
        .then(response => {
          this.currencies = response.data
          var itemm
          for (itemm of this.currencies) {
            itemm.amount = 0
          }
          for (let index = 0; index < this.wallets2.length; index++) {
            if (this.currencies[this.wallets2[index].currency - 1]) {
              this.currencies[this.wallets2[index].currency - 1].amount = this.wallets2[index].amount
              this.currencies[this.wallets2[index].currency - 1].address = this.wallets2[index].address
            }
          }
        })
    },
    async getw () {
      await axios
        .get('/wallet')
        .then(response => {
          this.wallets2 = response.data
        }).then(() => {
          this.getc()
        })
    },
    async getprice () {
      await axios
        .get('/price')
        .then(response => {
          this.temp = response.data[0]
        })
        .catch(() => {
        })
    },
    getbrand (brand) {
      return this.temp[`${brand.toLowerCase()}`]
    },
    async getw2 () {
      await axios
        .get('/cp_wallets')
        .then(response => {
          console.log(response)
          this.wallets = response.data
          this.walletsback = response.data
          this.allamount = 0
          this.allamountrial = 0
          this.data = [['Currency', 'Balance']]
          for (const [key, value] of Object.entries(this.walletsback)){
            if(value.balance.available && this.prices[value.brand + 'USDT']){
              this.data.push([key + '($)' ,  (Number(value.balance.available) * Number(this.prices[value.brand + 'USDT'].last))])
              this.allamount = parseFloat(this.allamount) + (parseFloat(value.balance.available) * parseFloat(this.prices[value.brand + 'USDT'].last))
            }else if(value.balance.available && value.brand === 'USDT'){
              this.data.push([key + '($)' , Number(value.balance.available)])
              this.allamount = parseFloat(this.allamount) + parseFloat(value.balance.available)
            }
          }
          if(this.data.length < 2){
          }
          
          var myEle = document.getElementById("all");
          if(myEle){
            this.options.width = document.querySelector('#all').clientWidth * .8
            window.addEventListener('resize', ()=>{
            this.options.width = document.querySelector('#all').clientWidth * .8
          })
          }
          
        }).then(() => {
        })
    },
    async getprice2 () {
      await axios
        .get('/price')
        .then(response => {
          this.temp = response.data[0]
        })
        .catch(() => {
        })
    },
    getbrand2 (brand) {
      return this.temp[`${brand.toLowerCase()}`]
    },
    search2 (){
      this.wallets = {}
      for (const [key, value] of Object.entries(this.walletsback)){
        if(key.includes(this.searchtext.toUpperCase())){
        this.wallets[key] = value        
        }
      }
    }
  },
}

</script>
<style>
.cent{
  text-align: center;
}
.btnfont{
  font-size: 12px;
  padding: 9px;
  margin: 2px;
}
#bal::-webkit-scrollbar {
  width: 4px;
}

#bal::-webkit-scrollbar-track {
  background: #f1f1f1; 
}

#bal::-webkit-scrollbar-thumb {
  background: #888; 
}

#bal::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
td{
height: 90px;
text-align: center;
}
th{
text-align: center;
}
.wallets:hover{
  background: #efefff;
}
a{
  color:#444
}
.card{
  margin: 5px;
}
.card-body{
  padding: 0 !important;
}
@media only screen and (max-width: 1024px) {
.nmobile{
  display: none;
}
.walbtn{
height:30%;
width: 90%;
min-height: 30px;
float: left;
}
}
@media only screen and (min-width: 1024px) {
.walbtn{
position: relative;top: 20%
}
}
@media only screen and (max-width: 1275px) {
.nmobile{
  display: none;
}
}
</style>
