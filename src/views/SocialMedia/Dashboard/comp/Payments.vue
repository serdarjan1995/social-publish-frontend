<template>
  <v-card class="neu-glow">
    <v-card-title class="text-subtitle-1 pb-0">
      <v-row class="mx-0" align="center" justify="space-between">
        <v-card-title class="text-subtitle-1 pa-0">{{ this.getTextEn("Operational.payments") }}</v-card-title>
      </v-row>
    </v-card-title>
    <v-row>
      <v-col md="8">
        <v-row class="text-center ma-0">
          <v-col md="4">
            <v-progress-circular
                :rotate="135"
                size="150"
                :width="15"
                :value="75"
                color="green darken-1"
            >
              <v-row class="flex-column" justify="center" text-align="center">
                        <span class="text text-center" style="white-space: pre-line;">
                          {{ this.getTextEn("Operational.amountToBePaid") }}<br/>62
                        </span>
              </v-row>
            </v-progress-circular>
          </v-col>
          <v-col md="4">
            <v-progress-circular
                :rotate="135"
                size="150"
                :width="15"
                :value="75"
                color="red darken-1"
            >
              <v-row class="flex-column" justify="center" text-align="center">
                        <span class="text text-center" style="white-space: pre-line;">
                          {{ this.getTextEn("Operational.late") }}<br/>62
                        </span>
              </v-row>
            </v-progress-circular>
          </v-col>
          <v-col md="4">
            <v-progress-circular
                :rotate="135"
                size="150"
                :width="15"
                :value="75"
                color="blue darken-1"
            >
              <v-row class="flex-column" justify="center" text-align="center">
                        <span class="text text-center" style="white-space: pre-line;">
                          {{ this.getTextEn("Operational.notPlanned") }} <br/>62
                        </span>
              </v-row>
            </v-progress-circular>
          </v-col>
        </v-row>
      </v-col>
      <v-col md="4">
        <v-row class="pa-3">
          <v-col
              cols="12"
              sm="12"
              lg="12"
              class="pt-0 rounded_corner"
              v-for="(item, key) in statisticData"
              :key="key"
          >
            <operational-basic-statistic
                :heading="item.heading"
                :sub-text="item.subText"
                :avatar="item"
                :title="item.text"
            >
            </operational-basic-statistic>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import OperationalBasicStatistic from "@/components/UI/Widgets/Cards/Statistics/OperationalBasicStatistic";

export default {
  components: {OperationalBasicStatistic},
  methods: {
    getTextEn(myText) {
      return this.$i18n.t(myText)
    }
  },
  data() {
    return {
      statisticData: [
        {
          icon: "mdi-percent",
          style: {},
          avatarStyle: {size: 50, xLarge: true},
          text: this.getTextEn("Operational.thisMonthTax"),
          heading: "610",
          subText: ",16 ₺",
          title: null
        },
        {
          icon: "mdi-repeat",
          style: {},
          avatarStyle: {size: 50},
          text: this.getTextEn("Operational.recurrent"),
          heading: "0",
          title: null
        }
      ],
      name: "Payments",
      title: "Ödemeler",
      series: [62],
      series2: [70],
      series3: [75],
      chartOptions: {
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: '70%',
              background: 'transparent',
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: 'front',
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.12
              }
            },
            track: {
              background: '#000',
              strokeWidth: '75%',
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35
              }
            },
            dataLabels: {
              show: true,
              name: {
                offsetY: -10,
                show: true,
                fontSize: '12px'
              },
              value: {
                formatter: function (val) {
                  return val;
                },
                fontSize: '20px',
                show: true,
              }
            }
          }
        },
        fill: {
          colors: ['#43A047'],
        },
        stroke: {
          lineCap: 'round'
        },
        labels: ['Toplam Ödenecek'],
      },
      chartOptions2: {
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: '70%',
              background: 'transparent',
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: 'front',
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.12
              }
            },
            track: {
              background: '#000',
              strokeWidth: '75%',
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35
              }
            },
            dataLabels: {
              show: true,
              name: {
                offsetY: -10,
                show: true,
                fontSize: '12px'
              },
              value: {
                formatter: function (val) {
                  return val;
                },
                fontSize: '20px',
                show: true,
              }
            }
          }
        },
        fill: {
          colors: ['#ff0000'],
        },
        stroke: {
          lineCap: 'round'
        },
        labels: ['Gecikmiş'],
      },
      chartOptions3: {
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: '70%',
              background: 'transparent',
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: 'front',
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.12
              }
            },
            track: {
              background: '#000',
              strokeWidth: '75%',
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35
              }
            },

            dataLabels: {
              show: true,
              name: {
                offsetY: -10,
                show: true,
                fontSize: '12px'
              },
              value: {
                formatter: function (val) {
                  return val;
                },
                fontSize: '20px',
                show: true,
              }
            }
          }
        },
        fill: {
          colors: ['#55acef'],
        },
        stroke: {
          lineCap: 'round'
        },
        labels: ['Planlanmamış'],
      },
    }
  }
}
</script>

<style scoped>

</style>