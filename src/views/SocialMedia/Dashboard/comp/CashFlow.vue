<template>
  <v-card class="neu-glow">
    <v-card-title class="text-subtitle-1 pb-0">
      <v-row class="mx-0" align="center" justify="space-between">
        <v-card-title class="text-subtitle-1 pa-0">{{ $t('Operational.cashFlow') }}</v-card-title>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row class="text-center">
        <v-col md="3" class="text-md-subtitle">
          <v-card-text class="pa-0 font-weight-bold">13.000<span class="text-md-caption">,00 ₺</span></v-card-text>
          {{ $t("Operational.balance") }}
        </v-col>
        <v-col md="3" class="text-md-subtitle">
          <v-card-text class="pa-0 font-weight-bold">13.000<span class="text-md-caption">,00 ₺</span></v-card-text>
          {{ $t("Operational.collecting") }}
        </v-col>
        <v-col md="3" class="text-md-subtitle">
          <v-card-text class="pa-0 font-weight-bold">13.000<span class="text-md-caption">,00 ₺</span></v-card-text>
          {{ $t("Operational.payment") }}
        </v-col>
        <v-col md="3" class="text-md-subtitle">
          <v-card-text class="pa-0 font-weight-bold">13.000<span class="text-md-caption">,00 ₺</span></v-card-text>
          {{ $t("Operational.endOfPeriod") }}
        </v-col>
        <v-col md="12"
               :key="componentKey">
          <bar-chart
              :data="getMyData"
              :options="option"
              ref="myChart"
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
  computed: {
    getMyData() {
      let myVar = {
        labels: [
          this.getTextEn("AppDrawer.January"),
          this.getTextEn("AppDrawer.February"),
          this.getTextEn("AppDrawer.March"),
          this.getTextEn("AppDrawer.April"),
          this.getTextEn("AppDrawer.May")
        ],
        datasets: [
          {
            label: this.getTextEn("Operational.balance"),
            gradientFill: [colors.blue.accent1, colors.blue.accent4],
            data: [40, 39, 20, 40, 38],
            shadowOffsetX: 2,
            shadowOffsetY: 4,
            shadowBlur: 8,
            shadowColor: "rgba(66, 165, 245, 0.5)",
            categoryPercentage: 0.5,
            barPercentage: 1
          },
          {
            label: this.getTextEn("Operational.collecting"),
            gradientFill: [colors.green.accent1, colors.green.accent4],
            data: [43, 30, 48, 47, 70],
            shadowOffsetX: 2,
            shadowOffsetY: 4,
            shadowBlur: 8,
            shadowColor: "rgba(66, 165, 245, 0.5)",
            categoryPercentage: 0.5,
            barPercentage: 1
          },
          {
            label: this.getTextEn("Operational.payment"),
            gradientFill: [colors.red.accent1, colors.red.accent4],
            data: [53, 24, 16, 36, 50],
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
      return myVar;
    }
  },
  methods: {
    getTextEn(myText) {
      return this.$i18n.t('' + myText + '')
    }
  },
  data() {
    return {
      componentKey: 0,
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