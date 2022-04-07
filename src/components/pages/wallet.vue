<template>
  <div>

    <h4 class="d-flex flex-wrap justify-content-between align-items-center pt-3 mb-4">
      <b-breadcrumb class="font-weight-bold mb-3" />
      <div class="col-12 col-md-3 p-0 mb-3">
      </div>
    </h4>

      <b-card no-body class="mb-3">

        <b-card-header class="row no-gutters align-items-center">
          <div class="col-1 font-weight-bold">نوع ارز</div>
          <div class="d-none d-md-block col-11 text-muted">
            <div class="row no-gutters align-items-center">
              <div class="col-2 cent">موجودی</div>
              <div class="col-2 cent">موجودی ریالی</div>
              <div class="col-9"> </div>
            </div>
          </div>
        </b-card-header>

          <b-card-body class="py-3 wallets">

            <div class="row no-gutters align-items-center">
              <div class="col-1"><a href="javascript:void(0)" class="text-big font-weight-semibold">
                      <img :src="`http://arsdev.ir${currencies.pic}`" alt="" class="d-block ui-w-50 rounded-circle">
                      <div class="media-body flex-truncate ml-2">
                    </div></a></div>
              <div class="d-none d-md-block col-11">

                <div class="row no-gutters align-items-center">
                  <div class="col-2 cent">{{currencies.amount}}</div>
                  <div class="col-2 cent">{{currencies.amount}}</div>
                  <div class="col-1 cent"></div>
                  <div class="col-1 cent"></div>
                  <div class="col-1 cent"></div>
                  <div class="col-1 cent"></div>
                  <div class="col-3"></div>
                  <div class="col-1"><button class="btnfont btn btn-danger">برداشت</button></div>
              </div>
              </div>
            </div>

          </b-card-body>

      </b-card>
      <b-tabs>
      <b-tab :title="tit">
        <b-card>
        <b-card-header class="row no-gutters align-items-center"> واریز  </b-card-header>
        <div v-if="currencies.address && parseInt(currencies.address) !== 0"><br>
          <h4>با این آدرس و بارکد میتوانید حساب خود را شارژ نمایید</h4>
          <div class="alert alert-success address"><button class="btn btn-success addressbtn"><h2>کپی</h2></button><h3>{{currencies.address}}</h3></div><br>
        <qrcode-vue class="cent" :value="value" :size="size" level="H" />
        </div>
        <div v-if="!currencies.address || parseInt(currencies.address) === 0"><br>
           <h4>با دکمه زیر کیف پول ارز خود را ایجاد کنید</h4><br>
           <button @click="checklevel()" class="btn btn-success">ایجاد کیف پول</button>
        </div>
        </b-card>
      </b-tab>

        <b-tab title="ERC20" v-if="page === 4">
        <b-card>
        <b-card-header class="row no-gutters align-items-center"> واریز</b-card-header><br>
        <div v-if="currencies.address2 && parseInt(currencies.address2) !== 0">
          <h4>با این آدرس و بارکد میتوانید حساب خود را شارژ نمایید</h4>
          <div class="alert alert-success address"><button class="btn btn-success addressbtn"><h2>کپی</h2></button><h3>{{currencies.address2}}</h3></div><br>
        <qrcode-vue class="cent" :value="value2" :size="size" level="H" />
        </div>
        <div v-if="!currencies.address2 || parseInt(currencies.address2) === 0"><br>
           <h4>با دکمه زیر کیف پول ارز خود را ایجاد کنید</h4><br>
           <button @click="checklevel2()" class="btn btn-success">ایجاد کیف پول</button>
        </div>
        </b-card>
      </b-tab><br><br>
      </b-tabs>
      <b-card>

        <b-card-header class="row no-gutters align-items-center">برداشت</b-card-header>
        <div><br><br>
          <h6> آدرس ولت </h6>
          <b-input class="alert-success" v-model="walletout"></b-input><br>
          <h6>مبلغ درخواستی</h6>
          <b-input class="alert-success" v-model="walletout"></b-input><br>
          <button id="withdraw" class="btn btn-success">ثبت درخواست</button>
        </div>
      </b-card><br><br>

  </div>
</template>

<script>
import axios from 'axios'
import QrcodeVue from 'qrcode.vue'
export default {
  name: 'pages-forums-list',
  metaInfo: {
    title: 'کیف ها'
  },
  mounted () {
    this.getw()
    this.getw2()
    this.goto()
  },
  data: () => ({
    walletout: 0,
    page: 0,
    value: '',
    size: 200,
    currencies: {},
    wallets: [],
    value2: '',
    currencies2: {},
    wallets2: [],
    tit: ''
  }),
  forumPath: [
    { text: 'کیف ها', active: true }
  ],
  methods: {
    async getc () {
      const id = this.$route.params.id
      this.page = parseInt(this.$route.params.id)
      if (parseInt(this.$route.params.id) === 4) {
        this.tit = 'TRC20'
      }
      await axios
        .get(`/currencies/${id}`)
        .then(response => {
          this.currencies = response.data[0]
          this.currencies.amount = 0
          this.currencies.amount = this.wallets[0].amount
          this.currencies.address = this.wallets[0].address
          this.currencies.address2 = this.wallets[0].address2
          this.value = this.wallets[0].address
        })
    },
    async getw () {
      const id = this.$route.params.id
      await axios
        .get(`/wallet/${id}`)
        .then(response => {
          this.wallets = response.data
        }).then(() => {
          this.getc()
        })
    },
    async checklevel () {
      this.createwallet()
    },
    async createwallet () {
      setTimeout(() => {
        this.getw()
      }, 1000)
      const id = this.$route.params.id
      await axios
        .post(`/wallet/${id}`)
        .then(() => {
        })
    },
    async checklevel2 () {
      this.createwallet2()
    },
    async createwallet2 () {
      setTimeout(() => {
        this.getw()
      }, 1000)
      const id = this.$route.params.id
      await axios
        .post(`/wallet/${id}1`)
        .then(() => {
        })
    },
    goto () {
      setTimeout(() => {
        document.getElementById(`${this.$route.params.place}`).scrollIntoView({ behavior: 'smooth' })
      }, 1000)
    }
  },
  components: {
    QrcodeVue
  }
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
.wallets:hover{
  background: #efefff;
}
.qr{
  width: 20%;
  margin-right: 40%;
  margin-top: 20px;
}
.address{
  margin:auto;
  text-align: center;
  margin-top: 10px;
  height: 65px;
  padding: 0;
}
.address h3{
  padding: 14px;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  height: 100%;
}
.addressbtn{
  float: left;
  height: 100%;
}
.address h3::-webkit-scrollbar {
  width: 1px;
}

.address h3::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    width: 3px;
    border-radius: 1px;
}

.address h3::-webkit-scrollbar-thumb {
    border-radius: 1px;
    box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
    width: 3px;
}
.cent{
  margin:auto;
  text-align: center;
}
</style>
