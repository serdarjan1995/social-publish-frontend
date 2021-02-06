<template v-if="1">
  <form @submit.prevent="submit()" ref="form">
    <v-row class="pa-5">
      <v-col cols="12" md="12">
        <h3>
          <v-icon>mdi-linkedin</v-icon>
          {{ $t('SocialNetwork.linkedin_api_conf') }}
        </h3>
      </v-col>
      <v-col cols="12" md="12">
        <v-alert type="info">
          <strong>{{ $t('SocialNetwork.callback_url') }}:</strong> <a style="color:White"
                                                                      href="https://example.com/linkedin_profiles"
                                                                      target="_blank">https://example.com/linkedin_profiles</a>
          <br><strong>{{ $t('SocialNetwork.linkedin_create_app') }}:</strong> <a style="color:White"
                                                                                 href="https://www.linkedin.com/developers/apps/new"
                                                                                 target="_blank">https://www.linkedin.com/developers/apps/new</a>
        </v-alert>
        <span>{{ $t('SocialNetwork.linkedin_api_id') }}</span>
        <v-text-field :label="$t('SocialNetwork.linkedin_api_id')" v-model="linkedinAPIKey"/>
        <span>{{ $t('SocialNetwork.linkedin_api_secret') }}</span>
        <v-text-field :label="$t('SocialNetwork.linkedin_api_secret')" v-model="linkedinAPISecret"/>

        <h3>
          <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
          {{ $t('SocialNetwork.linkedin_pages') }}
        </h3>

        <v-alert type="info">
          <strong>{{ $t('SocialNetwork.callback_url') }}:</strong> <a style="color:White"
                                                                      href="https://example.com/linkedin_pages"
                                                                      target="_blank">https://example.com/linkedin_pages</a>
        </v-alert>
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
    this.$store.dispatch("linkedin/getLinkedinConfig", {id: this.id});
  },
  computed: {
    linkedinAPIKey: {
      get() {
        return this.$store.state.linkedin.apiKey
      },
      set(val) {
        this.$store.state.linkedin.apiKey = val
      }
    },
    linkedinAPISecret: {
      get() {
        return this.$store.state.linkedin.apiSecret
      },
      set(val) {
        this.$store.state.linkedin.apiSecret = val
      }
    },
  },
  methods: {
    submit() {
      const req = {
        social_network_id: this.id,
        api_key: this.linkedinAPIKey,
        api_secret: this.linkedinAPISecret,
        extra_settings: JSON.stringify(""),
        api_callback_url: 'http://localhost:8080/linkedin_pages'
      }
      this.$store.dispatch("linkedin/updateLinkedinConfig", req);
    }
  }
};
</script>
