<template>
  <v-card class="neu-glow width-100" style="width:calc(100% - 5px) !important">
    <v-card-title class="text-subtitle-1 pb-0">
      <v-row class="mx-0" align="center" justify="space-between">
        <v-card-title class="text-subtitle-1 pa-0">{{ this.getTextEn("Operational.visitedTimes") }}</v-card-title>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row class="text-center">
        <v-col md="12">
          <chart :options="getMyData"/>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import {Chart} from 'highcharts-vue'

export default {
  components: {Chart},
  methods: {
    getTextEn(myText) {
      return this.$i18n.t('' + myText + '')
    }
  },
  computed: {
    getMyData() {
      let myVar = {
        title: "",
        series: [{
          name: this.getTextEn("Operational.users"),
          data: [1, 2, 3] // sample data
        }]
      };
      return myVar;
    }
  },
  data() {
    return {
      points: [10, 0, 8, 2, 6, 4, 5, 5],
      chartType: 'Spline',
      seriesColor: '#6fcd98',
      colorInputIsSupported: null,
    }
  }
}
</script>

<style scoped>

</style>