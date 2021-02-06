<template>
  <v-card class="neu-glow pa-4">
    <v-card-title class="mt-0 pt-0">
      <v-row class="mx-0" align="center" justify="space-between">
        <v-card-title class="text-subtitle-1 pa-0">{{ this.getTextEn("Analytical.commentNshare") }}</v-card-title>
      </v-row>
    </v-card-title>
    <scatter-chart
        :data="data"
        :options="option"
    />
  </v-card>
</template>
<script>
import colors from "vuetify/lib/util/colors";
import ScatterChart from "@/components/ChartJS/ScatterChart";
export default {
  components: { ScatterChart },
  data() {
    return {
      data: {
        datasets: [
          {
            label: "Comment",
            data: [
              {
                x: this.randomScalingFactor(),
                y: this.randomScalingFactor()
              },
              {
                x: this.randomScalingFactor(),
                y: this.randomScalingFactor()
              },
              {
                x: this.randomScalingFactor(),
                y: this.randomScalingFactor()
              },
              {
                x: this.randomScalingFactor(),
                y: this.randomScalingFactor()
              },
              {
                x: this.randomScalingFactor(),
                y: this.randomScalingFactor()
              },
              {
                x: this.randomScalingFactor(),
                y: this.randomScalingFactor()
              },
              {
                x: this.randomScalingFactor(),
                y: this.randomScalingFactor()
              }
            ],
            gradientFill: [colors.blue.lighten4, colors.blue.accent4],
            borderColor: "transparent",
            pointBorderColor: colors.blue.base,
            pointBackgroundColor: colors.blue.lighten4,
            pointBorderWidth: 2,
            pointHoverBorderWidth: 2,
            pointRadius: 4
          },
          {
            label: "Like",
            data: [
              {
                x: this.randomScalingFactor(),
                y: this.randomScalingFactor()
              },
              {
                x: this.randomScalingFactor(),
                y: this.randomScalingFactor()
              },
              {
                x: this.randomScalingFactor(),
                y: this.randomScalingFactor()
              },
              {
                x: this.randomScalingFactor(),
                y: this.randomScalingFactor()
              },
              {
                x: this.randomScalingFactor(),
                y: this.randomScalingFactor()
              },
              {
                x: this.randomScalingFactor(),
                y: this.randomScalingFactor()
              },
              {
                x: this.randomScalingFactor(),
                y: this.randomScalingFactor()
              }
            ],
            gradientFill: [colors.pink.lighten4, colors.pink.accent4],
            borderColor: "transparent",
            pointBorderColor: colors.pink.base,
            pointBackgroundColor: colors.pink.lighten4,
            pointBorderWidth: 2,
            pointHoverBorderWidth: 2,
            pointRadius: 4
          }
        ]
      },
      option: {
        responsive: true,
        maintainAspectRatio: false,
        responsiveAnimationDuration: 800
      }
    };
  },
  methods: {
    randomScalingFactor() {
      return Math.round(Math.random() * 100);
    },
    getTextEn(myText) {
      return this.$i18n.t('' + myText + '')
    }
  }
};
</script>
