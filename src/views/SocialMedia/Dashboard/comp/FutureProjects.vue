<template>
  <v-card class="neu-glow">
    <v-card-title class="mt-0 pt-0 mb-0 pb-0">
      <v-row class="mx-0" align="center" justify="space-between">
        <v-card-title class="text-subtitle-1 pa-0">{{ this.getTextEn("Analytical.upcomingProjects") }}</v-card-title>
      </v-row>
    </v-card-title>
    <v-row justify="center" style="mx-0 pt-0 mt-0">
      <v-col cols="8" style="mx-0 pt-0 mt-0">
        <pie-chart
            :data="getMyData"
            :options="getMyTitle"
            :height="200"
        >
        </pie-chart>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col md="4" sm="12" xs="12">
        <span class="text-body-2">{{ this.getTextEn("Analytical.newTickets") }}</span><br/>
        <span class="text-h6">29</span>
      </v-col>
      <v-col md="4" sm="12" xs="12">
        <span class="text-body-2">{{ this.getTextEn("Analytical.openedTickets") }}</span><br/>
        <span class="text-h6">63</span>
      </v-col>
      <v-col md="4" sm="12" xs="12">
        <span class="text-body-2">{{ this.getTextEn("Analytical.responseTime") }}</span><br/>
        <span class="text-h6">1d</span>
      </v-col>
    </v-row>
    <v-card title="Support Tracker" class="neu-glow">
      <v-card-text>
        <v-sheet class=" py-3 neu-glow rounded">
          <v-row class="mx-0" v-if="getOngoingTasks">
            <v-col
                cols="6"
                v-for="(task, i) in getOngoingTasks"
                :key="`task-${i}`"
            >
              <linear-progress-content
                  upside
                  :value="task.completedPercentage"
                  :color="task.color"
                  class="mt-4"
              >
                <v-col class="pa-0 text-caption" align-self="start" cols="8">
                  {{ task.title }}
                </v-col>
                <v-col
                    align-self="end"
                    cols="4"
                    class="text-right pa-0 text-caption"
                >
                  {{ task.timeline }}
                </v-col>
              </linear-progress-content>
            </v-col>
          </v-row>
        </v-sheet>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script>
import LinearProgressContent from "@/components/UI/ProgressBar/LinearProgressContent";
import colors from "vuetify/lib/util/colors";
import PieChart from "@/components/ChartJS/PieChart";

export default {
  components: {PieChart, LinearProgressContent},
  methods: {
    getTextEn(myText) {
      return this.$i18n.t('' + myText + '')
    }
  },
  computed: {
    getOngoingTasks() {
      let ongoingTasks = [
        {
          title: this.getTextEn("Analytical.pastFollowersCount"),
          timeline: "540 " + this.getTextEn("Analytical.comments"),
          completedPercentage: 80,
          color: "primary"
        },
        {
          title: this.getTextEn("Analytical.targetFollowerCount"),
          timeline: "1256 " + this.getTextEn("Analytical.likes"),
          completedPercentage: 70,
          color: "secondary"
        },
        {
          title: this.getTextEn("Analytical.followerGainTime"),
          timeline: "56 " + this.getTextEn("Analytical.shares"),
          completedPercentage: 86,
          color: "primary"
        },
        {
          title: this.getTextEn("Analytical.remainingTimeToIncreaseProfile"),
          timeline: "56 " + this.getTextEn("Analytical.shares"),
          completedPercentage: 86,
          color: "primary"
        },
      ];
      return ongoingTasks;
    },
    getMyData() {
      let myData = {
        labels: [this.getTextEn("Analytical.successRate")],
        datasets: [
          {
            gradientFill: [
              [colors.green.lighten3, colors.green.accent3]
            ],
            data: [50]
          }
        ]
      };
      return myData;
    },
    getMyTitle() {
      let myData = {
        responsive: true,
        maintainAspectRatio: false,
        cutoutPercentage: 70,
        rotation: (0.5 + (1 - 0.83)) * Math.PI,
        circumference: 2 * 0.83 * Math.PI,
        legend: {
          display: false
        },
        title: {
          display: true,
          position: "bottom",
          text: this.getTextEn("Analytical.successRate") + " 83%"
        }
      };
      return myData;
    }
  },
  data() {
    return {};
  }
};
</script>