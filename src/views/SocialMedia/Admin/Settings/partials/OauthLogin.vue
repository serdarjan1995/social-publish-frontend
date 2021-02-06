<template v-if="1">
  <form @submit.prevent="submit()" ref="form">
    <v-row class="pa-5">
      <v-col cols="12" md="12">
        <h3>
          <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
          {{ $t('GeneralSettings.signUp') }}
        </h3>
      </v-col>
      <v-col cols="12" md="12">
        <span>{{ $t('GeneralSettings.status') }}</span>
        <v-radio-group v-model="form.signUpStatus">
          <v-radio :label="$t('GeneralSettings.enable')" value="true"></v-radio>
          <v-radio :label="$t('GeneralSettings.disable')" value="false"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col cols="12" md="12">
        <span>{{ $t('GeneralSettings.requireEmailVertification') }}</span>
        <v-radio-group v-model="form.requireVerification">
          <v-radio :label="$t('GeneralSettings.enable')" value="true"></v-radio>
          <v-radio :label="$t('GeneralSettings.disable')" value="false"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col cols="12" md="12">
        <span>{{ $t('GeneralSettings.userCanChangeEmail') }}</span>
        <v-radio-group v-model="form.canChangeEmail">
          <v-radio :label="$t('GeneralSettings.enable')" value="true"></v-radio>
          <v-radio :label="$t('GeneralSettings.disable')" value="false"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col cols="12" md="12">
        <h3>
          <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
          <span>{{ $t('GeneralSettings.googleReCaptcha') }}</span>
        </h3>
      </v-col>
      <v-col cols="12" md="12">
        <span>{{ $t('GeneralSettings.status') }}</span>
        <v-radio-group v-model="form.googleRecaptchaStatus">
          <v-radio :label="$t('GeneralSettings.enable')" value="true"></v-radio>
          <v-radio :label="$t('GeneralSettings.disable')" value="false"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col cols="12" md="12">
        <v-text-field :label="$t('GeneralSettings.googleSiteKey')" v-model="form.googleSiteKey" />
      </v-col>
      <v-col cols="12" md="12">
        <v-text-field :label="$t('GeneralSettings.googleSiteSecretKey')" v-model="form.googleSiteSecret" />
      </v-col>
      <v-col cols="12" md="12">
        <h3>
          <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
          {{ $t('GeneralSettings.fbLogin') }}
        </h3>
      </v-col>
      <v-col cols="12" md="12">
        <v-alert type="info">
          <strong>Callback URL:</strong> <a style="color:White" href="https://example.com/login/facebook"
                                            target="_blank">https://example.com/login/facebook</a>
        </v-alert>
      </v-col>
      <v-col cols="12" md="12">
        <span>{{ $t('GeneralSettings.status') }}</span>
        <v-radio-group v-model="form.facebookLoginStatus">
          <v-radio :label="$t('GeneralSettings.enable')" value="true"></v-radio>
          <v-radio :label="$t('GeneralSettings.disable')" value="false"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col cols="12" md="12">
        <v-text-field :label="$t('GeneralSettings.fbAppId')" v-model="form.facebookAppID" />
      </v-col>
      <v-col cols="12" md="12">
        <v-text-field :label="$t('GeneralSettings.fbAppSecret')" v-model="form.facebookAppSecret" />
      </v-col>
      <v-col cols="12" md="12">
        <v-text-field :label="$t('GeneralSettings.fbAppVersion')" v-model="form.facebookAppVersion" />
      </v-col>
      <v-col cols="12" md="12">
        <h3>
          <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
          {{ $t('GeneralSettings.googleLogin') }}
        </h3>
      </v-col>
      <v-col cols="12" md="12">
        <v-alert type="info">
          <strong>{{ $t('GeneralSettings.callBackUrl') }}:</strong> <a style="color:White"
                                                                       href="https://example.com/login/google"
                                                                       target="_blank">https://example.com/login/google</a><br/>
          <strong>{{ $t('GeneralSettings.createGoogleApp') }}:</strong> <a style="color:White"
                                                                           href="https://console.developers.google.com/projectcreate"
                                                                           target="_blank">https://console.developers.google.com/projectcreate</a>
        </v-alert>
      </v-col>
      <v-col cols="12" md="12">
        <span>{{ $t('GeneralSettings.status') }}</span>
        <v-radio-group v-model="form.googleLoginStatus">
          <v-radio :label="$t('GeneralSettings.enable')" value="true"></v-radio>
          <v-radio :label="$t('GeneralSettings.disable')" value="false"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col cols="12" md="12">
        <v-text-field :label="$t('GeneralSettings.googleClientId')" v-model="form.googleClientID" />
      </v-col>
      <v-col cols="12" md="12">
        <v-text-field :label="$t('GeneralSettings.googleClientSecret')" v-model="form.googleClientSecret" />
      </v-col>
      <v-col cols="12" md="12">
        <h3>
          <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
          {{ $t('GeneralSettings.twitterLogin') }}
        </h3>
      </v-col>
      <v-col cols="12" md="12">
        <v-alert type="info">
          <strong>{{ $t('GeneralSettings.callBackUrl') }}:</strong> <a style="color:White"
                                                                       href="https://example.com/login/twitter"
                                                                       target="_blank">https://example.com/login/twitter</a><br/>
          <strong>{{ $t('GeneralSettings.createGoogleApp') }}:</strong> <a style="color:White"
                                                                           href="https://developer.twitter.com/en/apps/create"
                                                                           target="_blank">https://developer.twitter.com/en/apps/create</a>
        </v-alert>
      </v-col>
      <v-col cols="12" md="12">
        <span>{{ $t('GeneralSettings.status') }}</span>
        <v-radio-group v-model="form.twitterLoginStatus">
          <v-radio :label="$t('GeneralSettings.enable')" value="true"></v-radio>
          <v-radio :label="$t('GeneralSettings.disable')" value="false"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col cols="12" md="12">
        <v-text-field :label="$t('GeneralSettings.twitterConsumerKey')" v-model="form.twitterConsumerKey" />
      </v-col>
      <v-col cols="12" md="12">
        <v-text-field :label="$t('GeneralSettings.twitterConsumerSecret')" v-model="form.twitterConsumerSecret" />
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
  data(){
    return {
      templates: ['Pure'],
      form: {
        signUpStatus: '',
        requireVerification: '',
        canChangeEmail: '',
        googleRecaptchaStatus: '',
        googleSiteKey: '',
        googleSiteSecret: '',
        facebookLoginStatus: '',
        facebookAppID: '',
        facebookAppSecret: '',
        facebookAppVersion: '',
        googleLoginStatus: '',
        googleClientID: '',
        googleClientSecret: '',
        twitterLoginStatus: '',
        twitterConsumerKey: '',
        twitterConsumerSecret: ''
      }
    }
  },
  methods:{
    submit() {
      this.$store.dispatch("oauth_login/updateOAuthLogin", this.form);
    }
  }
};
</script>
