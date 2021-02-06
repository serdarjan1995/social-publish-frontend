<template v-if="1">
  <form @submit.prevent="submit()" ref="form">
    <v-row class="pa-5">
      <v-col cols="12" md="12">
        <h3>
          <v-icon>mdi-whatsapp</v-icon>
          {{ $t('SocialNetwork.whatsapp_profile') }}
        </h3>
      </v-col>
      <v-col cols="12" md="12">
        <v-alert type="info">
          <!--
          <strong>{{ $t('SocialNetwork.callback_url') }}:</strong> <a style="color:White"
                                                                      href="https://example.com/ok_profiles"
                                                                      target="_blank">https://example.com/ok_profiles</a><br>
          <strong>{{ $t('SocialNetwork.ok_create_app') }}:</strong> <a style="color:White"
                                                                       href="https://ok.ru/dk?st.cmd=appEditBasic"
                                                                       target="_blank">
          https://ok.ru/dk?st.cmd=appEditBasic</a>
          -->
        </v-alert>
        <span>{{ $t('SocialNetwork.whatsapp_api_key') }}</span>
        <v-text-field :label="$t('SocialNetwork.whatsapp_api_key')" v-model="whatsappApiKey" />
        <span>{{ $t('SocialNetwork.whatsapp_secret_key') }}</span>
        <v-text-field :label="$t('SocialNetwork.whatsapp_secret_key')" v-model="whatsappApiSecret"/>
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
    this.$store.dispatch("whatsapp/getWhatsappConfig", {id: this.id})
  },
  computed:{
    whatsappApiKey: {
      get() {
        return this.$store.state.whatsapp.apiKey
      },
      set(val) {
        this.$store.state.whatsapp.apiKey = val
      }
    },
    whatsappApiSecret: {
      get() {
        return this.$store.state.whatsapp.apiSecret
      },
      set(val) {
        this.$store.state.whatsapp.apiSecret = val
      }
    },
  },
  methods: {
    submit() {
      const req = {
        social_network_id: this.id,
        api_key: this.whatsappApiKey,
        api_secret: this.whatsappApiSecret,
        extra_settings:JSON.stringify(""),
        api_callback_url: 'http://localhost:8080/whatsapp'
      }
      this.$store.dispatch("whatsapp/updateWhatsappConfig", req);
    }
  }
};
</script>
