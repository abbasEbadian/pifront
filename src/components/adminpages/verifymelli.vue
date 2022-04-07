<template>
  <div>

    <h4 class="d-flex flex-wrap justify-content-between align-items-center pt-3 mb-4">
      <b-breadcrumb class="font-weight-bold mb-3" />
      <div class="col-12 col-md-3 p-0 mb-3">
      </div>
    </h4>

      <b-card no-body class="mb-3">

        <b-card-header class="row no-gutters align-items-center">
          <div class="col-1 cent">نام کاربری</div>
          <div class="col-3 font-weight-bold cent">شماره کارت</div>
              <div class="col-5 cent">تصویر کارت</div>
              <div class="col-3"> </div>

        </b-card-header>

        <div v-for="section in requests" :key="section.title">
          <b-card-body class="py-3 wallets">

            <div class="row no-gutters align-items-center">
              <div class="col-1 cent">{{section.get_user}}</div>
              <div class="col-3 cent">{{section.mellic}}</div>
              <div class="col-5 cent"><a href="javascript:void(0)" class="text-big font-weight-semibold">
                      <a format="png" target="_blank" :href="`${section.get_image}`"><img :src="`${section.get_image}`" alt="" class="d-block image" style="width:20%!important;margin:auto"></a>
                      <div class="media-body flex-truncate ml-2">
                    </div></a></div>
                  <div class="col-3 left"><button class="btnfont btn btn-danger" @click="reject(section.get_user , section.id)">رد درخواست</button><button class="btnfont btn btn-success" @click="accept(section.get_user , section.id)"> تایید درخواست</button></div>
            </div>

          </b-card-body>
        </div>

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
    this.getc()
  },
  data: () => ({
    requests: []
  }),
  forumPath: [
    { text: 'کیف ها', active: true }
  ],
  methods: {
    async getc () {
      await axios
        .get('adminpanel/verifymelli')
        .then(response => {
          this.requests = response.data
        })
    },
    async accept (user, id) {
      await axios
        .post('adminpanel/verifymelli', { user: user, id: id, status: 'True' })
        .then(response => {
          this.$swal('<div class="swal2-header"><ul class="swal2-progress-steps" style="display: none;"></ul><div class="swal2-icon swal2-success swal2-icon-show" style="display: flex;"><div class="swal2-success-circular-line-left" style="background-color: rgb(255, 255, 255);"></div><span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span><div class="swal2-success-ring"></div> <div class="swal2-success-fix" style="background-color: rgb(255, 255, 255);"></div><div class="swal2-success-circular-line-right" style="background-color: rgb(255, 255, 255);"></div></div><img class="swal2-image" style="display: none;"><button type="button" class="swal2-close" aria-label="Close this dialog" style="display: none;">×</button></div>' + '<h5>درخواست با موفقیت تایید شد</h5>')
          location.reload()
        })
        .catch(error => {
          if (error.response) {
            console.log(JSON.stringify(error.response.data))
          } else if (error.message) {
            console.log(JSON.stringify(error))
          }
        })
    },
    async reject (user, id) {
      await axios
        .put('adminpanel/verifymelli', { user: user, id: id, status: 'True' })
        .then(response => {
          this.$swal('<div class="swal2-header"><ul class="swal2-progress-steps" style="display: none;"></ul><div class="swal2-icon swal2-success swal2-icon-show" style="display: flex;"><div class="swal2-success-circular-line-left" style="background-color: rgb(255, 255, 255);"></div><span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span><div class="swal2-success-ring"></div> <div class="swal2-success-fix" style="background-color: rgb(255, 255, 255);"></div><div class="swal2-success-circular-line-right" style="background-color: rgb(255, 255, 255);"></div></div><img class="swal2-image" style="display: none;"><button type="button" class="swal2-close" aria-label="Close this dialog" style="display: none;">×</button></div>' + '<h5>درخواست با موفقیت رد شد</h5>')
          setTimeout(() => {
            location.reload()
          }, 2000)
        })
        .catch(error => {
          if (error.response) {
            console.log(JSON.stringify(error.response.data))
          } else if (error.message) {
            console.log(JSON.stringify(error))
          }
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
.left{
  float: left;
}
</style>
