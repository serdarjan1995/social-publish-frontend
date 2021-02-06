<template v-if="1">
  <form @submit.prevent="submit()" ref="form">
    <v-row class="pa-5">
      <v-col cols="12" md="12">
        <h3>
          <v-icon>mdi-google</v-icon>
          {{ $t('SocialNetwork.gmb') }}
        </h3>
      </v-col>
      <v-col cols="12" md="12">
        <v-alert type="info">
          <strong>{{ $t('SocialNetwork.callback_url') }}:</strong> <a style="color:White"
                                                                      href="https://example.com/google_my_business_profiles"
                                                                      target="_blank">https://example.com/google_my_business_profiles</a>
          <br><strong>{{ $t('SocialNetwork.create_google_app') }}:</strong> <a style="color:White"
                                                                               href="https://console.developers.google.com/projectcreate"
                                                                               target="_blank">https://console.developers.google.com/projectcreate</a>
        </v-alert>
        <span>{{ $t('SocialNetwork.gmb_client_id') }}</span>
        <v-text-field :label="$t('SocialNetwork.gmb_client_id')" v-model="googleClientID" />
        <span>{{ $t('SocialNetwork.gmb_client_secret') }}</span>
        <v-text-field :label="$t('SocialNetwork.gmb_client_secret')" v-model="googleClientSecret" />
        <span>{{ $t('SocialNetwork.gmb_app_key') }}</span>
        <v-text-field :label="$t('SocialNetwork.gmb_app_key')" v-model="googleAppKey" />

      </v-col>
      <v-col cols="12" md="12">
        <v-btn type="submit" tile color="indigo" dark>
          {{ $t('SocialNetwork.submit') }}
        </v-btn>
      </v-col>
    </v-row>
  </form>
</template>

<script>
export default {
  props: {
    id: Number,
  },
  created() {
    this.$store.dispatch("google_my_business/getGoogleConfig", {id: this.id})
  },
  computed:{
    googleClientID: {
      get() {
        return this.$store.state.google_my_business.apiKey
      },
      set(val) {
        this.$store.state.google_my_business.apiKey = val
      }
    },
    googleClientSecret: {
      get() {
        return this.$store.state.google_my_business.apiSecret
      },
      set(val) {
        this.$store.state.google_my_business.apiSecret = val
      }
    },
    googleAppKey: {
      get() {
        return this.$store.state.google_my_business.googleAppKey
      },
      set(val) {
        this.$store.state.google_my_business.googleAppKey = val
      }
    },
  },
  methods: {
    submit() {
      const req = {
        social_network_id: this.id,
        api_key: this.googleClientID,
        api_secret: this.googleClientSecret,
        extra_settings:JSON.stringify({googleAppKey: this.googleAppKey}),
        api_callback_url: 'http://localhost:8080/google_my_business_profiles'
      }
      console.log(req)
      this.$store.dispatch("google_my_business/updateFBConfig", req);
    }
  }
};
</script>
