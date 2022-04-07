<template>
  <b-modal
    id="currency-modal"
    size="xl"
    title="Translate site"
    hide-backdrop
    scrollable
    >
    <button v-for="item in countries" v-bind:key="item" style="width:30%;height:80px; float:left; margin:1.5% ; border-style:none ; background:white; box-shadow:1px 1px #dedede" @on-country-click="hideModal">{{item.name}}</button>
  </b-modal>
</template>

<script>
export default {
  name: "CurrencyModal",
  components: {
  },
  data() {
    return {
      countries: [
        {
          name: "USD",
        },
        {
          name: "EU",
        },
      ],
    };
  },
  methods: {
    hideModal() {
      this.$bvModal.hide("currency-modal");
    },
  },
};
</script>