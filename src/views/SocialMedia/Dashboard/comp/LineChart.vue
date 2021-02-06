<template>
  <v-card class="neu-glow">
    <v-card-title class="pb-0 mb-2">
      <v-row class="mx-0" align="center" justify="space-between">
        <v-card-title class="pa-0">{{ title }}</v-card-title>
      </v-row>
    </v-card-title>
    <line-chart
        :data="data"
        :options="option"
    />
  </v-card>
</template>
<script>
import colors from "vuetify/lib/util/colors";
import LineChart from "@/components/ChartJS/LineChart";

const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea'],
]
export default {
  components: {LineChart},
  methods: {
    getTextEn(myText) {
      return this.$i18n.t('' + myText + '')
    }
  },
  data() {
    return {
      title: "Profil Büyümesi",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        datasets: [
          {
            label: "Gelen Takipçi",
            fill: true,
            data: [40, 39, 20, 40, 38, 50, 40, 39, 20, 40, 38, 50],
            shadowOffsetX: 15,
            shadowOffsetY: 3,
            shadowBlur: 10,
            shadowColor: "rgba(103, 116, 132, 0.5)",
            pointRadius: 4,
            pointBevelWidth: 15,
            pointHoverRadius: 6,
            pointHoverBevelWidth: 45,
            pointHoverInnerGlowWidth: 20,
            pointHoverInnerGlowColor: `rgba(103, 116, 132, 0.5)`,
            gradientStroke: gradients[4]
          },
          {
            label: "Giden Takipçi",
            data: [43, 30, 48, 47, 70, 30, 43, 30, 48, 47, 70, 30],
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
            gradientStroke: gradients[3]
          },
          {
            label: "Ziyaret Edenler",
            data: [23, 12, 43, 44, 32, 63, 15, 30, 53, 37, 97, 45],
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
            gradientStroke: gradients[5]
          },
          {
            label: "Alışveriş Yapanlar",
            data: [13, 22, 82, 31, 66, 33, 98, 100, 85, 72, 67, 62],
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
            gradientStroke: gradients[5]
          }
        ]
      },
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
        {stop: 0, color: colors.pink.base},
        {stop: 0.5, color: colors.amber.base}
      ]
    };
  }
};
</script>