<template>
  <v-card class="neu-glow">
    <v-card-title>
      <v-row justify="center" align="center">
        <v-col cols="5">
          <v-progress-circular
              :rotate="135"
              :size="175"
              :width="15"
              :value="progress"
              color="blue lighten-3"
          >
            <v-row class="flex-column" justify="center" text-align="center">
                        <span class="text text-center">
                          % {{ progress }}
                        </span>
              <span class="text-caption text-center" color="blue">
                          <v-icon color="blue">mdi-facebook</v-icon> @bestangelno1
                        </span>
            </v-row>
          </v-progress-circular>
        </v-col>
        <v-col cols="7" v-if="getMyData">
          <v-col cols="12" v-for="(task, i) in getMyData"
                 :key="`task-${task.title}-${i}`">
            <linear-progress-content
                upside
                :value="task.completedPercentage"
                color="secondary"
            >
              <v-col class="pa-0 text-caption" align-self="start" cols="6">
                {{ task.title }}
              </v-col>
              <v-col
                  align-self="end"
                  cols="6"
                  class="text-right pa-0 text-caption">
                {{ task.timeline }}
              </v-col>
            </linear-progress-content>
          </v-col>
        </v-col>
      </v-row>
    </v-card-title>
  </v-card>
</template>
<script>
import LinearProgressContent from "@/components/UI/ProgressBar/LinearProgressContent";

export default {
  components: {LinearProgressContent},
  methods: {
    getTextEn(myText) {
      return this.$i18n.t('' + myText + '')
    }
  },
  computed: {
    getMyData() {
      let ongoingTasks = [
        {
          title: this.getTextEn("Analytical.comments"),
          timeline: "540 " + this.getTextEn("Analytical.comments"),
          completedPercentage: 80,
        },
        {
          title: this.getTextEn("Analytical.likes"),
          timeline: "1256 " + this.getTextEn("Analytical.likes"),
          completedPercentage: 70,
        },
        {
          title: this.getTextEn("Analytical.shares"),
          timeline: "56 " + this.getTextEn("Analytical.shares"),
          completedPercentage: 86,
        },
      ];
      return ongoingTasks;
    }
  },
  data() {
    return {
      progress: 75,
    };
  },
  beforeDestroy() {
    this.ongoingTasks = null;
    delete this.ongoingTasks;
  },
};
</script>
