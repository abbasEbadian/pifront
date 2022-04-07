<template>
  <div>

    <h4 class="d-flex flex-wrap justify-content-between align-items-center pt-3 mb-4">
      <b-breadcrumb class="font-weight-bold mb-3" />
      <div class="col-12 col-md-3 p-0 mb-3">
      </div>
    </h4>
    <h4>واریز ریالی </h4>
        <b-card  class="mb-4">
            <h5 class="alert alert-danger" v-for="error in errors" v-bind:key="error">{{error}}</h5>
      <fieldset class="demo-vertical-spacing-sm">
        <b-form-group label="">
          <b-input style="width:80%;float:left" v-model="amount" placeholder="" /><label style="width:20%">مبلغ</label>
        </b-form-group>
        <div style="clear:both"></div>
        <b-form-group>
          <label style="width:20%" >کارت بانکی</label>
          <b-select style="float:left;width:80%" plain v-model="cardnumber" :options="options" />
          <div style="clear:both"></div>
        </b-form-group><br>
        <router-link to="/addcard" style="float:left" class="btn btn-success">اضافه کردن کارت بانکی</router-link>
        <div style="clear:both"></div><br>
        <b-btn @click="submit()" style="float:left" variant="primary">انتقال به درگاه بانک</b-btn>
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
    this.check()
    this.getc()
  },
  data: () => ({
    options: [],
    amount: 0.0,
    cardnumber: 0,
    errors: []
  }),
  methods: {
    async checklevel () {
      await axios
        .get('/userinfo')
        .then(response => {
          console.log(response.data[0].level)
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
              }
            })
          }
        })
    },
    check () {
      if (!this.$store.state.isAuthenticated) {
        const toPath = this.$route.query.to || '/login'
        this.$router.push(toPath)
      }
    },
    async getc () {
      var itemm
      await axios
        .get('/bankcards')
        .then(response => {
          for (itemm of response.data) {
            var no = String(itemm.number)
            var result = no.slice(0, 4) + '-' + no.slice(4, 8) + '-' + no.slice(8, 12) + '-' + no.slice(12, 16)
            this.options.push(result)
          }
        })
    },
    async submit () {
      this.errors = []
      if (this.amount === 0) {
        this.errors.push('لطفا مبلغ را وارد کنید')
      }
      if (!this.cardnumber) {
        this.errors.push('لطفا کارتی را انتخاب کنید')
      }
      var card = parseInt(this.cardnumber.replace('-', '').replace('-', '').replace('-', ''))
      console.log(card)
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
.error{
    color:red
}
</style>
