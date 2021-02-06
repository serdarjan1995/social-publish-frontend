<template>
  <v-card class="neu-glow">
    <v-card-title class="mt-0 pt-0">
      <v-row class="mx-0" align="center" justify="space-between">
        <v-card-title class="text-subtitle-1 pa-0">{{ this.getTextEn("Analytical.allReports") }}</v-card-title>
      </v-row>
    </v-card-title>
    <line-chart
        :data="getMyData"
        :options="option"
    />
    <v-row class="px-4">
      <v-col
          cols="12"
          sm="4"
          lg="4"
          class="pt-0 rounded_corner"
          v-for="(item, key) in getStatisticData"
          :key="key"
      >
        <operational-basic-statistic
            :heading="item.heading"
            :avatar="item"
            :title="item.text"
        >
        </operational-basic-statistic>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import colors from "vuetify/lib/util/colors";
import LineChart from "@/components/ChartJS/LineChart";
import OperationalBasicStatistic from "@/components/UI/Widgets/Cards/Statistics/OperationalBasicStatistic";


export default {
  components: {LineChart, OperationalBasicStatistic},
  methods: {
    getTextEn(myText) {
      return this.$i18n.t('' + myText + '')
    }
  },
  computed:{
    getStatisticData(){
      let myStatistic = [
        {
          icon: "mdi-check-bold",
          style: {},
          avatarStyle: {size: 50, xLarge: true},
          text: this.getTextEn('Operational.success'),
          heading: "16",
          title: null
        },
        {
          icon: "mdi-alert",
          style: {},
          avatarStyle: {size: 50},
          text: this.getTextEn('Operational.failed'),
          heading: "0",
          title: null
        },
        {
          icon: "mdi-send",
          style: {},
          avatarStyle: {size: 50},
          text: this.getTextEn('Operational.total'),
          heading: "0",
          title: null
        }
      ];
      return myStatistic;
    },
    getMyData(){
      let data = {
        labels: [
          1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30
        ],
        datasets: [
          {
            label: "Success",
            fill: true,
            data: [40, 39, 20, 40, 38, 50, 40, 40, 39, 20, 40, 38, 50, 40, 40, 39, 20, 40, 38, 50, 40, 40, 39, 20, 40, 38, 50, 40, 50, 40],
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
            label: "Failed",
            fill: false,
            data: [10, 22, 41, 38, 82, 70, 60, 10, 22, 41, 38, 82, 70, 60, 10, 22, 41, 38, 82, 70, 60, 10, 22, 41, 38, 82, 70, 60, 70, 60],
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
          display: true,
          position: "bottom"
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