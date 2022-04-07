<template>
  <b-modal
    id="translate-modal"
    size="xl"
    title="Translate site"
    hide-backdrop
    scrollable
    >
    <Translator v-for="item in countries" v-bind:key="item" style="width:30%; float:left; margin:1.5%" :countries="[item]" @on-country-click="hideModal"/></b-modal>
</template>

<script>
import { Translator } from "vue-google-translate";
export default {
  name: "TranslateModal",
  components: {
    Translator,
  },
  data() {
    return {
      countries: [
        {
          code: "en|fa",
          title: "Persian",
          flagIconUrl: 'https://aux.iconspalace.com/uploads/2067402931200184519.png',
        },
        {
          code: "en|en",
          title: "English",
        },
        {
          code: "en|ru",
          title: "Russian",
        },
        {
          code: "en|tr",
          title: "Turkish",
        },
        {
          code: "en|ar",
          title: "Arabic",
        },
      ],
    };
  },
  methods: {
    hideModal() {
      this.$bvModal.hide("translate-modal");
    },
  },
};
</script>