<template v-if="1">
  <form @submit.prevent="submit()" ref="form">
    <v-row class="pa-5">
      <v-col cols="12" md="12">
        <h3>
          <v-icon>mdi-instagram</v-icon>
          {{ $t('SocialNetwork.ig') }}
        </h3>
      </v-col>
      <v-col cols="12" md="12">
        <span>{{ $t('SocialNetwork.login_with_instagram') }}</span>
        <v-switch v-model="usernamePassword" class="ma-2"
                  :label="$t('SocialNetwork.user_name_and_password')"></v-switch>
        <v-switch v-model="button" class="ma-2" :label="$t('SocialNetwork.Button')"></v-switch>
        <span>{{ $t('SocialNetwork.get_sms_via_ig') }}</span>
        <v-radio-group v-model="getSecurityCode">
          <v-radio :label="$t('SocialNetwork.sms')" value="sms"></v-radio>
          <v-radio :label="$t('SocialNetwork.email')" value="email"></v-radio>
        </v-radio-group>
        <span>{{ $t('SocialNetwork.FFMPEG_path') }}</span>
        <v-text-field :label="$t('SocialNetwork.enter_FFMPEG_path')" v-model="ffmpegPath" />
        <span>{{ $t('SocialNetwork.FFPROBE_path') }}</span>
        <v-text-field :label="$t('SocialNetwork.enter_FFPROBE_path')" v-model="ffprobePath" />
        <h3>
          <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
          {{ $t('SocialNetwork.login_with_instagram_button') }}
        </h3>
        <v-alert type="info">
          <strong>{{ $t('SocialNetwork.callback_url') }}:</strong> <a style="color:White"
                                                                      href="https://example.com/instagram_profiles"
                                                                      target="_blank">
          https://example.com/instagram_profiles</a>
          <br><strong>{{ $t('SocialNetwork.create_facebook_app') }}:</strong> <a style="color:White"
                                                                                 href="https://developers.facebook.com/apps/"
                                                                                 target="_blank">https://developers.facebook.com/apps/</a>
        </v-alert>
        <v-text-field :label="$t('SocialNetwork.fb_client_id')" v-model="facebookClientID"/>
        <v-text-field :label="$t('SocialNetwork.fb_client_secret')" v-model="facebookClientSecret"/>
        <v-text-field :label="$t('SocialNetwork.fb_app_version')" v-model="facebookAppVersion"/>
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
    this.$store.dispatch("instagram/getInstagramConfig", {id: this.id});
  },
  computed: {
    usernamePassword: {
      get() {
        return this.$store.state.instagram.usernamePassword
      },
      set(val) {
        this.$store.state.instagram.usernamePassword = val
      }
    },
    button: {
      get() {
        return this.$store.state.instagram.button
      },
      set(val) {
        this.$store.state.instagram.button = val
      }
    },
    getSecurityCode: {
      get() {
        return this.$store.state.instagram.getSecurityCode
      },
      set(val) {
        this.$store.state.instagram.getSecurityCode = val
      }
    },
    ffprobePath: {
      get() {
        return this.$store.state.instagram.ffprobePath
      },
      set(val) {
        this.$store.state.instagram.ffprobePath = val
      }
    },
    ffmpegPath: {
      get() {
        return this.$store.state.instagram.ffmpegPath
      },
      set(val) {
        this.$store.state.instagram.ffmpegPath = val
      }
    },
    facebookClientSecret: {
      get() {
        return this.$store.state.instagram.apiSecret
      },
      set(val) {
        this.$store.state.instagram.apiSecret = val
      }
    },
    facebookClientID: {
      get() {
        return this.$store.state.instagram.apiKey
      },
      set(val) {
        this.$store.state.instagram.apiKey = val
      }
    },
    facebookAppVersion: {
      get() {
        return this.$store.state.instagram.appVersion
      },
      set(val) {
        this.$store.state.instagram.appVersion = val
      }
    },
  },
  methods: {
    submit() {
      const req = {
        social_network_id: this.id,
        api_key: this.facebookClientID,
        api_secret: this.facebookClientSecret,
        extra_settings: JSON.stringify({
          app_version: this.facebookAppVersion,
          ffmpegPath: this.ffmpegPath,
          ffprobePath: this.ffprobePath,
          usernamePassword: this.usernamePassword,
          button: this.button,
          getSecurityCode: this.getSecurityCode
        }),
        api_callback_url: 'http://localhost:8080/instagram_profiles'
      }
      this.$store.dispatch("instagram/updateInstaConfig", req);
    }
  }
};
</script>
