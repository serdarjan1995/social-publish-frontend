<template v-if="1">
  <form @submit.prevent="submit()" ref="form">
    <v-row class="pa-5">
      <v-col cols="12" md="12">
        <h3>
          <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
          {{ $t('GeneralSettings.configureProxies') }}
        </h3>
      </v-col>
      <v-col cols="12" md="12">
        <span>{{ $t('GeneralSettings.userCanAddProxies') }}</span>
        <v-radio-group v-model="form.addProxies">
          <v-radio :label="$t('GeneralSettings.enable')" value="true"></v-radio>
          <v-radio :label="$t('GeneralSettings.disable')" value="false"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col cols="12" md="12">
        <span>{{ $t('GeneralSettings.userCanUseSystemProxies') }}</span>
        <v-radio-group v-model="form.useProxies">
          <v-radio :label="$t('GeneralSettings.enable')" value="true"></v-radio>
          <v-radio :label="$t('GeneralSettings.disable')" value="false"></v-radio>
        </v-radio-group>
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
      templates: ['Pure'],
      form:{
        addProxies: '',
        useProxies: '',
      }
    }
  },
  methods: {
    submit(){
      this.$store.dispatch("configure_proxies/updateConfigureProxies", this.form);
    }
  }
};
</script>
