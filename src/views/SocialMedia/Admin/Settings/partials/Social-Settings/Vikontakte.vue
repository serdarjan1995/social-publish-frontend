<template v-if="1">
  <v-form @submit.prevent="submit()" ref="form">
    <v-row class="pa-5">
      <v-col cols="12" md="12">
        <h3>
          <v-icon>mdi-vk</v-icon>
          {{ $t('SocialNetwork.vk') }}
        </h3>
      </v-col>
      <v-col cols="12" md="12">
        <v-alert type="info">
          <strong>{{ $t('SocialNetwork.create_vk_app') }}:</strong> <a style="color:White"
                                                                       href="https://vk.com/editapp?act=create"
                                                                       target="_blank">https://vk.com/editapp?act=create</a>
        </v-alert>


        <span>{{ $t('SocialNetwork.vk_app_id') }}</span>
        <v-text-field v-model="vkAppID" :label="$t('SocialNetwork.vk_app_id')" />
        <span>{{ $t('SocialNetwork.vk_secure_key') }}</span>
        <v-text-field v-model="vkSecureKey" :label="$t('SocialNetwork.vk_secure_key')" />

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
    this.$store.dispatch("vikontakte/getVikontakteConfig", {id: this.id})
  },
  computed:{
    vkAppID: {
      get() {
        return this.$store.state.vikontakte.apiKey
      },
      set(val) {
        this.$store.state.vikontakte.apiKey = val
      }
    },
    vkSecureKey: {
      get() {
        return this.$store.state.vikontakte.apiSecret
      },
      set(val) {
        this.$store.state.vikontakte.apiSecret = val
      }
    },
  },
  methods: {
    submit() {
      const req = {
        social_network_id: this.id,
        api_key: this.vkAppID,
        api_secret: this.vkSecureKey,
        extra_settings:JSON.stringify(""),
        api_callback_url: 'http://localhost:8080/vk'
      }
      this.$store.dispatch("vikontakte/updateVikontakteConfig", req);
    }
  }
};
</script>
