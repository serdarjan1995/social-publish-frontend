<template>
  <v-row class="pa-5">
    <v-col cols="12" md="12">
      <h3>
        <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
        {{ $t('GeneralSettings.others') }}
      </h3>
    </v-col>
    <v-form @submit.prevent="submit()" ref="form">
      <v-row>
        <v-col cols="12" md="12">
          <span>{{ $t('GeneralSettings.enableHttps') }}</span>
          <v-radio-group v-model="form.httpsStatus">
            <v-radio :label="$t('GeneralSettings.enable')" value="true"></v-radio>
            <v-radio :label="$t('GeneralSettings.disable')" value="false"></v-radio>
          </v-radio-group>
          <v-alert dense border="left" type="warning">
            {{ $t('GeneralSettings.othersMessage') }}
          </v-alert>
        </v-col>
        <v-col cols="12" md="12">
          <span>{{ $t('GeneralSettings.embedCode') }}</span>
          <v-textarea v-model="form.embedCode"
                      placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum">
          </v-textarea>
        </v-col>
        <v-col cols="12" md="12">
          <span>{{ $t('GeneralSettings.termsOfServices') }}</span>
        </v-col>
        <v-col cols="12" md="12">
          <span>{{ $t('GeneralSettings.privacyPolicy') }}</span>
        </v-col>
        <v-col cols="12" md="12">
          <v-btn type="submit" tile color="indigo" dark>
            {{ $t('GeneralSettings.submit') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-row>
</template>

<script>

export default {
  data() {
    return {
      form: {
        httpsStatus: '',
        embedCode: '',
      }
    }
  },
  methods: {
    submit() {
      this.$store.dispatch("others/updateOthers", this.form);
    }
  },
};
</script>