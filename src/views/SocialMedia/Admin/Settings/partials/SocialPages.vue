<template v-if="1">
  <form @submit.prevent="submit()" ref="form">
    <v-row class="pa-5">
      <v-col cols="12" md="12">
        <h3>
          <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
          {{ $t('GeneralSettings.socialPages') }}
        </h3>
      </v-col>
      <v-col cols="12" sm="12" md="12">
        <v-text-field v-model="form.facebook" :label="$t('GeneralSettings.fb')"/>
        <v-text-field v-model="form.twitter" :label="$t('GeneralSettings.tw')"/>
        <v-text-field v-model="form.instagram" :label="$t('GeneralSettings.ig')"/>
        <v-text-field v-model="form.pinterest" :label="$t('GeneralSettings.pt')"/>
        <v-text-field v-model="form.youtube" :label="$t('GeneralSettings.yt')"/>
      </v-col>

      <v-col cols="12" md="12">
        <v-btn type="submit" tile color="indigo" dark>
          {{ $t('GeneralSettings.submit') }}
        </v-btn>
      </v-col>
    </v-row>
  </form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        facebook: '',
        twitter: '',
        instagram: '',
        pinterest: '',
        youtube: '',
      }
    }
  },
  methods: {
    submit() {
      this.$store.dispatch("social_pages/updateSocialPages", this.form);
    }
  }
};
</script>
