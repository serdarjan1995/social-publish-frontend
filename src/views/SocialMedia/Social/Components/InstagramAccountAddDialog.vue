<template>
  <v-row justify="center">
    <v-dialog
        v-model="show"
        width="30%"
        v-bind:contentClass="this.$parent.isDark?'shadowed-box-lightgray':'shadowed-box-black'"
    >
      <v-card>
        <v-toolbar dense>
          <v-icon class="mr-2">mdi-account-group</v-icon>
          <v-toolbar-title>{{ $t('AccountManager.add_instagram_account') }}</v-toolbar-title>
          <v-spacer/>
          <v-btn icon @click="$emit('account-manager-add-instagram-account-close')">
            <v-icon small>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container
            fluid
        >
          <v-img
              :src="instagram_logo"
              class="instagram-logo"
          >

          </v-img>
          <div
              style="width: 80%; margin: 15px auto;"
          >
            <template v-if="instaverify === true">
              <v-text-field
                  v-model="verify_code"
                  :label="$t('AccountManager.add_instagram_verify_code_placeholder')"
                  filled
                  :rules="[v => (valid_verify_code=!!v) || $t('Global.required')]"
                  required
                  dense
              ></v-text-field>
              <v-btn
                  :loading="getLoad"
                  color="primary"
                  class="mr-4 fill-width"
                  :disabled="(!valid_verify_code || getLoad)"
                  @click="login_2fa"
              >
                {{ $t('AccountManager.add_instagram_confirm_code') }}
              </v-btn>
            </template>
            <template v-else>
              <v-text-field
                  v-model="form.username"
                  :label="$t('AccountManager.add_instagram_username_placeholder')"
                  filled
                  :rules="[v => (valid_username=!!v) || $t('Global.required')]"
                  required
                  dense
              ></v-text-field>

              <v-text-field
                  v-model="form.password"
                  :type="showPwd ? 'text' : 'password'"
                  :label="$t('AccountManager.add_instagram_password_placeholder')"
                  :rules="[v => (valid_password=!!v) || $t('Global.required')]"
                  :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPwd = !showPwd"
                  filled
                  dense
                  required
              ></v-text-field>

              <v-btn
                  :loading="getLoad"
                  color="primary"
                  class="mr-4 fill-width"
                  :disabled="(!valid_password || !valid_username || getLoad)"
                  @click="addAccount"
              >
                {{ $t('Global.login') }}
              </v-btn>
            </template>

          </div>
        </v-container>

      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
const defaultForm = {
  username: "",
  password: "",
};
export default {
  name: "InstagramAccountAddDialog",
  data() {
    return {
      loading:false,
      instagram_logo: require("@/assets/post-resources/instagram-logo.png"),
      form: Object.assign({}, defaultForm),
      valid_username: true,
      valid_password: true,
      valid_verify_code:true,
      showPwd: false,
      instaverify:false,
      instatwfa:'',
      verify_code:'',
    }
  },
  props: {
    model: Boolean,
  },
  computed: {
    getLoad(){
      return this.loading
    },
    show: {
      get() {
        return this.model
      },
      set() {
        this.$emit('account-manager-add-instagram-account-close')
      }
    },
  },
  methods: {
    addAccount() {
      //this.loading = true
      this.$store.dispatch('accounts/sendInstagramProfile', this.form)
          .then((res) => {
            this.instaverify = true
            this.loading = false
            this.instatwfa = res.data.twfa
          })
          .catch((e) => {
            this.loading = false
            console.log('loadin iceride',this.loading)
            console.log(e)
          })
    },
    login_2fa(){
      let verifyform = {
        twofa: this.instatwfa,
        security_code: this.verify_code
      }
      this.loading = true
      this.$store.dispatch('accounts/sendInstagramProfileVerify', Object.assign({}, verifyform))
          .then((res) => {
            this.loading = false
            console.log('loadin iceride',this.loading)
            console.log('then_response',res)
          })
          .catch((e) => {
            this.loading = false
            console.log('loadin iceride',this.loading)
            console.log(e.response)
          })
      console.log('verifyform',verifyform)
    }

  },
  created() {

  },
  mounted() {
  }
}
</script>

<style>
.shadowed-box-lightgray {
  box-shadow: 0 0 10px rgb(153, 167, 175) !important;
}

.shadowed-box-black {
  box-shadow: 0 0 10px rgb(36, 41, 43) !important;
}

.instagram-logo {
  width: 50%;
  margin: 0 auto;
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>