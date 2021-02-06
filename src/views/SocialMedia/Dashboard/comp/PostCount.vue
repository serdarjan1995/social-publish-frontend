<template>
  <v-card class="neu-glow">
    <v-card-title class="mt-0 pt-0">
      <v-row class="mx-0" align="center" justify="space-between">
        <v-card-title class="text-subtitle-1 pa-0">{{ this.getTextEn("Analytical.postCount") }}</v-card-title>
      </v-row>
    </v-card-title>
    <vue-apex-charts type="radialBar" height="410" :options="getMyData" :series="series"></vue-apex-charts>
  </v-card>
</template>
<script>
import VueApexCharts from 'vue-apexcharts';

export default {
  components: {VueApexCharts},
  methods: {
    getTextEn(myText) {
      return this.$i18n.t('' + myText + '')
    }
  },
  computed:{
    getMyData(){
      let chartOptions = {
            labels: [this.getTextEn("Analytical.finished"), this.getTextEn("Analytical.pending"), this.getTextEn("Analytical.rejected")],
            plotOptions: {
              radialBar: {
                size: 165,
                offsetY: -5,
                hollow: {
                  size: '20%'
                },
                track: {
                  background: "#ebebeb",
                  strokeWidth: '100%',
                  opacity: 0,
                  margin: 15,
                },
                dataLabels: {
                  show: true,
                  name: {
                    fontSize: '18px',
                  },
                  value: {
                    fontSize: '16px',
                    color: "#636a71",
                    offsetY: 11
                  },
                  total: {
                    show: true,
                    label: this.getTextEn("Analytical.total"),
                    formatter: function () {
                    return 42459
                  }
                }
              }
            },
          },
          legend: {
            show: true,
            floating: true,
            fontSize: '16px',
            position: 'left',
            offsetX: 25,
            offsetY: 15,
            labels: {
              useSeriesColors: true,
            },
            markers: {
              size: 0
            },
            formatter: function (seriesName, opts) {
            return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
          },
          itemMargin: {
            vertical: 3
          }
    },
      responsive: [{
        breakpoint: 576,
        options: {
          plotOptions: {
            radialBar: {
              size: 150,
              hollow: {
                size: '50%'
              },
              track: {
                background: "#ebebeb",
                strokeWidth: '100%',
                opacity: 0,
                margin: 5,
              },
            }
          }
        }
      }],
          colors: ['#5dac61', '#6cb6f0', '#f34424'],
          fill: {
        type: 'gradient'
      },
      stroke: {
        lineCap: 'round'
      },
      chart: {
        height: 355,
      }
    };
      return chartOptions;
    }
  },
  data() {
    return {
      series: [76, 62, 67],
    };
  }
};
</script>
<style scoped>
.apexcharts-legend {
  z-index: 9999 !important;;
}
</style>