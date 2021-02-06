<template v-if="1">
  <v-form @submit.prevent="submit()" ref="form">
    <v-row class="pa-5">
      <v-col cols="12" md="12">
        <h3>
          <v-icon>mdi-pinterest</v-icon>
          {{ $t('SocialNetwork.reddit') }}
        </h3>
      </v-col>
      <v-col cols="12" md="12">
        <v-alert type="info">
          <strong>{{ $t('SocialNetwork.callback_url') }}:</strong> <a style="color:White"
                                                                      href="https://example.com/reddit_profiles"
                                                                      target="_blank">https://example.com/reddit_profiles</a>
          <br><strong>{{ $t('SocialNetwork.create_reddit_app') }}:</strong> <a style="color:White"
                                                                               href="https://www.reddit.com/prefs/apps"
                                                                               target="_blank">https://www.reddit.com/prefs/apps</a>
        </v-alert>

        <span>{{ $t('SocialNetwork.login_with_instagram') }}</span>
        <v-switch v-model="usernamePassword" class="ma-2" :label="$t('SocialNetwork.user_name_and_password')"></v-switch>
        <v-switch v-model="button" class="ma-2" :label="$t('SocialNetwork.Button')"></v-switch>
        <v-switch v-model="redditAppLogin" class="ma-2" :label="$t('SocialNetwork.pin_app')"></v-switch>


        <span>{{ $t('SocialNetwork.reddit_client_id') }}</span>
        <v-text-field :label="$t('SocialNetwork.reddit_client_id')" v-model="redditClientID" />
        <span>{{ $t('SocialNetwork.reddit_client_secret') }}</span>
        <v-text-field :label="$t('SocialNetwork.reddit_client_secret')" v-model="redditClientSecret" />

      </v-col>


      <v-col cols="12" md="12">
        <v-btn type="submit" tile color="indigo" dark>
          {{ $t('SocialNetwork.submit') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  props: {
    id: Number,
  },
  created() {
    this.$store.dispatch("reddit/getRedditConfig", {id: this.id})
  },
  computed:{
    redditClientID: {
      get() {
        return this.$store.state.reddit.apiKey
      },
      set(val) {
        this.$store.state.reddit.apiKey = val
      }
    },
    redditClientSecret: {
      get() {
        return this.$store.state.reddit.apiSecret
      },
      set(val) {
        this.$store.state.reddit.apiSecret = val
      }
    },
    usernamePassword: {
      get() {
        return this.$store.state.reddit.usernamePassword
      },
      set(val) {
        this.$store.state.reddit.usernamePassword = val
      }
    },
    button: {
      get() {
        return this.$store.state.reddit.button
      },
      set(val) {
        this.$store.state.reddit.button = val
      }
    },
    redditAppLogin: {
      get() {
        return this.$store.state.reddit.RedditAppLogin
      },
      set(val) {
        this.$store.state.reddit.RedditAppLogin = val
      }
    },
  },
  methods: {
    submit() {
      const req = {
        social_network_id: this.id,
        api_key: this.redditClientID,
        api_secret: this.redditClientSecret,
        extra_settings: JSON.stringify({
          usernamePassword: this.usernamePassword,
          button: this.button,
          redditAppLogin: this.redditAppLogin
        }),
        api_callback_url: 'http://localhost:8080/reddit_profiles'
      }
      this.$store.dispatch("reddit/updateRedditConfig", req);
    }
  }
};
</script>
