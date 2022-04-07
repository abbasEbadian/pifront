<template>
  <div>
    <h4 class="font-weight-bold py-3 mb-4">
      اطلاعات کاربری  <span class="text-muted"> {{userData.username}}</span>
    </h4>
      <br><br><h3 style="text-align:center">ارتقا به سطح ۱</h3><br><br>
      <b-card>
        <b-card-body>

        </b-card-body>
        <b-card-body class="pb-2">
          <vue-step-progress-indicator
  :steps="[
      'تایید موبایل',
      'تایید ایمیل',
      ' تایید کارت بانکی',
      'تایید کارت ملی',
  ]"
  :active-step="process"
/><br><br>
</b-card-body>
      </b-card>
      <h4 hidden id="mobiletitle">تایید شماره همراه</h4>
      <b-card hidden style="margin-bottom: 150px" id="mobilecard" class="b-ver">
<b-card-body class="center">

          <b-form-group label=" "><br><br>
            <b-input placeholder="*********9" maxlength="10" v-model="number"  id="mno" /><br>
            <a href="javascript:void(0)" @click="mobilesend()" class="small btn btn-info" id="mbtn">ارسال کد</a>

             <b-input hidden :placeholder="'کد ارسال شده'" v-model="mcode" id="mc" class="mb-1 smallin" />
            <a hidden @click="mobileverify()" href="javascript:void(0)" class="small btn btn-success" id="mcb">تایید شماره همراه</a>

          </b-form-group><br><br><br><br>

          </b-card-body>
      </b-card>
      <h4 hidden id="emailtitle">تایید  آدرس ایمیل </h4>
      <b-card hidden style="margin-bottom: 150px" id="emailcard" class="b-ver">
<b-card-body class="center">
          <b-form-group label="">
            <b-input :placeholder="'آدرس ایمیل'" type="email" id="eno" v-model="email"  /><br>
            <a href="javascript:void(0)" @click="emailsend()" id="ebtn" class="small btn btn-info">ارسال کد</a>
            <b-input hidden :placeholder="'کد ارسال شده'" v-model="ecode" id="ec"  />
            <a hidden @click="emailverify()" href="javascript:void(0)" id="ecb" class="small btn btn-success">تایید  آدرس ایمیل </a>

          </b-form-group><br><br><br>

          </b-card-body>
          <h4 hidden id="banktitle">اضافه کردن کارت بانکی</h4>
      </b-card>

      <b-card id="bankcard" hidden header="" header-tag="h6" class="mb-4">
      <fieldset  class="demo-vertical-spacing-sm">
        <b-form-group label="شماره کارت بانکی">
          <b-input maxlength="16" minlength="16" type="tel" class="cardnum" v-model="cardnumber" @change="checknum()" @focusout="checknum2()" @focus="checkback()" placeholder="شماره کارت بانکی" />
          <div class="invalid-tooltip">{{ctool}}</div>
          </b-form-group>
          <b-form-group label="عکس کارت بانکی">
          <input type="file" id="file" class="btn btn-success">
        </b-form-group>
        <b-btn @click="submitcard()" variant="primary"> اضافه کردن کارت </b-btn>
      </fieldset>
    </b-card><br><br>
    <h4 hidden id="mellititle">تایید کارت ملی</h4>
      <b-card hidden style="margin-bottom: 150px" id="mellicard" class="b-ver">
<b-card-body class="center">
          <b-form-group label=" "><br><br><br>
          <b-input style="width:74%;float:left" maxlength="10" minlength="10" class="mellinum" v-model="mellinum" id="mell" placeholder="" /><label style="width:25%" for="mell">شماره کارت ملی</label>
          <div style="clear:both"></div><br>
            <input type="file" id="file2" class="btn btn-success">
            <label for="file" href="javascript:void(0)" class="small btn btn-info"> انتخاب فایل</label>
            <a href="javascript:void(0)" @click="submitmelli()" class="small btn btn-success"> ارسال کارت ملی برای تایید</a>

          </b-form-group>

        </b-card-body>
        <b-card-body class="pb-2">

        </b-card-body>
      </b-card>
  </div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style src="@/vendor/libs/vue-multiselect/vue-multiselect.scss" lang="scss"></style>

<!-- Page -->
<style src="@/vendor/styles/pages/users.scss" lang="scss"></style>

<script>
import VueStepProgressIndicator from 'vue-step-progress-indicator'
import axios from 'axios'
export default {
  name: 'pages-user-edit',
  metaInfo: {
    title: 'User edit - Pages'
  },
  components: {
    VueStepProgressIndicator
  },
  data: () => ({
    process: 0,
    cardnumber: '',
    ctool: '',
    number: '',
    mellinum: '',
    email: '',
    mcode: '',
    ecode: '',
    bv: 0,
    userData: {
      avatar: '5-small.png',
      name: '',
      username: '',
      email: '',
      company: '',
      verified: true,
      status: 1,
      level: 0
    }
  }),
  created () {
    this.aa()
  },
  mounted () {
    this.get_user()
    this.check()
    this.verify()
  },
  methods: {
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
    async verify () {
      await axios
        .get('/verify')
        .then(response => {
          const data = response.data[0]
          if (!data.mobilev) {
            document.querySelector('#mobilecard').hidden = false
            document.querySelector('#mobiletitle').hidden = false
            this.process = 0
          } else if (!data.emailv) {
            document.querySelector('#emailcard').hidden = false
            document.querySelector('#emailtitle').hidden = false
            this.process = 1
          } else if (!data.bankv) {
            this.process = 2
            if (this.bv) {
              document.querySelector('#bankcard').hidden = false
              document.querySelector('#banktitle').hidden = false
            } else if (!data.melliv) {
              document.querySelector('#mellicard').hidden = false
              document.querySelector('#mellititle').hidden = false
            }
          } else {
            this.process = 3
          }
        })
    },
    async submitcard () {
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
          location.reload()
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
    check () {
      if (!this.$store.state.isAuthenticated) {
        const toPath = this.$route.query.to || '/login'
        this.$router.push(toPath)
      }
    },
    async aa () {
      await axios
        .get('/bankrequests').then(() => { this.bv = false }).catch(() => { this.bv = true })
    },
    async get_user () {
      await axios
        .get('/userinfo')
        .then(response => {
          this.userData.level = response.data[0].level
        })
    },
    async mobilesend () {
      await axios
        .put('/mobile-verify', { number: this.number })
        .then(response => {
          document.querySelector('#mno').hidden = true
          document.querySelector('#mbtn').hidden = true
          document.querySelector('#mc').hidden = false
          document.querySelector('#mcb').hidden = false
          this.$swal('<div class="swal2-header"><ul class="swal2-progress-steps" style="display: none;"></ul><div class="swal2-icon swal2-success swal2-icon-show" style="display: flex;"><div class="swal2-success-circular-line-left" style="background-color: rgb(255, 255, 255);"></div><span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span><div class="swal2-success-ring"></div> <div class="swal2-success-fix" style="background-color: rgb(255, 255, 255);"></div><div class="swal2-success-circular-line-right" style="background-color: rgb(255, 255, 255);"></div></div><img class="swal2-image" style="display: none;"><button type="button" class="swal2-close" aria-label="Close this dialog" style="display: none;">×</button></div>' + '<h5> کد با موفقیت ارسال شد</h5>')
        })
    },
    async mobileverify () {
      await axios
        .post('/mobile-verify', { code: this.mcode, mobile: this.number })
        .then(response => {
          location.reload()
          this.$swal('<div class="swal2-header"><ul class="swal2-progress-steps" style="display: none;"></ul><div class="swal2-icon swal2-success swal2-icon-show" style="display: flex;"><div class="swal2-success-circular-line-left" style="background-color: rgb(255, 255, 255);"></div><span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span><div class="swal2-success-ring"></div> <div class="swal2-success-fix" style="background-color: rgb(255, 255, 255);"></div><div class="swal2-success-circular-line-right" style="background-color: rgb(255, 255, 255);"></div></div><img class="swal2-image" style="display: none;"><button type="button" class="swal2-close" aria-label="Close this dialog" style="display: none;">×</button></div>' + '<h5> کد با موفقیت تایید شد</h5>')
        })
    },
    async emailsend () {
      await axios
        .put('/email-verify', { email: this.email })
        .then(response => {
          document.querySelector('#eno').hidden = true
          document.querySelector('#ebtn').hidden = true
          document.querySelector('#ec').hidden = false
          document.querySelector('#ecb').hidden = false
          this.$swal('<div class="swal2-header"><ul class="swal2-progress-steps" style="display: none;"></ul><div class="swal2-icon swal2-success swal2-icon-show" style="display: flex;"><div class="swal2-success-circular-line-left" style="background-color: rgb(255, 255, 255);"></div><span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span><div class="swal2-success-ring"></div> <div class="swal2-success-fix" style="background-color: rgb(255, 255, 255);"></div><div class="swal2-success-circular-line-right" style="background-color: rgb(255, 255, 255);"></div></div><img class="swal2-image" style="display: none;"><button type="button" class="swal2-close" aria-label="Close this dialog" style="display: none;">×</button></div>' + '<h5> کد با موفقیت ارسال شد</h5>')
        })
    },
    async emailverify () {
      await axios
        .post('/email-verify', { code: this.ecode, email: this.email })
        .then(response => {
          location.reload()
          this.$swal('<div class="swal2-header"><ul class="swal2-progress-steps" style="display: none;"></ul><div class="swal2-icon swal2-success swal2-icon-show" style="display: flex;"><div class="swal2-success-circular-line-left" style="background-color: rgb(255, 255, 255);"></div><span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span><div class="swal2-success-ring"></div> <div class="swal2-success-fix" style="background-color: rgb(255, 255, 255);"></div><div class="swal2-success-circular-line-right" style="background-color: rgb(255, 255, 255);"></div></div><img class="swal2-image" style="display: none;"><button type="button" class="swal2-close" aria-label="Close this dialog" style="display: none;">×</button></div>' + '<h5> کد با موفقیت تایید شد</h5>')
        })
    },
    async submitmelli () {
      const formdata = new FormData()
      formdata.append('mellic', this.mellinum)
      var img = document.getElementById('file2').files[0]
      formdata.append('melliimg', img, img.name)
      await axios
        .post('/verifymelli', formdata)
        .then(() => {
          setTimeout(() => {
            location.reload()
          }, 1000)
          this.$swal('<div class="swal2-header"><ul class="swal2-progress-steps" style="display: none;"></ul><div class="swal2-icon swal2-success swal2-icon-show" style="display: flex;"><div class="swal2-success-circular-line-left" style="background-color: rgb(255, 255, 255);"></div><span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span><div class="swal2-success-ring"></div> <div class="swal2-success-fix" style="background-color: rgb(255, 255, 255);"></div><div class="swal2-success-circular-line-right" style="background-color: rgb(255, 255, 255);"></div></div><img class="swal2-image" style="display: none;"><button type="button" class="swal2-close" aria-label="Close this dialog" style="display: none;">×</button></div>' + '<h5> کد با موفقیت تایید شد</h5>')
        })
        .catch(error => {
          this.errors.push(error.message)
          console.log(JSON.stringify(error))
        })
    }
  }
}
</script>
<style>
.center{
  text-align: center;
}
.smallin{
  width: 30%;
  margin: auto;
}
</style>
