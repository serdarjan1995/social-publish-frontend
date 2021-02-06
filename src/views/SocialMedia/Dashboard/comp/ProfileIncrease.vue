<template>
  <v-card class="neu-glow">
    <v-card-title class="mt-0 pt-0">
      <v-row class="mx-0" align="center" justify="space-between">
        <v-card-title class="text-subtitle-1 pa-0">{{ this.getTextEn("Analytical.profileIncrease") }}</v-card-title>
      </v-row>
    </v-card-title>
    <line-chart
        :data="getMyData"
        :options="option"
    />
  </v-card>
</template>
<script>
import colors from "vuetify/lib/util/colors";
import LineChart from "@/components/ChartJS/LineChart";

export default {
  components: {
    LineChart
  },
  methods: {
    getTextEn(myText) {
      return this.$i18n.t('' + myText + '')
    }
  },
  computed: {
    getMyData() {
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
            label: this.getTextEn("Analytical.gainFollowers"),
            fill: false,
            data: [10, 20, 30, 42, 50, 40],
            shadowOffsetX: 3,
            shadowOffsetY: 3,
            shadowBlur: 10,
            shadowColor: "rgba(103, 116, 132, 0.5)",
            pointRadius: 4,
            pointBevelWidth: 3,
            pointHoverRadius: 6,
            pointHoverBevelWidth: 4.5,
            pointHoverInnerGlowWidth: 20,
            pointHoverInnerGlowColor: `rgba(103, 116, 132, 0.5)`,
            gradientStroke: [colors.red.base, colors.red.accent3]
          },
          {
            label: this.getTextEn("Analytical.lostFollowers"),
            data: [15, 25, 39, 45, 55, 45],
            fill: false,
            shadowOffsetX: 3,
            shadowOffsetY: 3,
            shadowBlur: 10,
            shadowColor: "rgba(103, 116, 132, 0.5)",
            pointRadius: 4,
            pointBevelWidth: 3,
            pointHoverRadius: 6,
            pointHoverBevelWidth: 4.5,
            pointHoverInnerGlowWidth: 20,
            pointHoverInnerGlowColor: `rgba(103, 116, 132, 0.5)`,
            gradientStroke: [colors.indigo.base, colors.indigo.accent3]
          },
          {
            label: this.getTextEn("Analytical.shoppers"),
            data: [7, 17, 27, 37, 47, 27],
            fill: false,
            shadowOffsetX: 3,
            shadowOffsetY: 3,
            shadowBlur: 10,
            shadowColor: "rgba(103, 116, 132, 0.5)",
            pointRadius: 4,
            pointBevelWidth: 3,
            pointHoverRadius: 6,
            pointHoverBevelWidth: 4.5,
            pointHoverInnerGlowWidth: 20,
            pointHoverInnerGlowColor: `rgba(103, 116, 132, 0.5)`,
            gradientStroke: [colors.blue.base, colors.blue.accent3]
          },
          {
            label: this.getTextEn("Analytical.visitors"),
            data: [1, 11, 21, 31, 41, 51],
            fill: false,
            shadowOffsetX: 3,
            shadowOffsetY: 3,
            shadowBlur: 10,
            shadowColor: "rgba(103, 116, 132, 0.5)",
            pointRadius: 4,
            pointBevelWidth: 3,
            pointHoverRadius: 6,
            pointHoverBevelWidth: 4.5,
            pointHoverInnerGlowWidth: 20,
            pointHoverInnerGlowColor: `rgba(103, 116, 132, 0.5)`,
            gradientStroke: [colors.green.base, colors.green.accent3]
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
  },
};
</script>