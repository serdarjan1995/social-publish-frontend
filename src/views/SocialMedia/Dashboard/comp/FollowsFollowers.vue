<template>
  <v-card class="neu-glow pa-4">
    <v-card-title class="mt-0 pt-0">
      <v-row class="mx-0" align="center" justify="space-between">
        <v-card-title class="text-subtitle-1 pa-0">{{ this.getTextEn("Analytical.followerNfollow") }}</v-card-title>
      </v-row>
    </v-card-title>
    <line-chart
        :data="data"
        :options="option"
        :height="485"
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
  computed: {
    getFollowers() {
      let followerData = [

      ];
      return followerData;
    },
    getFollows() {
      let followsData = [

      ];
      return followsData;
    }
  },
  data() {
    return {
      data: {
        labels: [
          "2016",
          "2017",
          "2018",
          "2019",
          "2020"
        ],
        datasets: [
          {
            label: "Follows",
            fill: false,
            data: [25, 39, 20, 40, 38],
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
            lineTension: 0,
            gradientStroke: [colors.blue.base, colors.blue.accent3]
          },
          {
            label: "Followers",
            fill: false,
            data: [15, 25, 35, 45, 40],
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
            lineTension: 0,
            gradientStroke: [colors.red.base, colors.red.accent3]
          }
        ]
      },
      option: {
        responsive: true,
        maintainAspectRatio: false,
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
      }
    };
  }
};
</script>
<style scoped>
.rounded_corner {
  border-radius: 10px;
}
</style>