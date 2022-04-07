<template>
  <div style="padding:5%">
    <h4 class="d-flex justify-content-between align-items-center w-100 font-weight-bold py-3 mb-4">
      <div>   Announcement </div>
      <b-btn variant="primary rounded-pill" class="d-block"><span class="ion ion-md-add"></span>&nbsp; Create article</b-btn>
    </h4>

    <b-card no-body>

      <!-- Table controls -->
      <b-card-body>

        <div class="row">
          <div class="col">
            Per page: &nbsp;
            <b-select size="sm" v-model="perPage" :options="[10, 20, 30, 40, 50]" class="d-inline-block w-auto" />
          </div>
          <div class="col">
            <b-input size="sm" placeholder="Search..." class="d-inline-block w-auto float-sm-right" @input="filter($event)" />
          </div>
        </div>

      </b-card-body>
      <!-- / Table controls -->

      <!-- Table -->
      <hr class="border-light m-0">
      <div class="table-responsive">

        <b-table
          :items="articlesData"
          :fields="fields"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :striped="true"
          :bordered="true"
          :current-page="currentPage"
          :per-page="perPage"
          class="card-table">
        </b-table>

      </div>

      <!-- Pagination -->
      <b-card-body class="pt-0 pb-3">

        <div class="row">
          <div class="col-sm text-sm-left text-center pt-3">
            <span class="text-muted" v-if="totalItems">Page {{ currentPage }} of {{ totalPages }}</span>
          </div>
          <div class="col-sm pt-3">
            <b-pagination class="justify-content-center justify-content-sm-end m-0"
              v-if="totalItems"
              v-model="currentPage"
              :total-rows="totalItems"
              :per-page="perPage"
              size="sm" />
          </div>
        </div>

      </b-card-body>
      <!-- / Pagination -->

    </b-card>
  </div>
</template>

<script>
export default {
  name: 'pages-articles-list',
  metaInfo: {
    title: 'Articles list - Pages'
  },
  data: () => ({
    // Options
    dataUrl: 'json/pages_articles_list.json',
    searchKeys: ['title'],
    sortBy: 'id',
    sortDesc: false,
    perPage: 10,

    fields: [
      { key: 'title', sortable: true, thStyle: 'min-width: 18rem' },
      { key: 'created_at', sortable: true, thClass: 'text-nowrap' },
    ],

    articlesData: [],
    originalArticlesData: [],

    currentPage: 1
  }),

  computed: {
    totalItems () {
      return this.articlesData.length
    },
    totalPages () {
      return Math.ceil(this.totalItems / this.perPage)
    }
  },

  methods: {
    filter (value) {
      const val = value.toLowerCase()
      const filtered = this.originalArticlesData.filter(d => {
        return Object.keys(d)
          .filter(k => this.searchKeys.includes(k))
          .map(k => String(d[k]))
          .join('|')
          .toLowerCase()
          .indexOf(val) !== -1 || !val
      })
      this.articlesData = filtered
    }
  },

  created () {
    const req = new XMLHttpRequest()
    req.open('GET', `${this.publicUrl}${this.dataUrl}`)

    req.onload = () => {
      const data = JSON.parse(req.response)
      this.articlesData = data
      this.originalArticlesData = data.slice(0)
    }

    req.send()
  }
}
</script>
