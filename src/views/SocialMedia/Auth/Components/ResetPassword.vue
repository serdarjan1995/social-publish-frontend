<template>
  <v-sheet height="100%" class="neu-glow-inset">
    <v-container class="fill-height justify-center" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="8" lg="6">
          <v-sheet class="neu-glow with-radius">
            <v-card-text class="pa-0">
              <v-row class="ma-0">
                <v-col cols="12" md="6" class="pa-0" v-if="$vuetify.breakpoint.mdAndUp">
                  <v-row align="center" justify="center" class="fill-height">
                    <v-img src="/static/pngegg.png" lazy-src="/static/pngegg.png"
                           class="pa-3 "
                           style="max-width: 65%;"
                           aspect-ratio="1"
                           v-bind:class="classBind"
                           @mouseover="classBind = style_arr[Math.floor(Math.random() * style_arr.length)];"
                           @mouseleave="classBind = 'img3d'"
                    ></v-img>
                  </v-row>
                </v-col>

                <v-col cols="12" md="6" class="px-5 pos-relative">
                  <div class="mt-8 text-center">
                    <div class="display-1 d-flex justify-center align-center">
                      <vuse-logo class="primary--text" size="245"/>
                    </div>
                    <div class="subtitle-1">Reset Password</div>
                    <br/>
                  </div>

                  <v-sheet max-width="380" class="mx-auto" color="transparent">
                    <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="form" class="my-10">

                      <v-text-field :error-messages="fieldErrors('form.password')"
                                    :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="showPwd ? 'text' : 'password'" @input="$v.form.password.$touch()"
                                    @blur="$v.form.password.$touch()"
                                    prepend-inner-icon="lock" v-model="form.password" label="Password"
                                    @click:append="showPwd = !showPwd" solo flat>
                      </v-text-field>

                      <v-text-field type="password" label="Confirm Password" v-model="form.repeatPassword"
                                    :error-messages="fieldErrors('form.repeatPassword')"
                                    @input="$v.form.repeatPassword.$touch()" @blur="$v.form.repeatPassword.$touch()"
                                    prepend-inner-icon="enhanced_encryption" required solo flat>
                      </v-text-field>

                      <v-btn block type="submit" :disabled="$v.$invalid" :loading="loader">
                        Reset Password
                      </v-btn>

                    </v-form>
                  </v-sheet>

                  <v-dialog v-model="isRecovered" persistent max-width="420">
                    <v-card>
                      <v-card-title class="text-h5">
                        Password Changed Successfully!
                      </v-card-title>
                      <v-card-text>
                        Your password has been changed successfully, You can now log in with your new password.
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="goToLogin">
                          Go to Login
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>

                  <v-dialog v-model="isFailed" persistent max-width="420">
                    <v-card>
                      <v-card-title class="text-h5">
                        Can not change password!
                      </v-card-title>
                      <v-card-text>
                        {{ this.$store.state.resetpassword.errorMsg }}.
                        This error is caused by trying to reset your password using an old reset password notification email.
                        Please, request a new reset password notification email by going to login -> forgot password
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="goToLogin">
                          Go to Login
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>


                </v-col>
              </v-row>
            </v-card-text>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>
<script>
import {required, sameAs} from "vuelidate/lib/validators";
import validationMixin from "@/mixins/validationMixin";

const defaultForm = {
  password: "",
};

export default {
  mixins: [validationMixin],
  validations: {
    form: {
      password: {required},
      repeatPassword: {
        required,
        sameAsPassword: sameAs("password")
      }
    }
  },
  validationMessages: {
    form: {
      password: {required: "Password is required field."},
      repeatPassword: {
        sameAsPassword: "Must needs to match with Password"
      }
    }
  },
  data() {
    return {
      sitename: process.env.VUE_APP_NAME,
      errors: null,
      form: Object.assign({}, defaultForm),
      loader: false,
      showPwd: false,
      style_arr: [
          'brightness',
          'contrast',
          'grayscale',
          'huerotate',
          'saturate',
          'sepia',
      ],
      classBind: 'img3d',
    };
  },
  computed: {
    isRecovered: {
      get() {
        return this.$store.state.resetpassword.success
      },
      set(val) {
        this.$store.state.resetpassword.success = val
      }
    },
    isFailed: {
      get() {
        return this.$store.state.resetpassword.fail
      },
      set(val) {
        this.$store.state.resetpassword.fail = val
      }
    }
  },
  methods: {
    submit() {
      const req = {
        email: this.$route.query.email,
        token: this.$route.params.token,
        password: this.form.password,
        password_confirmation: this.form.repeatPassword,
      };
      this.loader = true;
      this.$store.dispatch("resetpassword/resetPasswordRequest", req);
    },
    goToLogin() {
      this.$router.push({
        name: "auth/LoginPage",
      });
    },
  },
};
</script>

<style scoped>
  .blur {filter: blur(4px)drop-shadow(1px 1px 0px #919191)
  drop-shadow(2px 2px 0px #919191)
  drop-shadow(2px 2px 0px #919191)
  drop-shadow(1px 2px 0px #919191)
  drop-shadow(1px 5px 8px rgba(16,16,16,0.2))
  drop-shadow(1px 10px 6px rgba(16,16,16,0.2));}
  .brightness {filter: brightness(250%)drop-shadow(1px 1px 0px #919191)
  drop-shadow(2px 2px 0px #919191)
  drop-shadow(2px 2px 0px #919191)
  drop-shadow(1px 2px 0px #919191)
  drop-shadow(1px 5px 8px rgba(16,16,16,0.2))
  drop-shadow(1px 10px 6px rgba(16,16,16,0.2));}
  .contrast {filter: contrast(180%)drop-shadow(1px 1px 0px #919191)
  drop-shadow(2px 2px 0px #919191)
  drop-shadow(2px 2px 0px #919191)
  drop-shadow(1px 2px 0px #919191)
  drop-shadow(1px 5px 8px rgba(16,16,16,0.2))
  drop-shadow(1px 10px 6px rgba(16,16,16,0.2));}
  .grayscale {filter: grayscale(100%)drop-shadow(1px 1px 0px #919191)
  drop-shadow(2px 2px 0px #919191)
  drop-shadow(2px 2px 0px #919191)
  drop-shadow(1px 2px 0px #919191)
  drop-shadow(1px 5px 8px rgba(16,16,16,0.2))
  drop-shadow(1px 10px 6px rgba(16,16,16,0.2));}
  .huerotate {filter: hue-rotate(180deg)drop-shadow(1px 1px 0px #919191)
  drop-shadow(2px 2px 0px #919191)
  drop-shadow(2px 2px 0px #919191)
  drop-shadow(1px 2px 0px #919191)
  drop-shadow(1px 5px 8px rgba(16,16,16,0.2))
  drop-shadow(1px 10px 6px rgba(16,16,16,0.2));}
  .opacity {filter: opacity(50%)drop-shadow(1px 1px 0px #919191)
  drop-shadow(2px 2px 0px #919191)
  drop-shadow(2px 2px 0px #919191)
  drop-shadow(1px 2px 0px #919191)
  drop-shadow(1px 5px 8px rgba(16,16,16,0.2))
  drop-shadow(1px 10px 6px rgba(16,16,16,0.2));}
  .saturate {filter: saturate(7)drop-shadow(1px 1px 0px #919191)
  drop-shadow(2px 2px 0px #919191)
  drop-shadow(2px 2px 0px #919191)
  drop-shadow(1px 2px 0px #919191)
  drop-shadow(1px 5px 8px rgba(16,16,16,0.2))
  drop-shadow(1px 10px 6px rgba(16,16,16,0.2));}
  .sepia {filter: sepia(100%)drop-shadow(1px 1px 0px #919191)
  drop-shadow(2px 2px 0px #919191)
  drop-shadow(2px 2px 0px #919191)
  drop-shadow(1px 2px 0px #919191)
  drop-shadow(1px 5px 8px rgba(16,16,16,0.2))
  drop-shadow(1px 10px 6px rgba(16,16,16,0.2));}
  .contrast {filter: contrast(180%)drop-shadow(1px 1px 0px #919191)
  drop-shadow(2px 2px 0px #919191)
  drop-shadow(2px 2px 0px #919191)
  drop-shadow(1px 2px 0px #919191)
  drop-shadow(1px 5px 8px rgba(16,16,16,0.2))
  drop-shadow(1px 10px 6px rgba(16,16,16,0.2));}
  .img3d{
    filter: drop-shadow(1px 1px 0px #919191)
    drop-shadow(2px 2px 0px #919191)
    drop-shadow(2px 2px 0px #919191)
    drop-shadow(1px 2px 0px #919191)
    drop-shadow(1px 5px 8px rgba(16,16,16,0.2))
    drop-shadow(1px 10px 6px rgba(16,16,16,0.2))
  }
</style>