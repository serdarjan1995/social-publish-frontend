<template v-if="1">
  <form @submit.prevent="submit()" ref="form">
    <v-row class="pa-5">
      <v-col cols="12" md="12">
        <h3>
          <v-icon>mdi-twitter</v-icon>
          {{ $t('SocialNetwork.tw') }}
        </h3>
      </v-col>
      <v-col cols="12" md="12">
        <v-alert type="info">
          <strong>{{ $t('SocialNetwork.callback_url') }}:</strong> <a style="color:White"
                                                                      href="https://example.com/twitter_profiles"
                                                                      target="_blank">https://example.com/twitter_profiles</a>
          <br><strong>{{ $t('SocialNetwork.create_tw_app') }}:</strong> <a style="color:White"
                                                                           href="https://developer.twitter.com/en/apps/create"
                                                                           target="_blank">https://developer.twitter.com/en/apps/create</a>
        </v-alert>


        <span>{{ $t('SocialNetwork.twitter_cons_id') }}</span>
        <v-text-field :label="$t('SocialNetwork.twitter_cons_id')" v-model="twitterConsumerID" />
        <span>{{ $t('SocialNetwork.twitter_cons_secret') }}</span>
        <v-text-field :label="$t('SocialNetwork.twitter_cons_secret')" v-model="twitterConsumerSecret" />

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
    this.$store.dispatch("twitter/getTwitterConfig", {id: this.id});
  },
  computed:{
    twitterConsumerID: {
      get() {
        return this.$store.state.twitter.apiKey
      },
      set(val) {
        this.$store.state.twitter.apiKey = val
      }
    },
    twitterConsumerSecret: {
      get() {
        return this.$store.state.twitter.apiSecret
      },
      set(val) {
        this.$store.state.twitter.apiSecret = val
      }
    },
  },
  methods: {
    submit() {
      const req = {
        social_network_id: this.id,
        api_key: this.twitterConsumerID,
        api_secret: this.twitterConsumerSecret,
        extra_settings:JSON.stringify(""),
        api_callback_url: 'http://localhost:8080/twitter'
      }
      this.$store.dispatch("twitter/updateTwitterConfig", req);
    }
  }
};
</script>
