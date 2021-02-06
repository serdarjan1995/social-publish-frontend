<template v-if="1">
  <form @submit.prevent="submit()" ref="form">
    <v-row class="pa-5">
      <v-col cols="12" md="12">
        <h3>
          <v-icon>mdi-odnoklassniki</v-icon>
          {{ $t('SocialNetwork.ok_profile') }}
        </h3>
      </v-col>
      <v-col cols="12" md="12">
        <v-alert type="info">
          <strong>{{ $t('SocialNetwork.callback_url') }}:</strong> <a style="color:White"
                                                                      href="https://example.com/ok_profiles"
                                                                      target="_blank">https://example.com/ok_profiles</a><br>
          <strong>{{ $t('SocialNetwork.ok_create_app') }}:</strong> <a style="color:White"
                                                                       href="https://ok.ru/dk?st.cmd=appEditBasic"
                                                                       target="_blank">
          https://ok.ru/dk?st.cmd=appEditBasic</a>
        </v-alert>
        <span>{{ $t('SocialNetwork.ok_client_id') }}</span>
        <v-text-field :label="$t('SocialNetwork.ok_client_id')" v-model="okClientID" />
        <span>{{ $t('SocialNetwork.ok_client_secret') }}</span>
        <v-text-field :label="$t('SocialNetwork.ok_client_secret')" v-model="okClientSecret"/>
        <span>{{ $t('SocialNetwork.ok_app_key') }}</span>
        <v-text-field :label="$t('SocialNetwork.ok_app_key')" v-model="okAppKey"/>

      </v-col>


      <v-col cols="12" md="12">
        <v-btn type="submit" tile color="indigo" dark>
          {{ $t('SocialNetwork.submit') }}
        </v-btn>
      </v-col>
                    console.log(resp)
    </v-row>
  </form>
</template>

<script>
export default {
  props: {
    id: Number,
  },
  created() {
    this.$store.dispatch("odnoklasniki/getOdnoklasnikiConfig", {id: this.id})
  },
  computed:{
    okClientID: {
      get() {
        return this.$store.state.odnoklasniki.apiKey
      },
      set(val) {
        this.$store.state.odnoklasniki.apiKey = val
      }
    },
    okClientSecret: {
      get() {
        return this.$store.state.odnoklasniki.apiSecret
      },
      set(val) {
        this.$store.state.odnoklasniki.apiSecret = val
      }
    },
    okAppKey: {
      get() {
        return this.$store.state.odnoklasniki.okAppKey
      },
      set(val) {
        this.$store.state.odnoklasniki.okAppKey = val
      }
    },
  },
  methods: {
    submit() {
      const req = {
        social_network_id: this.id,
        api_key: this.okClientID,
        api_secret: this.okClientSecret,
        extra_settings:JSON.stringify({
          okAppKey: this.okAppKey
        }),
        api_callback_url: 'http://localhost:8080/ok_profiles'
      }
      this.$store.dispatch("odnoklasniki/updateOdnoklasnikiConfig", req);
    }
  }
};
</script>
