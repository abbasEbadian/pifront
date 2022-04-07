<template>
  <div>

    <h4 class="d-flex flex-wrap justify-content-between align-items-center pt-3 mb-4">
      <b-breadcrumb class="font-weight-bold mb-3" />
      <div class="col-12 col-md-3 p-0 mb-3">
      </div>
    </h4>

    <div>
      <b-card no-body class="mb-3">
        <b-card-header class="row no-gutters align-items-center">
          <div class="col-1 ">ردیف</div>
          <div class="d-none d-md-block col-11 text-muted">
            <div class="row no-gutters align-items-center">
              <div class="col-1 cent">نام کاربری</div>
              <div class="col-1 cent">سطح</div>
              <div class="col-3 cent">دارایی ریالی</div>
              <div class="col-3 cent">مسدود کردن حساب </div>
              <div class="col-2 cent">ورود به پروفایل  </div>
              <div class="col-2 cent"> ارسال پیام  </div>
            </div>
          </div>
        </b-card-header>

        <div>
          <b-card-body class="py-3">

            <div v-for="(item,idx) in users" v-bind:key="idx" class="row no-gutters align-items-center">
              <div class="col-1 ">{{idx+1}}</div>
              <div class="d-none d-md-block col-11">

                <div  class="row no-gutters align-items-center">
                  <div class="col-1 cent">{{item.username}}</div>
                  <div class="col-1 cent">{{item.level}}</div>
                  <div class="col-3 cent calibri">{{balance(item.balance)}}</div>
                  <div v-if="item.is_active && !item.is_admin" class="col-3 cent"><b-button variant="warning" @click="block(item.id)">مسدود کردن حساب</b-button></div>
                  <div v-if="!item.is_active && !item.is_admin" class="col-3 cent"><b-button variant="light" @click="block(item.id)">فعال کردن حساب</b-button></div>
                  <div v-if="item.is_admin" class="col-3 cent"><b-button disabled variant="dark" @click="block(item.id)">مدیر</b-button></div>
                  <div class="col-2 cent"><b-button variant="success">ورود به پروفایل</b-button></div>
                  <div class="col-2 cent"><b-button variant="info">ارسال پیام</b-button></div>
                </div>
              </div>
              <hr style="width:100%">
            </div>
          </b-card-body>
        </div>

      </b-card>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'pages-forums-list',
  metaInfo: {
    title: 'Forum list - Pages'
  },
  data: () => ({
    users: []
  }),
  mounted () {
    this.getusers()
  },
  methods: {
    async getusers () {
      await axios
        .get('/adminpanel/user')
        .then(data => {
          this.users = data.data
        })
    },
    async block (id) {
      await axios
        .post('/adminpanel/user', { act: 1, id: id })
        .then(() => {
          this.$swal('<div class="swal2-header"><ul class="swal2-progress-steps" style="display: none;"></ul><div class="swal2-icon swal2-success swal2-icon-show" style="display: flex;"><div class="swal2-success-circular-line-left" style="background-color: rgb(255, 255, 255);"></div><span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span><div class="swal2-success-ring"></div> <div class="swal2-success-fix" style="background-color: rgb(255, 255, 255);"></div><div class="swal2-success-circular-line-right" style="background-color: rgb(255, 255, 255);"></div></div><img class="swal2-image" style="display: none;"><button type="button" class="swal2-close" aria-label="Close this dialog" style="display: none;">×</button></div>' + '<h5>     انجام شد .</h5>')
          location.reload()
        })
    },
    balance (input) {
      if (String(input).length > 3) {
        var item = String(input)
        var last = item.length % 3
        var out = item.slice(0, last) + ','
        for (var i = 0; i < parseInt(item.length / 3) - 1; i++) {
          out = out + item.slice(last + (i * 3), last + ((i + 1) * 3)) + ','
        }
        out = out + item.slice(last + ((parseInt(item.length / 3) - 1) * 3), last + (((parseInt(item.length / 3) - 1) + 1) * 3))
        return out
      } else {
        return input
      }
    }
  }
}
</script>
<style>
.cent{
  text-align: center;
}
.calibri{
    font-family: 'calibri';
}
</style>
