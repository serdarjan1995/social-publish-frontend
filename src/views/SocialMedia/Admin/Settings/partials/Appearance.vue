<template v-if="1">
  <v-row class="pa-5">
    <v-col cols="12" md="12">
      <h3>
        <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
        {{ $t('GeneralSettings.appearance') }}
      </h3>
    </v-col>
    <form @submit.prevent="submit()" ref="form">
      <v-row>
        <v-col cols="12" md="3">
          <span>{{ $t('GeneralSettings.defaultMenu') }}</span>
          <v-radio-group v-model="form.defaultMenu">
            <v-radio :label="$t('GeneralSettings.hover')" value="hover"></v-radio>
            <v-radio :label="$t('GeneralSettings.fullMenu')" value="full_menu"></v-radio>
          </v-radio-group>
        </v-col>
        <v-col cols="12" md="3">
          <span>{{ $t('GeneralSettings.menuColor') }}</span>
          <v-radio-group v-model="form.menuColor">
            <v-radio :label="$t('GeneralSettings.light')" value="light"></v-radio>
            <v-radio :label="$t('GeneralSettings.dark')" value="dark"></v-radio>
          </v-radio-group>
        </v-col>
        <v-col cols="12" md="3">
          <span>{{ $t('GeneralSettings.colorIcon') }}</span>
          <v-radio-group v-model="form.colorIcon">
            <v-radio :label="$t('GeneralSettings.enable')" value="true"></v-radio>
            <v-radio :label="$t('GeneralSettings.disable')" value="false"></v-radio>
          </v-radio-group>
        </v-col>

        <v-col cols="12" md="3">
          <span>{{ $t('GeneralSettings.enableLandingPage') }}</span>
          <v-radio-group v-model="form.enableLandingPage">
            <v-radio :label="$t('GeneralSettings.enable')" value="true"></v-radio>
            <v-radio :label="$t('GeneralSettings.disable')" value="false"></v-radio>
          </v-radio-group>
        </v-col>

        <v-col cols="12" md="3">
          <span>{{ $t('GeneralSettings.frontendTemplate') }}</span>
          <v-select :items="templates"/>
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
      templates: ['Pure'],
      form: {
        defaultMenu: '',
        menuColor: '',
        colorIcon: '',
        enableLandingPage: '',
      }
    }
  },
  methods: {
    submit() {
      this.$store.dispatch("appearance/updateAppearance", this.form);
    }
  }
};
</script>
