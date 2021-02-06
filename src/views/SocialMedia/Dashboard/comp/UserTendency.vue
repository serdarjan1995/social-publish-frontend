<template>
  <v-card class="neu-glow">
    <v-card-title class="text-subtitle-1 pb-0">
      <v-row class="mx-0" align="center" justify="space-between">
        <v-card-title class="text-subtitle-1 pa-0">{{ this.getTextEn("Operational.activeUsersTendecy") }}</v-card-title>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row class="text-center">
        <v-col md="12">
          <line-chart
              :data="getMyData"
              :options="option"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import colors from "vuetify/lib/util/colors";
import LineChart from "@/components/ChartJS/LineChart";

export default {
  components: {LineChart},
  methods: {
    getTextEn(myText) {
      return this.$i18n.t('' + myText + '')
    }
  },
  computed:{
    getMyData(){
      let myData = {
        labels: [
          this.getTextEn("AppDrawer.January"),
          this.getTextEn("AppDrawer.February"),
          this.getTextEn("AppDrawer.March"),
          this.getTextEn("AppDrawer.April"),
          this.getTextEn("AppDrawer.May"),
          this.getTextEn("AppDrawer.June")
        ],
        datasets: [
          {
            label: this.getTextEn("Operational.pageView"),
            fill: false,
            data: [10, 20, 10, 25, 15, 40],
            shadowOffsetX: 3,
            shadowOffsetY: 3,
            shadowBlur: 10,
            shadowColor: "rgba(103, 116, 132, 0.5)",
            pointRadius: 3,
            pointBevelWidth: 3,
            pointHoverRadius: 6,
            pointHoverBevelWidth: 4.5,
            pointHoverInnerGlowWidth: 20,
            pointHoverInnerGlowColor: `rgba(103, 116, 132, 0.5)`,
            gradientStroke: [colors.red.base, colors.red.accent3]
          }
        ]
      };
      return myData;
    }
  },
  data() {
    return {
      name: "CashFlow",
      option: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
          position: 'bottom'
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
                display: false
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                offsetGridLines: true
              }
            }
          ]
        }
      },
      gradients: [
        {stop: 0, color: colors.red.base},
        {stop: 1, color: colors.amber.base}
      ]
    }
  }
}
</script>

<style scoped>

</style>