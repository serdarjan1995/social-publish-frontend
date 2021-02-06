<template>
  <v-card class="neu-glow" img="/static/background.svg">
    <v-card-title class="text-subtitle-1 pb-0">
      <v-row class="mx-0" align="center" justify="space-between">
        <v-card-title class="text-subtitle-1 pa-0">{{ title }}</v-card-title>
      </v-row>
    </v-card-title>
    <v-row class="pa-2 d-flex">
      <v-col>
        <v-card-text class="text-md-h6 pb-1 mb-1 text-center green--text">
          <v-icon color="green" x-large>mdi-download</v-icon>
        </v-card-text>
        <v-card-text class="text-body-1 pt-0 mt-0 text-center green--text">
          Automatic Data Flow
        </v-card-text>
        <v-card-text class="text-body-1 pt-0 mt-0 text-center">
          Access to your banking information any time with less work.
        </v-card-text>
      </v-col>
      <v-col>
        <v-card-text class="text-md-h6 pb-1 mb-1 text-center green--text">
          <v-icon color="green" x-large>mdi-monitor</v-icon>
        </v-card-text>
        <v-card-text class="text-body-1 pt-0 mt-0 text-center green--text">
          All your data in one screen
        </v-card-text>
        <v-card-text class="text-body-1 pt-0 mt-0 text-center">
          All your data will be stored in one screen. You can access them any time.
        </v-card-text>
        <v-card-text class="pt-0 mt-0 text-center">
          <v-btn class="text-center light-green white--text">
            Connect Your Bank Account
          </v-btn>
        </v-card-text>
      </v-col>
      <v-col>
        <v-card-text class="text-md-h6 pb-1 mb-1 text-center green--text">
          <v-icon color="green" x-large>mdi-text-box-check</v-icon>
        </v-card-text>
        <v-card-text class="text-body-1 pt-0 mt-0 text-center green--text">
          Faultless
        </v-card-text>
        <v-card-text class="text-body-1 pt-0 mt-0 text-center">
          Access to your data with high tech solutions without any errors.
        </v-card-text>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="12">
        <v-img src="/static/bankalar.svg"></v-img>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  methods: {
    getTextEn(myText) {
      return this.$i18n.t('' + myText + '')
    }
  },
  data() {
    return {
      name: "Account Connected Banks",
      title: "Bank Accounts",
    }
  }
}
</script>

<style scoped>

</style>