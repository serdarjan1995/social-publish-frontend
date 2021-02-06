<template v-if="1">
  <form @submit.prevent="submit()" ref="form">
    <v-row class="pa-5">
      <v-col cols="12" md="12">
        <h3>
          <v-icon>mdi-alpha-t-circle</v-icon>
          {{ $t('SocialNetwork.tumblr') }}
        </h3>
      </v-col>
      <v-col cols="12" md="12">
        <v-alert type="info">
          <strong>{{ $t('SocialNetwork.callback_url') }}:</strong> <a style="color:White"
                                                                      href="https://example.com/tumblr_profiles"
                                                                      target="_blank">https://example.com/tumblr_profiles</a>
          <br><strong>{{ $t('SocialNetwork.create_tumblr_app') }}:</strong> <a style="color:White"
                                                                               href="https://www.tumblr.com/oauth/register"
                                                                               target="_blank">https://www.tumblr.com/oauth/register</a>
        </v-alert>


        <span>{{ $t('SocialNetwork.tumblr_cons_key') }}</span>
        <v-text-field :label="$t('SocialNetwork.tumblr_cons_key')" v-model="tumblrConsumerKey" />
        <span>{{ $t('SocialNetwork.tumblr_cons_secret') }}</span>
        <v-text-field :label="$t('SocialNetwork.tumblr_cons_secret')" v-model="tumblrConsumerSecret" />

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
    this.$store.dispatch("tumblr/getTumblrConfig", {id: this.id});
  },
  computed:{
    tumblrConsumerKey: {
      get() {
        return this.$store.state.tumblr.apiKey
      },
      set(val) {
        this.$store.state.tumblr.apiKey = val
      }
    },
    tumblrConsumerSecret: {
      get() {
        return this.$store.state.tumblr.apiSecret
      },
      set(val) {
        this.$store.state.tumblr.apiSecret = val
      }
    },
  },
  methods: {
    submit() {
      const req = {
        social_network_id: this.id,
        api_key: this.tumblrConsumerKey,
        api_secret: this.tumblrConsumerSecret,
        extra_settings:JSON.stringify(""),
        api_callback_url: 'http://localhost:8080/tumblr_profiles'
      }
      this.$store.dispatch("tumblr/updateTumblrConfig", req);
    }
  }
};
</script>
