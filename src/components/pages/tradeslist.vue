<template>
  <div>

    <h4 class="d-flex flex-wrap justify-content-between align-items-center pt-3 mb-4">
      <b-breadcrumb :items="forumPath" class="font-weight-bold mb-3" />
      <div class="col-12 col-md-3 p-0 mb-3">
      </div>
    </h4>

    <div v-for="section in sectionsData" :key="section.title">
      <b-card no-body class="mb-3">

        <b-card-header class="row no-gutters align-items-center">
          <div class="col-1 font-weight-bold">{{section.title}}</div>
          <div class="d-none d-md-block col-10 text-muted">
            <div class="row no-gutters align-items-center">
              <div class="col-2 ">زمان</div>
              <div class="col-1 ">نوع</div>
              <div class="col-2 cent">ارز </div>
              <div class="col-2 cent">مقدار </div>
              <div class="col-2 cent">موجودی </div>
              <div class="col-3 cent">توضیحات </div>
            </div>
          </div>
        </b-card-header>

        <div v-for="(forum, index) in section.forums" :key="forum.title">
          <b-card-body class="py-3">

            <div class="row no-gutters align-items-center">
              <div class="col-1"><a href="javascript:void(0)" class="text-big font-weight-semibold"><div v-if="forum.lastUpdate" class="media align-items-center">
                      <img :src="`${publicUrl}img/avatars/${forum.lastUpdate.user.avatar}`" alt="" class="d-block ui-w-50 rounded-circle">
                      <div class="media-body flex-truncate ml-2">
                      </div>
                    </div></a></div>
              <div class="d-none d-md-block col-10">

                <div class="row no-gutters align-items-center">
                  <div class="col-2 ">زمان</div>
                  <div class="col-1 ">معامله</div>
                  <div class="col-2 cent">لایت‌کوین </div>
                  <div class="col-2 cent">0.57229713 </div>
                  <div class="col-2 cent">0.57229713 </div>
                  <div class="col-3 cent">خرید 0.57287 لایت‌کوین به قیمت واحد 87,279,000 ﷼
                  </div>
                </div>

              </div>
            </div>

          </b-card-body>
          <hr class="m-0" v-if="index !== (section.forums.length - 1)">
        </div>

      </b-card>
    </div>

  </div>
</template>

<script>
export default {
  name: 'pages-forums-list',
  metaInfo: {
    title: 'Forum list - Pages'
  },
  data: () => ({
    forumPath: [
      { text: 'معاملات', active: true }
    ],

    sectionsData: [{
      title: ' شناسه',
      forums: [{
        title: 'Getting started',
        threads: 12,
        replies: 34,
        lastUpdate: {
          date: '1d',
          thread: { title: 'Aliquam et velit vel nisi egestas pulvinar sit amet ac tellus' },
          user: { avatar: 'btc.png', name: 'Leon Wilson' }
        }
      }, {
        title: 'Announcements',
        threads: 43,
        replies: 112,
        lastUpdate: {
          user: { avatar: 'btc.png', name: 'Allie Rodriguez' }
        }
      }]
    }]
  }),
  mounted () {
    this.check()
  },
  methods: {
    check () {
      if (!this.$store.state.isAuthenticated) {
        const toPath = this.$route.query.to || '/login'
        this.$router.push(toPath)
      }
    }
  }
}
</script>
<style>
.cent{
  text-align: center;
}
</style>
