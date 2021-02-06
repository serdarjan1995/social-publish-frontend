<template v-if="1">
  <v-form @submit.prevent="submit()" ref="form">
    <v-row class="pa-5">
      <v-col cols="12" md="12">
        <h3>
          <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
          {{ $t('GeneralSettings.notificationWithBeamer') }}
        </h3>
      </v-col>
      <v-col cols="12" md="12">
        <span>{{ $t('GeneralSettings.status') }}</span>
        <v-radio-group v-model="form.notificationBeamerStatus">
          <v-radio :label="$t('GeneralSettings.enable')" value="true"></v-radio>
          <v-radio :label="$t('GeneralSettings.disable')" value="false"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col cols="12" md="12">
        <v-alert type="info">
          <strong>{{ $t('GeneralSettings.getBeamerProductId') }}:</strong> <a style="color:White"
                                                                              href="https://www.getbeamer.com/"
                                                                              target="_blank">https://www.getbeamer.com/</a><br/>
          <strong>{{ $t('GeneralSettings.beamerRequired') }}:</strong> {{ $t('GeneralSettings.beamerRequiredMessage') }}
        </v-alert>
      </v-col>
      <v-col cols="12" md="12">
        <v-text-field
            :label="$t('GeneralSettings.beamerProductId')" v-model="form.beamerProductID" />
      </v-col>
      <v-col cols="12" md="12">
        <v-btn type="submit" tile color="indigo" dark>
          {{ $t('GeneralSettings.submit') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  data(){
    return{
      form:{
        notificationBeamerStatus: '',
        beamerProductID: '',
      }
    }
  },
  methods:{
    submit() {
      this.$store.dispatch("notifications/updateNotifications", this.form);
    }
  }
};
</script>
