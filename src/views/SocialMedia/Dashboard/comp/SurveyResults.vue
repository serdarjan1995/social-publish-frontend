<template>
  <v-card class="neu-glow">
    <v-card-title class="text-subtitle-1 pb-0">
      <v-row class="mx-0" align="center" justify="space-between">
        <v-card-title class="text-subtitle-1 pa-0">{{ this.getTextEn("Operational.surveyResults") }}</v-card-title>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row class="mx-0" v-if="ongoingTasks">
        <v-col md="12">
          <span class="text-subtitle-2">{{ ask }}</span>
        </v-col>
        <v-col
            cols="12"
            v-for="(task, i) in ongoingTasks"
            :key="`task-${task.title}-${i}`"
        >
          <linear-progress-content
              upside
              :value="task.completedPercentage"
              :color="task.color"
          >
            <v-col class="pa-0 text-caption" align-self="start" cols="6">
              {{ task.title }}
            </v-col>
            <v-col
                align-self="end"
                cols="6"
                class="text-right pa-0 text-caption"
            >
              {{ task.timeline }}
            </v-col>
          </linear-progress-content>
          <v-row class="mt-1">
            <v-col md="12" class="mb-0 pb-0">
              <template v-for="(member, index) in 4">
                <v-avatar size="25" :key="`member-${index}`">
                  <img src="/static/doc-images/lists/ali.jpg" alt="Erkin Tanyeli"/>
                </v-avatar>
              </template>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import LinearProgressContent from "@/components/UI/ProgressBar/LinearProgressContent";

const colors = ["#55acef", "#43A047", "#ff0000"];
export default {
  components: {LinearProgressContent},
  methods: {
    getTextEn(myText) {
      return this.$i18n.t('' + myText + '')
    }
  },
  data(){
    return {
      ask: "Who is the best actor in Marvel Cinematic Universe?",
      ongoingTasks: [
        {
          title: "RDJ",
          timeline: "58%",
          completedPercentage: 58,
          color: colors[0]
        },
        {
          title: "Chris Hemsworth",
          timeline: "16%",
          completedPercentage: 16,
          color: colors[1]
        },
        {
          title: "Mark Ruffalo",
          timeline: "8%",
          completedPercentage: 8,
          color: colors[2]
        },
      ],
    };
  }
};
</script>
