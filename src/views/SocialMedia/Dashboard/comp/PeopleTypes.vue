<template>
  <v-card class="neu-glow">
    <v-card-title class="mt-0 pt-0">
      <v-row class="mx-0" align="center" justify="space-between">
        <v-card-title class="text-subtitle-1 pa-0">{{ }}</v-card-title>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col xs="12" sm="12"
            md="6">
          <div class="tab-content">
            <ul class="nav nav-tabs nav-justified" style="padding:0px !important;">
              <li class="nav-item mr-1">
                <a class="nav-link" :class="{ 'active': isActive('country', '0') }"
                   @click.prevent="setActive('country', '0')">Country</a>
              </li>
              <li class="nav-item mx-1">
                <a class="nav-link" :class="{ 'active': isActive('city', '0') }"
                   @click.prevent="setActive('city', '0')">City</a>
              </li>
            </ul>
          </div>
          <div class="tab-content " id="myTabContent">
            <div class="tab-pane fade" id="country" v-if="this.activeItem=='country'">
              <horizontal-bar-chart
                  :data="getCountryData"
                  :options="getCountryOption"
                  key="country"
                  style="width:100% !important"
              />
            </div>
            <div class="tab-pane fade" id="city" v-if="this.activeItem=='city'">
              <horizontal-bar-chart
                  :data="getCountryData2"
                  :options="getCountryOption2"
                  key="city"
                  style="width:100% !important"
              />
            </div>
          </div>
        </v-col>
        <v-col xs="12" sm="12"
            md="6">
          <span>Kitle Türü</span>
          <doughnut-chart
              :data="getDoughnutData"
              :options="getDoughnutOption"
              style="max-height:200px !important;margin-top:0px !important"
          />
        </v-col>
        <v-col xs="12" sm="12"
            md="12">

          <div class="tab-content">
            <ul class="nav nav-tabs nav-justified" style="padding:0px !important;">
              <li class="nav-item mr-1">
                <a class="nav-link" :class="{ 'active': isActive('age', '1') }" @click.prevent="setActive('age', '1')">Yaş
                  Grubu</a>
              </li>
              <li class="nav-item mx-1">
                <a class="nav-link" :class="{ 'active': isActive('ethnicity', '1') }"
                   @click.prevent="setActive('ethnicity', '1')">Etnik Köken</a>
              </li>
              <li class="nav-item mx-1">
                <a class="nav-link" :class="{ 'active': isActive('language', '1') }"
                   @click.prevent="setActive('language', '1')">Dil</a>
              </li>
            </ul>
          </div>
          <br/>
          <div class="tab-content pt-2" style="width:100% !important">
            <div class="tab-pane fade" v-if="this.activeBottom=='age'">
              <bar-chart
                  type="bar"
                  :data="getAgeData"
                  :options="getAgeOption"
                  key="age"
                  :height="175"
              />
            </div>
            <div class="tab-pane fade" v-if="this.activeBottom=='ethnicity'">
              <bar-chart
                  type="bar"
                  :data="getAgeData"
                  :options="getAgeOption"
                  key="ethnicity"
                  :height="175"
              />
            </div>
            <div class="tab-pane fade" v-if="this.activeBottom=='language'">
              <bar-chart
                  type="bar"
                  :data="getAgeData"
                  :options="getAgeOption"
                  key="language"
                  :height="175"
              />
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import colors from "vuetify/lib/util/colors";
import HorizontalBarChart from "@/components/ChartJS/HorizontalBarChart";
import BarChart from "@/components/ChartJS/BarChart";
import DoughnutChart from "@/components/ChartJS/DoughnutChart";

export default {
  components: {
    HorizontalBarChart, BarChart, DoughnutChart
  },
  methods: {
    getTextEn(myText) {
      return this.$i18n.t('' + myText + '')
    },
    isActive(menuItem, type) {
      if (type == 0)
        return this.activeItem === menuItem
      else
        return this.activeBottom === menuItem
    },
    setActive(menuItem, type) {
      if (type == 0)
        this.activeItem = menuItem
      else
        this.activeBottom = menuItem
    },
  },
  computed: {
    getFollowers() {
      let followerData = [];
      return followerData;
    },
    getFollows() {
      let followsData = [];
      return followsData;
    },
    getCountryData() {
      let data = {
        labels: ["USA", "UK", "Russia", "French", "Italy", "Spain"],
        datasets: [
          {
            label: "Expense",
            gradientFill: [colors.orange.base, colors.orange.accent4],
            data: [70, 20, 30, 40, 50, 100],
            shadowOffsetX: 2,
            shadowOffsetY: 4,
            shadowBlur: 8,
            shadowColor: "rgba(66, 165, 245, 0.5)",
            categoryPercentage: 0.5,
            barPercentage: 1.5
          }
        ]
      };
      return data;
    },
    getCountryData2() {
      let data = {
        labels: ["Istanbul", "Monaco", "Kars", "Kastamonu", "Ankara", "İzmir"],
        datasets: [
          {
            label: "Expense",
            gradientFill: [colors.orange.base, colors.orange.accent4],
            data: [20, 50, 30, 60, 52, 2],
            shadowOffsetX: 2,
            shadowOffsetY: 4,
            shadowBlur: 8,
            shadowColor: "rgba(66, 165, 245, 0.5)",
            categoryPercentage: 0.5,
            barPercentage: 1.5
          }
        ]
      };
      return data;
    },
    getAgeData() {
      let data = {
        labels: ["13-17", "18-24", "25-34", "35-44", "45-54", "55-64", "64+"],
        datasets: [
          {
            label: "Male",
            gradientFill: [colors.blue.base, colors.blue.accent4],
            data: [10, 30, 50, 20, 32, 21],
            shadowOffsetX: 2,
            shadowOffsetY: 4,
            shadowBlur: 8,
            shadowColor: "rgba(66, 165, 245, 0.5)",
            categoryPercentage: 0.5,
            barPercentage: 1
          },
          {
            label: "Female",
            gradientFill: [colors.pink.base, colors.pink.accent4],
            data: [20, 50, 30, 60, 52, 2],
            shadowOffsetX: 2,
            shadowOffsetY: 4,
            shadowBlur: 8,
            shadowColor: "rgba(66, 165, 245, 0.5)",
            categoryPercentage: 0.5,
            barPercentage: 1
          }
        ]
      };
      return data;
    },
    getCountryOption() {
      let data = {
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
              },
              ticks: {
                beginAtZero: true
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        }
      };
      return data;
    },
    getCountryOption2() {
      let data = {
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
              },
              ticks: {
                beginAtZero: true
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        }
      };
      return data;
    },
    getAgeOption() {
      let data = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        layout: {
          padding: {
            left: 5,
            right: 5,
            bottom: 10
          }
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false
              },
              ticks: {
                beginAtZero: true
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        }
      };
      return data;
    },
    getDoughnutData() {
      let myData = {
        labels: ["Gerçek İnsanlar", "Etiketleyenler", "Toplu Takipçiler", "Şüpheliler"],
        datasets: [
          {
            gradientFill: [
              [colors.purple.accent3, colors.blue.accent3],
              [colors.purple.accent3, colors.teal.accent3],
              [colors.orange.accent3, colors.orange.accent3],
              [colors.red.accent3, colors.amber.accent3]
            ],
            data: [40, 40, 15, 10]
          }
        ]
      };
      return myData;
    },
    getDoughnutOption() {
      let myOption = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true,
          position:"left"
        },
      };
      return myOption;
    }
  },
  data() {
    return {
      activeItem: 'country',
      activeBottom: 'age',
      tab: null,
    };
  }
};
</script>
<style scoped>
.rounded_corner {
  border-radius: 10px;
}

.tab-item {
  padding: 0px !important;
}

.nav {
  list-style-type: none;
}

.nav-item {
  float: left;
}

.tab-content {
  float: left;
  display: block !important;
}
</style>