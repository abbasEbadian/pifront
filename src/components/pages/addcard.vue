<template>
  <div>

    <h4 class="d-flex flex-wrap justify-content-between align-items-center pt-3 mb-4">
      <b-breadcrumb class="font-weight-bold mb-3" />
      <div class="col-12 col-md-3 p-0 mb-3">
      </div>
    </h4>
            <h4 class="th" colspan="2">  کارت های بانکی شما</h4>
    <b-card >
      <table class="table col-12">
      <tr  v-for="card in options" v-bind:key="card[0]">
      <td style="width:50%" class="left"><img :src="`${card[1]}`" alt="" style="width:30%;float:right"></td>
      <td style="width:50%" colspan="6" class="left">{{card[0]}}</td>
      <div style="clear:both"></div>
      <hr>
      </tr>
      </table>
    </b-card><br>
        <button @click="acard()" id="aaddcard" class="btn btn-success">اضافه کردن کارت بانکی جدید</button><br><br><br><br>
        <b-card id="addcard" hidden header="اضافه کردن کارت بانکی" header-tag="h6" class="mb-4">
      <fieldset  class="demo-vertical-spacing-sm">
        <b-form-group label="شماره کارت بانکی">
          <b-input maxlength="16" minlength="16" type="tel" class="cardnum" v-model="cardnumber" @change="checknum()" @focusout="checknum2()" @focus="checkback()" placeholder="شماره کارت بانکی" />
          <div class="invalid-tooltip">{{ctool}}</div>
          </b-form-group>
          <b-form-group label="عکس کارت بانکی">
          <input type="file" id="file" class="btn btn-success">
        </b-form-group>
        <b-btn @click="submit()" variant="primary"> اضافه کردن کارت </b-btn>
      </fieldset>
    </b-card><br><br>
    <h4> حساب های بانکی شما</h4>
    <b-card >
      <table class="table col-12">
      <tr  v-for="card in accounts" v-bind:key="card[0]">
      <td style="width:50%" class="left"><img :src="`${card[1]}`" alt="" style="width:30%;float:right"></td>
      <td style="width:50%" colspan="6" class="left">{{card[0]}}</td>
      <div style="clear:both"></div>
      <hr>
      </tr>
      </table>
    </b-card><br><br>
    <button @click="aaccount()" class="btn btn-success" id="aaddaccount">اضافه کردن حساب بانکی جدید</button>
        <b-card id="addaccount" hidden header="اضافه کردن کارت بانکی" header-tag="h6" class="mb-4">
      <fieldset  class="demo-vertical-spacing-sm">
        <b-form-group label="شماره کارت بانکی">
          <b-input maxlength="16" minlength="16" type="tel" class="cardnum" v-model="accountnumber" placeholder="شماره کارت بانکی" />
          <div class="invalid-tooltip">{{ctool}}</div>
          </b-form-group>
        <b-btn @click="submitaccount()" variant="primary"> اضافه کردن کارت </b-btn>
      </fieldset>
    </b-card><br><br>
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
    this.geta()
  },
  data: () => ({
    options: [],
    accounts: [],
    file: '',
    cardnumber: '',
    accountnumber: '',
    errors: [],
    errors2: [],
    ctool: ''
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
    checkback () {
      if (this.cardnumber !== '') {
        this.cardnumber = String(this.cardnumber).replace('-', '').replace('-', '').replace('-', '')
      }
    },
    checknum () {
      if (String(this.cardnumber).length < 16) {
        this.errors2.push('1')
        document.querySelector('.cardnum').className += ' is-invalid'
        this.ctool = 'شماره کارت باید ۱۶ رقم باشد'
      } else {
        this.errors2 = []
        document.querySelector('.cardnum').className = document.querySelector('.cardnum').className.replace(' is-invalid', '')
        this.ctool = ''
        this.cardnumber = this.cardnumber.slice(0, 4) + '-' + this.cardnumber.slice(4, 8) + '-' + this.cardnumber.slice(8, 12) + '-' + this.cardnumber.slice(12, 16)
      }
    },
    checknum2 () {
      if (String(this.cardnumber).length === 16) {
        var card = String(this.cardnumber)
        this.cardnumber = card.slice(0, 4) + '-' + card.slice(4, 8) + '-' + card.slice(8, 12) + '-' + card.slice(12, 16)
      }
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
            this.options.push([result, itemm.image])
          }
          console.log(this.options)
        })
    },
    async geta () {
      var itemm
      await axios
        .get('/bankaccounts')
        .then(response => {
          for (itemm of response.data) {
            var result = itemm.number
            this.accounts.push([result])
          }
          console.log(this.options)
        })
    },
    async submit () {
      this.errors = []
      this.errors2 = []
      if (this.amount === 0) {
        this.errors.push('لطفا مبلغ را وارد کنید')
      }
      if (!this.cardnumber) {
        this.errors.push('لطفا کارتی را انتخاب کنید')
      }
      var card = this.cardnumber.replace('-', '').replace('-', '').replace('-', '')
      const formdata = new FormData()
      formdata.append('bankc', card)
      var img = document.getElementById('file').files[0]
      formdata.append('bankimg', img, img.name)
      await axios
        .post('/bankcards', formdata)
        .then(response => {

        })
        .catch(error => {
          if (error.response) {
            for (const property in error.response.data) {
              this.errors.push(`${property}: ${error.response.data[property]}`)
            }
            console.log(JSON.stringify(error.response.data))
          } else if (error.message) {
            this.errors.push(error.message)
            console.log(JSON.stringify(error))
          }
        })
    },
    async submitaccount () {
      this.errors = []
      this.errors2 = []
      var card = this.accountnumber
      await axios
        .post('/bankaccounts', { bankc: card })
        .then(response => {

        })
        .catch(error => {
          if (error.response) {
            for (const property in error.response.data) {
              this.errors.push(`${property}: ${error.response.data[property]}`)
            }
            console.log(JSON.stringify(error.response.data))
          } else if (error.message) {
            this.errors.push(error.message)
            console.log(JSON.stringify(error))
          }
        })
    },
    acard () {
      document.getElementById('aaddcard').hidden = true
      document.getElementById('addcard').hidden = false
    },
    aaccount () {
      document.getElementById('aaddaccount').hidden = true
      document.getElementById('addaccount').hidden = false
    }
  }
}
</script>
<style>
.cent{
  text-align: center;
}
.left{
  text-align: left;
  font-family: 'calibri';
}
.btnfont{
  font-size: 12px;
  padding: 9px;
  margin: 2px;
}
.error{
    color:red
}
.th{
  border-top: white!important;
}
.invalid-tooltip{
  position: relative;
  top:0;
  background-color: rgba(0, 0, 0, 0);
  color: red;
  text-align: left;
}
#file::-webkit-file-upload-button {
  visibility: hidden;
}
</style>
