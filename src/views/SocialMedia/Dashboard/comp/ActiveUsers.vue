<template>
  <v-card class="neu-glow">
    <v-card-title class="text-subtitle-1 pb-0">
      <v-row class="mx-0" align="center" justify="space-between">
        <v-card-title class="text-subtitle-1 pa-0">{{ this.getTextEn("Operational.mActiveUsers") }}</v-card-title>
      </v-row>
    </v-card-title>
    <v-card-text justify="center" align="center" style="margin:0 auto">
      <v-progress-circular
          :rotate="135"
          size="200"
          :width="15"
          :value="75"
          color="green darken-1"
      >
        <v-row class="flex-column" justify="center" text-align="center">
          <span class="text text-center">
              {{ this.getTextEn("Operational.mActiveUsers") }}<br/>62
          </span>
        </v-row>
      </v-progress-circular>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  computed: {
    getMyData() {
      let myStatistic =
          {
            icon: "mdi-repeat",
            style: {},
            avatarStyle: {size: 50},
            text: this.getTextEn('Operational.recurrent'),
            heading: "0",
            title: null
          };
      return myStatistic;
    }
  },
  methods: {
    getTextEn(myText) {
      return this.$i18n.t('' + myText + '')
    }
  },
  data() {
    return {
      series: [75],
    }
  }
}
</script>

<style scoped>

</style>