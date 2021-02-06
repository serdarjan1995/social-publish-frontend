<template>
  <v-card class="neu-glow">
    <v-card-title class="text-subtitle-1 pb-0">
      <v-row class="mx-0" align="center" justify="space-between">
        <v-card-title class="text-subtitle-1 pa-0">{{ this.getTextEn("Operational.twelveWeeks") }}</v-card-title>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row class="text-center">
        <v-col md="3" class="text-md-subtitle">
          <v-card-text class="pa-0 font-weight-bold">13.000</v-card-text>
          {{ this.getTextEn("Operational.success") }}
        </v-col>
        <v-col md="3" class="text-md-subtitle">
          <v-card-text class="pa-0 font-weight-bold">13.000</v-card-text>
          {{ this.getTextEn("Operational.refund") }}
        </v-col>
        <v-col md="3" class="text-md-subtitle">
          <v-card-text class="pa-0 font-weight-bold">13.000</v-card-text>
          {{ this.getTextEn("Operational.total") }}
        </v-col>
        <v-col md="3" class="text-md-subtitle">
          <v-card-text class="pa-0 font-weight-bold">13.000</v-card-text>
          {{ this.getTextEn("Operational.total") }}
        </v-col>
        <v-col md="12">
          <bar-chart
              :data="getMyData"
              :options="option"
              style="max-height:395px !important"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import colors from "vuetify/lib/util/colors";
import BarChart from "@/components/ChartJS/BarChart";

export default {
  components: {BarChart},
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
          this.getTextEn("AppDrawer.June"),
          this.getTextEn("AppDrawer.July")
        ],
        datasets: [
          {
            label: this.getTextEn("Operational.total"),
            gradientFill: [colors.blue.accent1, colors.blue.accent4],
            data: [40, 39, 20, 40, 38, 32, 75],
            shadowOffsetX: 2,
            shadowOffsetY: 4,
            shadowBlur: 8,
            shadowColor: "rgba(66, 165, 245, 0.5)",
            categoryPercentage: 0.5,
            barPercentage: 1
          },
          {
            label: this.getTextEn("Operational.success"),
            gradientFill: [colors.green.accent1, colors.green.accent4],
            data: [43, 30, 48, 47, 70, 62, 45],
            shadowOffsetX: 2,
            shadowOffsetY: 4,
            shadowBlur: 8,
            shadowColor: "rgba(66, 165, 245, 0.5)",
            categoryPercentage: 0.5,
            barPercentage: 1
          },
          {
            label: this.getTextEn("Operational.refund"),
            gradientFill: [colors.red.accent1, colors.red.accent4],
            data: [53, 24, 16, 36, 50, 54, 98],
            shadowOffsetX: 2,
            shadowOffsetY: 4,
            shadowBlur: 8,
            shadowColor: "rgba(66, 165, 245, 0.5)",
            categoryPercentage: 0.5,
            barPercentage: 1,
            endingShape: 'rounded'
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