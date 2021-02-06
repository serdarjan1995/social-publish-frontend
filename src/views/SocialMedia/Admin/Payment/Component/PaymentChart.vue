<template>
    <v-container fluid v-if="offChart">
        <line-chart
          :data="data"
          :options="option"
        />
    </v-container>
</template>
<script>
    import colors from "vuetify/lib/util/colors";
    import LineChart from "@/components/ChartJS/LineChart";
    export default {
      props: ['allData', 'chartData'],
      components: {LineChart},
      data() {
        return {
          testData: [2, 3, 6, 25, 35],
          offChart: false,
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
            datasets: []
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
        }
      },
      mounted() {
        console.log("chart mounted")
      },
      beforeUpdate() {
        console.log("chart beforeUpdate")
      },
      beforeDestroy() {
        console.log("chart beforeDestroy")
      },
      updated() {
        console.log("chart updated")
      },
      computed: {
        dataComp(){
          return this.data
        }
      },
      created() {
        this.offChart = this.$store.state["payments/offChartState"]
        this.$store.state["payments/offChartState"] = true;

        console.log("off chart status", this.offChart)
      },
      watch: {
        allData(resp) {

          let yearData = resp.data.years
          let yearDetails = resp.data.statistics

          yearData.find((year) => {
            let yearDet = yearDetails[year]

            let letters = '0123456789ABCDEF';
            let color = '#';
            for (var i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * 16)];
            }

            let newData = {
              label: year,
              fill: false,
              data: [],
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
              gradientStroke: [colors.blue.base, color]
            }

            for (let key in yearDet) {
              newData.data.push(yearDetails[year][key])
            }

            this.data.datasets.push(newData)
            this.chartData.push(newData)
          })

          this.$store.state["payments/offChartData"] = this.data.datasets
          this.offChart = true
        }
      }
    }
</script>