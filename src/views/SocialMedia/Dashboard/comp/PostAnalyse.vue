<template>
  <v-card class="neu-glow">
    <v-card-title class="mt-0 pt-0">
      <v-row class="mx-0" align="center" justify="space-between">
        <v-card-title class="text-subtitle-1 pa-0">{{ this.getTextEn("Analytical.postAnalyse") }}</v-card-title>
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
  components: {LineChart},
  methods: {
    getTextEn(myText) {
      return this.$i18n.t('' + myText + '')
    }
  },
  computed:{
    getMyData(){
      let data = {
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
            label: "Expense",
            fill: true,
            data: [40, 39, 20, 40, 38, 50, 40],
            shadowOffsetX: 3,
            shadowOffsetY: 3,
            shadowBlur: 10,
            shadowColor: "rgba(103, 116, 132, 0.5)",
            pointRadius: 0,
            borderWidth: 0,
            pointHoverInnerGlowColor: `rgba(103, 116, 132, 0.5)`,
            gradientFill: [colors.blue.lighten4, colors.blue.accent4],
            order: 0
          },
          {
            label: "Expense",
            fill: false,
            data: [10, 22, 41, 38, 82, 70, 60],
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
            gradientStroke: [colors.blue.base, colors.blue.accent3],
            order: 1
          }
        ]
      };
      return data;
    }
  },
  data() {
    return {
      option: {
        responsive: true,
        maintainAspectRatio: false,
        scaleOverride: true,
        tooltips: {
          mode: "index",
          intersect: false
        },
        hover: {
          mode: "index",
          intersect: false
        },
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
                display: false,
                zeroLineColor: "transparent"
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: false,
                drawTicks: false
              }
            }
          ]
        }
      },
      gradients: [
        {stop: 0, color: colors.pink.base},
        {stop: 0.5, color: colors.amber.base}
      ]
    };
  }
};
</script>