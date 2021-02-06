<template>
  <v-card class="neu-glow">
    <v-card-title class="text-subtitle-1 pb-0">
      <v-row class="mx-0" align="center" justify="space-between">
        <v-card-title class="text-subtitle-1 pa-0">{{ this.getTextEn("Operational.visitedUsers") }}</v-card-title>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row class="text-center">
        <v-col md="3" class="text-md-caption">
          {{ this.getTextEn("Operational.users") }}
          <v-card-text class="pa-0 text-subtitle-2">25</v-card-text>
          <span class="red--text text-caption"><v-icon class="red--text text-subtitle-1">mdi-arrow-down-bold</v-icon> 21.52%</span>
        </v-col>
        <v-col md="3" class="text-md-caption">
          {{ this.getTextEn("Operational.session") }}
          <v-card-text class="pa-0 text-subtitle-2">30</v-card-text>
          <span class="green--text text-caption"><v-icon class="green--text text-subtitle-1">mdi-arrow-up-bold</v-icon> 21.52%</span>
        </v-col>
        <v-col md="3" class="caption">
          {{ this.getTextEn("Operational.appendRatio") }}
          <v-card-text class="pa-0 text-subtitle-2">53.33%</v-card-text>
          <span class="green--text text-caption"><v-icon class="green--text text-subtitle-1">mdi-arrow-up-bold</v-icon> 21.52%</span>
        </v-col>
        <v-col md="3" class="text-md-caption">
          {{ this.getTextEn("Operational.sessionDuration") }}
          <v-card-text class="pa-0 text-subtitle-2">2m 50s</v-card-text>
          <span class="green--text text-caption"><v-icon class="green--text text-subtitle-1">mdi-arrow-up-bold</v-icon> 21.52%</span>
        </v-col>
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
            label: this.getTextEn("Operational.pageView"),
            fill: false,
            data: [10, 20, 30, 42, 50, 40],
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
          },
          {
            label: this.getTextEn("Operational.duration"),
            data: [15, 25, 39, 45, 55, 45],
            fill: false,
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
            gradientStroke: [colors.indigo.base, colors.indigo.accent3]
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
          display: true,
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