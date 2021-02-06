<template v-if="1">
  <form @submit.prevent="submit()" ref="form">
    <v-row class="pa-5">
      <v-col cols="12" md="12">
        <h3>
          <v-icon>mdi-pinterest</v-icon>
          {{ $t('SocialNetwork.pinterest_login') }}
        </h3>
      </v-col>
      <v-col cols="12" md="12">
        <span>{{ $t('SocialNetwork.login_with_instagram') }}</span>
        <v-switch v-model="usernamePassword" class="ma-2" :label="$t('SocialNetwork.user_name_and_password')"></v-switch>
        <v-switch v-model="button" class="ma-2" :label="$t('SocialNetwork.Button')"></v-switch>
        <v-switch v-model="pinterestAppLogin" class="ma-2" :label="$t('SocialNetwork.pin_app')"></v-switch>

        <v-alert type="info">
          <strong>{{ $t('SocialNetwork.callback_url') }}:</strong> <a style="color:White"
                                                                      href="https://example.com/pinterest_boards"
                                                                      target="_blank">https://example.com/pinterest_boards</a>
          <br><strong>{{ $t('SocialNetwork.create_pin_app') }}:</strong> <a style="color:White"
                                                                            href="https://developers.pinterest.com/apps/"
                                                                            target="_blank">https://developers.pinterest.com/apps/</a>
        </v-alert>

        <span>{{ $t('SocialNetwork.pin_client_id') }}</span>
        <v-text-field :label="$t('SocialNetwork.pin_client_id')" v-model="pinterestAppID" />
        <span>{{ $t('SocialNetwork.pin_client_secret') }}</span>
        <v-text-field :label="$t('SocialNetwork.pin_client_secret')" v-model="pinterestAppSecret" />

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
    this.$store.dispatch("pinterest/getPinterestConfig", {id: this.id});
  },
  computed:{
    pinterestAppID: {
      get() {
        return this.$store.state.pinterest.apiKey
      },
      set(val) {
        this.$store.state.pinterest.apiKey = val
      }
    },
    pinterestAppSecret: {
      get() {
        return this.$store.state.pinterest.apiSecret
      },
      set(val) {
        this.$store.state.pinterest.apiSecret = val
      }
    },
    usernamePassword: {
      get() {
        return this.$store.state.pinterest.usernamePassword
      },
      set(val) {
        this.$store.state.pinterest.usernamePassword = val
      }
    },
    button: {
      get() {
        return this.$store.state.pinterest.button
      },
      set(val) {
        this.$store.state.pinterest.button = val
      }
    },
    pinterestAppLogin: {
      get() {
        return this.$store.state.pinterest.pinterestAppLogin
      },
      set(val) {
        this.$store.state.pinterest.pinterestAppLogin = val
      }
    },
  },
  methods: {
    submit() {
      const req = {
        social_network_id: this.id,
        api_key: this.pinterestAppID,
        api_secret: this.pinterestAppSecret,
        extra_settings:JSON.stringify({
          pinterestAppLogin: this.pinterestAppLogin,
          usernamePassword: this.usernamePassword,
          button: this.button
        }),
        api_callback_url: 'http://localhost:8080/pinterest_boards'
      }
      this.$store.dispatch("pinterest/updatePinterestConfig", req);
    }
  }
};
</script>
