<template>
  <v-card class="neu-glow">
    <v-card-title class="mt-0 pa-2">
      <v-row class="mx-0" align="center" justify="space-between">
        <v-card-title class="text-subtitle-1 pa-0">{{ this.getTextEn("Analytical.postRatio") }}</v-card-title>
      </v-row>
    </v-card-title>
    <pie-chart
        class="pa-2"
        style="max-height:295px"
        :data="getMyData"
        :options="option"
    />
  </v-card>
</template>
<script>
import PieChart from "@/components/ChartJS/PieChart";

export default {
  components: {PieChart},
  methods: {
    getTextEn(myText) {
      return this.$i18n.t('' + myText + '')
    }
  },
  computed:{
    getMyData(){
      let myData = {
            labels: [this.getTextEn("Twitter"), this.getTextEn("Youtube"), this.getTextEn("Instagram"), this.getTextEn("Odnoklassniki")],
            datasets: [
              {
                gradientFill: [
                  ["#38a1f3", "#38a1f3"],
                  ["#ff0000", "#ff0000"],
                  ["#3f729b", "#3f729b"],
                  ["#ed812b", "#ed812b"]
                ],
                data: [40, 40, 15, 10]
              }
            ]
          };
      return myData;
    }
  },
  data() {
    return {
      option: {responsive: true, maintainAspectRatio: false}
    };
  }
};
</script>