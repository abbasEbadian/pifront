<template>
  <div class="authentication-wrapper authentication-1 px-4">
    <div class="authentication-inner py-5">

      <!-- Logo -->
      <div class="d-flex justify-content-center align-items-center">
        <div class="ui-w-60">
          <div class="w-100 position-relative" style="padding-bottom: 54%">
            <svg class="w-100 h-100 position-absolute" viewBox="0 0 148 80" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><linearGradient id="a" x1="46.49" x2="62.46" y1="53.39" y2="48.2" gradientUnits="userSpaceOnUse"><stop stop-opacity=".25" offset="0"></stop><stop stop-opacity=".1" offset=".3"></stop><stop stop-opacity="0" offset=".9"></stop></linearGradient><linearGradient id="e" x1="76.9" x2="92.64" y1="26.38" y2="31.49" xlink:href="#a"></linearGradient><linearGradient id="d" x1="107.12" x2="122.74" y1="53.41" y2="48.33" xlink:href="#a"></linearGradient></defs><path class="fill-primary" transform="translate(-.1)" d="M121.36,0,104.42,45.08,88.71,3.28A5.09,5.09,0,0,0,83.93,0H64.27A5.09,5.09,0,0,0,59.5,3.28L43.79,45.08,26.85,0H.1L29.43,76.74A5.09,5.09,0,0,0,34.19,80H53.39a5.09,5.09,0,0,0,4.77-3.26L74.1,35l16,41.74A5.09,5.09,0,0,0,94.82,80h18.95a5.09,5.09,0,0,0,4.76-3.24L148.1,0Z"></path><path transform="translate(-.1)" d="M52.19,22.73l-8.4,22.35L56.51,78.94a5,5,0,0,0,1.64-2.19l7.34-19.2Z" fill="url(#a)"></path><path transform="translate(-.1)" d="M95.73,22l-7-18.69a5,5,0,0,0-1.64-2.21L74.1,35l8.33,21.79Z" fill="url(#e)"></path><path transform="translate(-.1)" d="M112.73,23l-8.31,22.12,12.66,33.7a5,5,0,0,0,1.45-2l7.3-18.93Z" fill="url(#d)"></path></svg>
          </div>
        </div>
      </div>
      <!-- / Logo -->
      <!-- Form -->
      <form class="my-5">
        <b-form-group label="ایمیل">
          <input v-model="username" class="form-control username" />
          <div class="invalid-tooltip">{{utool}}</div>
        </b-form-group>
        <b-form-group>
          <div slot="label" class="d-flex justify-content-between align-items-end">
            <div>کلمه عبور</div>
            <a href="/forgetpassword" class="d-block small">رمز عبور خود را فراموش کرده اید ؟</a>
          </div>
          <input type="password" v-model="password" class="form-control pass" />
          <div class="invalid-tooltip">{{ptool}}</div>
        </b-form-group>

        <div class="d-flex justify-content-between align-items-center m-0">
          <b-btn variant="primary" @click="submitForm">Sign In</b-btn>
        </div>
      </form>
      <!-- / Form -->

      <div class="text-center text-muted">
        هنوز ثبت نام نکرده اید ؟ <router-link to="/signup"> ثبت نام کنید</router-link>
      </div>

    </div>
  </div>
</template>

<!-- Page -->
<style src="@/vendor/styles/pages/authentication.scss" lang="scss"></style>

<script>
import axios from 'axios'
export default {
  name: 'pages-authentication-login-v1',
  metaInfo: {
    title: 'Login v1 - Pages'
  },
  data: () => ({
    errors: [],
    errors2: [],
    ptool: '',
    utool: '',
    username: '',
    password: ''
  }),
  mounted () {
    document.title = 'Log In | Exchange'
  },
  methods: {
    async  submitForm () {
      document.querySelector('.username').className = document.querySelector('.username').className.replace(' is-invalid', '')
      document.querySelector('.pass').className = document.querySelector('.pass').className.replace(' is-invalid', '')
      this.errors = []
      axios.defaults.headers.common.Authorization = ''
      localStorage.removeItem('token')
      this.$store.commit('removeToken')
      this.errors = []
      if (this.username === '') {
        this.errors2.push('1')
        document.querySelector('.username').className += ' is-invalid'
        this.utool = 'نام کاربری را وارد نکرده اید'
      }
      if (this.password === '') {
        this.errors2.push('1')
        document.querySelector('.pass').className += ' is-invalid'
        this.ptool = ' کلمه عبور را وارد نکرده اید'
      } else if (this.password.length < 8) {
        this.ptool = ' کلمه عبور باید حداقل ۸ کاراکتر باشد '
      }
      if (this.errors2.length === 0) {
          this.username = this.username.replace(' ' , '').replace(' ' , '').replace(' ' , '').replace(' ' , '')
        const formData = {
          username: this.username.toLowerCase(),
          password: this.password
        }
        this.$loading(true)
        await axios
          .post('/login', formData)
          .then(response => {
            if(response.data !== 1){
              this.$loading(false)
              const token = response.data.auth_token
              this.$store.commit('setToken', token)
              axios.defaults.headers.common.Authorization = 'Token ' + token
              this.$store.state.isAuthenticated = true
              localStorage.setItem('token', token)
              const toPath = this.$route.go || '/'
              this.$router.push(toPath)
            }
            else{
              this.$loading(false)
              this.$swal({
                html: '<h3 style="text-align:center">کد تایید ارسال شده </h3> <input autocomplete="off" type="number" class="form-control" id="code">',
                confirmButtonClass: 'btn btn-success btn-fill',
                buttonsStyling: false
              }).then( () => {
                this.smscode()
            })
            }
          })
          .catch(error => {
            this.$loading(false)
            if (error.response) {
              for (const property in error.response.data) {
                if (property === 'non_field_errors') {
                  this.errors.push('نام کاربری یا کلمه عبور اشتباه است')
                } else {
                  this.errors.push(`${property}: ${error.response.data[property]}`)
                }
              }
            } else if (error.message) {
              this.errors.push(error.message)
            }
          })
      }
      if (this.errors.length) {
        this.$loading(false)
        var errors = this.errors
        var error = '<div class="swal2-icon swal2-error swal2-icon-show" style="display: flex;"><span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span></div><h5>'
        for (var er = 0; er < errors.length; er++) {
          error += '\n' + errors
        }
        error += '</h5>'
        this.$swal(error)
      }
    }
  }
}
</script>
<style>
.invalid-tooltip{
  position: relative;
  top:0;
  background-color: rgba(0, 0, 0, 0);
  color: red;
  text-align: left;
}
</style>
