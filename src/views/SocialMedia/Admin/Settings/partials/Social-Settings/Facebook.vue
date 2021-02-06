<template v-if="1">
  <form @submit.prevent="submit()" ref="form">
    <v-row class="pa-5">
      <v-col cols="12" md="12">
        <h3>
          <v-icon>mdi-facebook</v-icon>
          {{ $t('SocialNetwork.fb') }}
        </h3>
      </v-col>
      <v-col cols="12" md="12">
        <v-col cols="12" md="12">
          <h3>
            <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
            {{ $t('SocialNetwork.fb_api_config') }}
          </h3>
        </v-col>
        <v-text-field :label="$t('SocialNetwork.fb_client_id')" v-model="facebookClientID"/>
        <v-text-field :label="$t('SocialNetwork.fb_client_secret')" v-model="facebookClientSecret"/>
        <v-text-field :label="$t('SocialNetwork.fb_app_version')" v-model="facebookAppVersion"/>
      </v-col>

      <v-col cols="12" md="12">
        <v-col cols="12" md="12">
          <h3>
            <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
            {{ $t('SocialNetwork.fb_api_profile') }}
          </h3>
        </v-col>
        <v-col cols="12" md="12">
          <span>{{ $t('SocialNetwork.login_fb_profile') }}</span>
          <v-radio-group v-model="facebookProfile">
            <v-radio :label="$t('SocialNetwork.enable')" value="true"></v-radio>
            <v-radio :label="$t('SocialNetwork.disable')" value="false"></v-radio>
          </v-radio-group>
          <v-alert type="info">
            <strong>{{ $t('SocialNetwork.callback_url') }}:</strong> <a style="color:White"
                                                                        href="https://example.com/facebook_profiles"
                                                                        target="_blank">https://example.com/facebook_profiles</a>
          </v-alert>
          <span>{{ $t('SocialNetwork.permissions') }}</span>
          <v-text-field :label="$t('SocialNetwork.permissions')" v-model="facebookProfilePermissions" />
        </v-col>

        <v-col cols="12" md="12">
          <span>{{ $t('SocialNetwork.login_fb_pages') }}</span>

          <v-alert type="info">
            <strong>{{ $t('SocialNetwork.callback_url') }}:</strong> <a style="color:White"
                                                                        href="https://example.com/facebook_pages"
                                                                        target="_blank">https://example.com/facebook_pages</a>
          </v-alert>
          <span>{{ $t('SocialNetwork.permissions') }}</span>
          <v-text-field :label="$t('SocialNetwork.permissions')" v-model="facebookPagesPermissions" />
        </v-col>

        <v-col cols="12" md="12">
          <span>{{ $t('SocialNetwork.login_fb_groups') }}</span>
          <v-alert type="info">
            <strong>{{ $t('SocialNetwork.callback_url') }}:</strong> <a style="color:White"
                                                                        href="https://example.com/facebook_groups"
                                                                        target="_blank">https://example.com/facebook_groups</a>
          </v-alert>
          <span>{{ $t('SocialNetwork.permissions') }}</span>
          <v-text-field :label="$t('SocialNetwork.permissions')" v-model="facebookGroupsPermissions" />
        </v-col>


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
  data() {
    return {
      templates: ['Pure']
    }
  },
  computed: {
    facebookClientID: {
      get() {
        return this.$store.state.facebook.apiKey
      },
      set(val) {
        this.$store.state.facebook.apiKey = val
      }
    },
    facebookClientSecret: {
      get() {
        return this.$store.state.facebook.apiSecret
      },
      set(val) {
        this.$store.state.facebook.apiSecret = val
      }
    },
    facebookAppVersion: {
      get() {
        return this.$store.state.facebook.appVersion
      },
      set(val) {
        this.$store.state.facebook.appVersion = val
      }
    },
    facebookProfile: {
      get() {
        return this.$store.state.facebook.profile
      },
      set(val) {
        this.$store.state.facebook.profile = val
      }
    },
    facebookProfilePermissions: {
      get() {
        return this.$store.state.facebook.profilePermissions
      },
      set(val) {
        this.$store.state.facebook.profilePermissions = val
      }
    },
    facebookPagesPermissions: {
      get() {
        return this.$store.state.facebook.pagesPermissions
      },
      set(val) {
        this.$store.state.facebook.pagesPermissions = val
      }
    },
    facebookGroupsPermissions: {
      get() {
        return this.$store.state.facebook.groupsPermissions
      },
      set(val) {
        this.$store.state.facebook.groupsPermissions = val
      }
    },
  },
  created() {
    this.$store.dispatch("facebook/getFBConfig", {id: this.id});
  },
  methods: {
    submit() {
      const req = {
        social_network_id: this.id,
        api_key: this.facebookClientID,
        api_secret: this.facebookClientSecret,
        extra_settings: JSON.stringify({
          app_version: this.facebookAppVersion,
          profile: this.facebookProfile,
          profile_permission: this.facebookProfilePermissions,
          pages_permission: this.facebookPagesPermissions,
          groups_permission: this.facebookGroupsPermissions,
        }),
        api_callback_url: 'http://localhost:8080/facebook'
      }

      this.$store.dispatch("facebook/updateFBConfig", req);
    }
  }
}
;
</script>
