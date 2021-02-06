<template v-if="1">
  <v-row class="pa-5">
    <v-col cols="12" md="12">
      <h3>
        <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
        {{ $t(`GeneralSettings.general`) }}
      </h3>
    </v-col>
    <form @submit.prevent="submit()" ref="form">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="form.title" :label="$t('GeneralSettings.websiteTitle')"/>
          <v-text-field v-model="form.description" :label="$t('GeneralSettings.websiteDescription')"/>
          <v-text-field v-model="form.keyword" :label="$t('GeneralSettings.websiteKeyword')"/>
        </v-col>

        <v-col cols="12" md="6">
          <v-file-input v-model="form.favicon" accept="image/png, image/jpeg, image/bmp, image/ico"
                        prepend-icon="mdi-camera" :label="$t('GeneralSettings.websiteFavicon')"/>
          <v-file-input v-model="form.mark" accept="image/png, image/jpeg, image/bmp, image/ico"
                        prepend-icon="mdi-camera"
                        :label="$t('GeneralSettings.websiteMark')"/>
          <v-file-input v-model="form.logoWhite" accept="image/png, image/jpeg, image/bmp, image/ico"
                        prepend-icon="mdi-camera" :label="$t('GeneralSettings.websiteLogoWhite')"/>
          <v-file-input v-model="form.logoBlack" accept="image/png, image/jpeg, image/bmp, image/ico"
                        prepend-icon="mdi-camera" :label="$t('GeneralSettings.websiteLogoBlack')"/>
        </v-col>

        <v-col cols="12" md="12">
          <h3>
            <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
            {{ $t(`GeneralSettings.formats`) }}
          </h3>
        </v-col>
        <v-col cols="12" md="6">
          <span>{{ $t('GeneralSettings.date') }}</span>
          <v-select v-model="form.dateFormat" :items="dates"/>
        </v-col>
        <v-col cols="12" md="6">
          <span>{{ $t('GeneralSettings.dateTime') }}</span>
          <v-select v-model="form.timeFormat" :items="datetimes"/>
        </v-col>
        <v-col cols="12" md="12">
          <v-btn type="submit" tile color="indigo" dark>
            {{ $t('GeneralSettings.submit') }}
          </v-btn>
        </v-col>
      </v-row>
    </form>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dates: ['d/m/Y', 'd M, Y', 'm/d/Y', 'Y-m-d'],
      datetimes: ['d/m/Y g:i A', 'm/d/Y g:i A', 'd/m/Y H:i', 'm/d/Y H:i', 'Y-m-d g:i A', 'Y-m-d H:i'],
      form: {
        title: '',
        description: '',
        keyword: '',
        mark: [],
        favicon: [],
        logoWhite: [],
        logoBlack: [],
        dateFormat: '',
        timeFormat: '',
      }
    }
  },
  methods: {
    submit() {
      this.$store.dispatch("general/updateGeneralSettings", this.form);
    }
  }
};
</script>
