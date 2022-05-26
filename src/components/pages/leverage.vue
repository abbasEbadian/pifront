<template>
  <div id="app" class="chartt" style="height:490px;overflow:auto">
  
  <table style="border-top:transparent!important;border-radius:11px;height:450px;overflow:auto" class="table table-striped" :class="{'table-dark': checkdark() === 'dark'}" >
    <thead>
      <tr style="border-style:none!important">
        <th style="padding:20px; text-align:center ; font-family:'arial'" class="col-1" @click="sort(0)"></th>
        <th style="padding:20px; text-align:center ; font-family:'arial'" class="col-2" @click="sort(0)">Pair</th>
        <th style="padding:20px; text-align:center ; font-family:'arial'" class="col-3" @click="sort(1)">Price</th>
        <th style="padding:20px; text-align:center ; font-family:'arial'" class="col-3" @click="sort(1)">Fiat Price(USD)</th>
        <th style="padding:20px; text-align:center ; font-family:'arial'" class="col-3" @click="sort(2)">Volume</th>
        <th style="padding:20px; text-align:center ; font-family:'arial'" class="col-3" @click="sort(2)">Leverage</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-top:rgba(0,0,0,0)!important" v-for="(cat , idx) of sortedCats" v-bind:key="idx">
        <td style="padding:15px; text-align:center ; font-family:'arial'" class="col-1"><i style="color:#cecece;font-size:20px" class="fas fa-star"></i></td>
        <td style="padding:15px; text-align:center ; font-family:'arial'" class="col-2">{{cat[0]}}</td>
        <td style="padding:15px; text-align:center ; font-family:'arial'" class="col-4">{{cat[1]}}</td>
        <td style="padding:15px; text-align:center ; font-family:'arial'" class="col-4">{{(Math.floor((cat[1]*100))/100)}}</td>
        <td style="padding:15px; text-align:center ; font-family:'arial'" class="col-4">{{cat[2]}}</td>
        <td style="padding:15px; text-align:center ; font-family:'arial'" class="col-4">{{cat[3]}}</td>
      </tr>
    </tbody>
  </table>
  <a hidden href="#">debug: sort={{currentSort}}, dir={{currentSortDir}}</a>
  

</div>
</template>

<style src="@/vendor/libs/vue-quill-editor/typography.scss" lang="scss"></style>
<style src="@/vendor/libs/vue-quill-editor/editor.scss" lang="scss"></style>

<!-- Page -->
<style src="@/vendor/styles/pages/messages.scss" lang="scss"></style>

<style lang="scss">
  .ql-container.ql-snow {
    height: 400px;
  }
</style>

<script>
import axios from 'axios'
import {store} from '../../main'
export default {
  name: 'pages-messages-v3-compose',
  metaInfo: {
    title: 'Compose message v3 - Pages'
  },
  components: {
  },
  data: () => ({
    cats:[],
    currentSort:'name',
    currentSortDir:'asc',
    info: [],
    store: store,
  }),
  mounted () {
    this.getc()
  },
  computed:{
  sortedCats:function() {
    return this.cats.sort((a,b) => {
      let modifier = 1;
      if(this.currentSortDir === 'desc') modifier = -1;
      if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
      if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
      return 0;
    });
  }
  },
  methods: {
    checkdark(){
      return localStorage.getItem('dark')
    },
    sort(s) {
    //if s == current sort, reverse
    if(s === this.currentSort) {
      this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
    }
    this.currentSort = s;
  },
    async getc () {
      await axios
        .get('/oltradeinfo')
        .then(response => {
          console.log(response.data)
          this.cats = []
          for(var item in response.data){
            this.cats.push([item , response.data[item].last , response.data[item].vol , response.data[item].leverage])
          }
          this.sort(3)
          this.sort(3)
        })
    },
    async send () {
      const id = this.$route.params.id
      const formData = {
        text: this.messageData.text,
        subid: id
      }
      await axios
        .post('/ticket', formData)
        .then(response => {
          location.reload()
        })
        .catch(() => {
        })
    }
  }
}
</script>
<style>
.card-body{
  padding: 0;
}
th{
  border-style: none!important;
}
td{
  border-style: none!important;
}
.chartt::-webkit-scrollbar {
  width: 0px;
}

.chartt::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    width: 3px;
    border-radius: 1px;
}

.chartt::-webkit-scrollbar-thumb {
    border-radius: 1px;
    box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
    width: 3px;
}
</style>