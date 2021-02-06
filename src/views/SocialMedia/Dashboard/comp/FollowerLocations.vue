<template>
  <v-card class="neu-glow">
    <v-card-title class="mt-0 pa-5">
      <v-row class="mx-0" align="center" justify="space-between">
        <v-card-title class="text-caption-1 pa-0">{{ this.getTextEn("Analytical.followerLocations") }}</v-card-title>
      </v-row>
    </v-card-title>
    <horizontal-bar-chart
        style="max-height:245px !important"
        :data="getMyData"
        :options="option"
    />
  </v-card>
</template>
<script>
import HorizontalBarChart from "@/components/ChartJS/HorizontalBarChart";

export default {
  components: {
    HorizontalBarChart
  },
  methods: {
    getTextEn(myText){
      return this.$i18n.t('' + myText + '')
    }
  },
  computed: {
    getMyData(){
      let myData = {
        labels: ["Canada", "Turkey", "USA", "Russia", "China", "India"],
        datasets: [
          {
            label: this.getTextEn("Analytical.total"),
            gradientFill: ["#ff0000", "#ff0000"],
            data: [40, 39, 20, 40, 38, 57],
            shadowOffsetX: 1,
            shadowOffsetY: 2,
            shadowBlur: 8,
            shadowColor: "rgba(66, 165, 245, 0.5)",
            categoryPercentage: 0.5,
            barPercentage: 0.5
          }
        ]
      };
      return myData;
    }
  },
  data() {
    return {
      option: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        layout: {
          padding: {
            left: 10,
            right: 10,
            bottom: 10
          }
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true
              },
              ticks: {
                beginAtZero: true
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        }
      }
    }
  }
};
</script>