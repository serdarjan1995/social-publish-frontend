<template v-if="1">
  <v-row class="pa-5">
    <v-col cols="12" md="12">
      <h3>
        <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
        {{ $t('GeneralSettings.general') }}
      </h3>
    </v-col>
    <v-form @submit.prevent="submit()" ref="form">
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field v-model="form.mediaPerPage" :label="$t('GeneralSettings.mediasPerPage')"/>
        </v-col>
        <v-col cols="12" md="12">
          <h3>
            <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
            {{ $t('GeneralSettings.designBoldImageEditor') }}
          </h3>
        </v-col>
        <v-col cols="12" md="12">
          <v-alert type="info">
            <strong>{{ $t('GeneralSettings.createDesignLink') }}:</strong> <a style="color:White"
                                                                              href="https://developers.designbold.com/apps/#create"
                                                                              target="_blank">https://developers.designbold.com/apps/#create</a>
          </v-alert>
        </v-col>
        <v-col cols="12" md="12">
          <span>{{ $t('GeneralSettings.status') }}</span>
          <v-radio-group v-model="form.designBoldStatus">
            <v-radio :label="$t('GeneralSettings.enable')" value="true"></v-radio>
            <v-radio :label="$t('GeneralSettings.disable')" value="false"></v-radio>
          </v-radio-group>
        </v-col>
        <v-col cols="12" md="12">
          <span>{{ $t('GeneralSettings.designAppId') }}</span>
          <v-text-field v-model="form.designBoldAppID"/>
        </v-col>
        <v-col cols="12" md="12">
          <h3>
            <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
            {{ $t('GeneralSettings.googleDrive') }}
          </h3>
        </v-col>
        <v-col cols="12" md="12">
          <v-alert type="info">
            <strong>{{ $t('GeneralSettings.createGoogleApp') }}:</strong> <a style="color:White"
                                                                             href="https://console.developers.google.com/projectcreate"
                                                                             target="_blank">https://console.developers.google.com/projectcreate</a>
          </v-alert>
        </v-col>
        <v-col cols="12" md="12">
          <span>{{ $t('GeneralSettings.status') }}</span>
          <v-radio-group v-model="form.googleDriveStatus">
            <v-radio :label="$t('GeneralSettings.enable')" value="true"></v-radio>
            <v-radio :label="$t('GeneralSettings.disable')" value="false"></v-radio>
          </v-radio-group>
        </v-col>
        <v-col cols="12" md="6">
          <span>{{ $t('GeneralSettings.googleApiKey') }}</span>
          <v-text-field v-model="form.googleDriveAPIKey"/>
        </v-col>
        <v-col cols="12" md="6">
          <span>{{ $t('GeneralSettings.googleClientId') }}</span>
          <v-text-field v-model="form.googleDriveClientID"/>
        </v-col>
        <v-col cols="12" md="12">
          <h3>
            <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
            {{ $t('GeneralSettings.dropbox') }}
          </h3>
        </v-col>
        <v-col cols="12" md="12">
          <v-alert type="info">
            <strong>{{ $t('GeneralSettings.createDropboxLink') }}:</strong> <a style="color:White"
                                                                              href="https://www.dropbox.com/developers/apps/create"
                                                                              target="_blank">https://www.dropbox.com/developers/apps/create</a>
          </v-alert>
        </v-col>
        <v-col cols="12" md="12">
          <span>{{ $t('GeneralSettings.status') }}</span>
          <v-radio-group v-model="form.dropBoxStatus">
            <v-radio :label="$t('GeneralSettings.enable')" value="true"></v-radio>
            <v-radio :label="$t('GeneralSettings.disable')" value="false"></v-radio>
          </v-radio-group>
        </v-col>
        <v-col cols="12" md="12">
          <span>{{ $t('GeneralSettings.dropboxApiKey') }}</span>
          <v-text-field v-model="form.dropBoxAPIKey"/>
        </v-col>
        <v-col cols="12" md="12">
          <h3>
            <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
            {{ $t('GeneralSettings.onedrive') }}
          </h3>
        </v-col>
        <v-col cols="12" md="12">
          <v-alert type="info">
            <strong>{{ $t('GeneralSettings.createOnedriveLink') }}:</strong> <a style="color:White"
                                                                                href="https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade"
                                                                                target="_blank">https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade</a>
          </v-alert>
        </v-col>
        <v-col cols="12" md="12">
          <span>{{ $t('GeneralSettings.status') }}</span>
          <v-radio-group v-model="form.oneDriveStatus">
            <v-radio :label="$t('GeneralSettings.enable')" value="true"></v-radio>
            <v-radio :label="$t('GeneralSettings.disable')" value="false"></v-radio>
          </v-radio-group>
        </v-col>
        <v-col cols="12" md="12">
          <span>{{ $t('GeneralSettings.onedriveApiKey') }}</span>
          <v-text-field v-model="form.oneDriveAPIKey"/>
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
        mediaPerPage: '',
        designBoldStatus: '',
        designBoldAppID: '',
        googleDriveStatus: '',
        googleDriveAPIKey: '',
        googleDriveClientID: '',
        dropBoxStatus: '',
        dropBoxAPIKey: '',
        oneDriveStatus: '',
        oneDriveAPIKey: '',
      },
    }
  },
  methods: {
    submit() {
      this.$store.dispatch("file_manager/updateFileManager", this.form);
    }
  }
};
</script>
