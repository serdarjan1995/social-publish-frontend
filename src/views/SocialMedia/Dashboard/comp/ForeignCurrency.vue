<template>
  <v-data-table
      :headers="getMyHeader"
      :items="currencies"
      :disable-pagination="pagination"
      :hide-default-footer="pagination"
  >
    <template v-slot:item.status="{ item }">
      <v-icon :color="getColor(item.status)" dark>{{ getIcon(item.status) }}</v-icon>
    </template>
    <template v-slot:item.ratio="{ item }">
      <span :color="getColor(item.status)" dark>{{ item.ratio }}</span>
    </template>
  </v-data-table>
</template>
<script>
export default {
  computed : {
    getMyHeader(){
      let headers = [
        {
          text: '',
          align: 'start',
          sortable: false,
          value: 'status',
        },
        {
          text: this.getTextEn("Operational.currency"),
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {text: this.getTextEn("Operational.get"), value: 'get'},
        {text: this.getTextEn("Operational.sell"), value: 'sell'},
        {text: '%', value: 'ratio'}
      ];
      return headers;
    }
  },
  methods: {
    getTextEn(myText) {
      return this.$i18n.t('' + myText + '')
    },
    getColor(status) {
      if (status == "up") return 'red'
      else if (status == "stable") return 'orange'
      else return 'green'
    },
    getIcon(status) {
      if (status == "up") return 'mdi-arrow-up'
      else if (status == "stable") return 'mdi-minus'
      else return 'mdi-arrow-down'
    },
  },
  data() {
    return {
      pagination: true,
      currencies: [
        {
          name: 'Dollar',
          status: "up",
          get: 7.123234,
          sell: 8.1233214,
          ratio: "0.53"
        },
        {
          name: 'Euro',
          status: "up",
          get: 7.123234,
          sell: 8.1233214,
          ratio: "0.53"
        },
        {
          name: 'Aed',
          status: "down",
          get: 7.123234,
          sell: 8.1233214,
          ratio: "0.53"
        },
        {
          name: 'Euro',
          status: "up",
          get: 7.123234,
          sell: 8.1233214,
          ratio: "0.53"
        },
        {
          name: 'Euro',
          status: "stable",
          get: 7.123234,
          sell: 8.1233214,
          ratio: "0.53"
        },
      ],
    }
  },
}
</script>