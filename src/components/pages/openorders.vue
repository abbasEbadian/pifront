<template>
  <div>

     <h4 class="d-flex flex-wrap justify-content-between align-items-center pt-3 mb-4">
      <b-breadcrumb :items="forumPath" class="font-weight-bold mb-3" />
      <div class="col-12 col-md-3 p-0 mb-3">
      </div>
    </h4>

    <div>
      <b-card no-body class="mb-3">
        <b-card-header class="row no-gutters align-items-center">
          <div class="col-1 ">ردیف</div>
          <div class="d-none d-md-block col-10 text-muted">
            <div class="row no-gutters align-items-center">
              <div class="col-3 cent">زمان</div>
              <div class="col-1 cent">نوع</div>
              <div class="col-2 cent">ارز </div>
              <div class="col-2 cent">مقدار </div>
              <div class="col-2 cent">قیمت </div>
              <div class="col-2 cent">انجام شده </div>
            </div>
          </div>
        </b-card-header>

        <div>
          <b-card-body class="py-3">

            <div v-for="(item,idx) in sellmaintrades" v-bind:key="idx" class="row no-gutters align-items-center">
              <div class="col-1 ">{{idx+1}}</div>
              <div class="d-none d-md-block col-10">

                <div  class="row no-gutters align-items-center">
                  <div v-if="item.get_age !== ''" class="col-3 cent">{{item.get_age}}پیش</div>
                  <div v-if="item.get_age === ''" class="col-3 cent">لحظاتی پیش</div>
                  <div class="col-1 cent">فروش</div>
                  <div class="col-2 cent">{{item.get_brand}}</div>
                  <div class="col-2 cent">{{item.start}} </div>
                  <div class="col-2 cent">{{item.price}} </div>
                  <div class="col-2 cent">{{item.start - item.amount}} </div>
                </div>
              </div>
              <hr style="width:100%">
            </div>
            <div v-for="(item,idx) in buymaintrades" v-bind:key="idx" class="row no-gutters align-items-center">
              <div class="col-1 ">{{idx+1}}</div>
              <div class="d-none d-md-block col-10">

                <div  class="row no-gutters align-items-center">
                  <div v-if="item.get_age !== ''" class="col-3 cent">{{item.get_age}}پیش</div>
                  <div v-if="item.get_age === ''" class="col-3 cent">لحظاتی پیش</div>
                  <div class="col-1 cent">خرید</div>
                  <div class="col-2 cent">{{item.get_brand}}</div>
                  <div class="col-2 cent">{{item.start}} </div>
                  <div class="col-2 cent">{{item.price}} </div>
                  <div class="col-2 cent">{{item.start - item.amount}} </div>
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
    sellmaintrades: [],
    buymaintrades: []
  }),
  mounted () {
    this.getselltrades()
    this.getbuytrades()
  },
  methods: {
    async getselltrades () {
      await axios
        .get('/maintradesselllist')
        .then(data => {
          this.sellmaintrades = data.data
          console.log(data.data)
        })
    },
    async getbuytrades () {
      await axios
        .get('/maintradesbuylist')
        .then(data => {
          this.buymaintrades = data.data
          console.log(data.data)
        })
    }
  }
}
</script>
<style>
.cent{
  text-align: center;
}
</style>
