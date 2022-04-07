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
                  <div class="col-2"></div>
                  <div class="col-2"><button class="btnfont btn btn-success" style="width:100%">واریز</button></div>
              </div>
              </div>
            </div>

          </b-card-body>

      </b-card>
       <b-card>
        <b-card-header class="row no-gutters align-items-center">برداشت</b-card-header>
        <br><br>
        <h5 class="alert alert-danger" v-for="error in errors" v-bind:key="error">{{error}}</h5>
      <fieldset  class="demo-vertical-spacing-sm">
        <b-form-group label=" مبلغ">
          <b-input type="number" v-model="amount" placeholder=" مبلغ " />
        </b-form-group>
        <b-form-group label=" حساب بانکی ">
          <b-select plain v-model="cardnumber" :options="options" />
        </b-form-group>
        <router-link class="btn btn-success" style="float:left" to="/addcard">اضافه کردن حساب</router-link><br>
        <b-btn @click="submit()" variant="primary">انتقال به درگاه بانک</b-btn>
      </fieldset>
      </b-card>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'pages-forums-list',
  metaInfo: {
    title: 'کیف ها'
  },
  mounted () {
    this.getw()
  },
  data: () => ({
    value: '',
    size: 200,
    currencies: {},
    wallets: []
  }),
  forumPath: [
    { text: 'کیف ها', active: true }
  ],
  methods: {
    async getc () {
      const id = this.$route.params.id
      await axios
        .get(`/currencies/${id}`)
        .then(response => {
          this.currencies = response.data[0]
          this.currencies.amount = 0
          this.currencies.amount = this.wallets[0].amount
          this.currencies.address = this.wallets[0].address
          this.value = this.wallets[0].address
        })
    },
    async geta () {
      var itemm
      await axios
        .get('/bankaccounts')
        .then(response => {
          for (itemm of response.data) {
            var no = itemm.number
            this.options.push(no)
          }
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
    async createwallet () {
      setTimeout(() => {
        this.getw()
      }, 1000)
      const id = this.$route.params.id
      await axios
        .post(`/wallet/${id}`)
        .then(() => {
        })
    }
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
