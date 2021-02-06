<template>
  <v-sheet height="100%" class="neu-glow-inset">
    <v-container class="fill-height justify-center" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="7">
          <v-sheet class="neu-glow with-radius">
            <v-card-text class="pa-0">
              <v-row class="ma-0">
                <v-col cols="12" md="6" class="pa-0" v-if="$vuetify.breakpoint.mdAndUp">
                  <v-row align="center" justify="center" class="fill-height">
                    <v-img src="/static/pngegg.png" lazy-src="/static/pngegg.png"
                           class="pa-3 "
                           style="max-width: 65%"
                           aspect-ratio="1"
                           v-bind:class="classBind"
                           @mouseover="classBind = style_arr[Math.floor(Math.random() * style_arr.length)];"
                           @mouseleave="classBind = 'img3d'"
                    ></v-img>
                  </v-row>
                </v-col>

                <v-col cols="12" md="6">
                  <div class="my-8 text-center">
                    <div class="display-1 d-flex justify-center align-center">
                      <vuse-logo class="primary--text" size="245"/>
                    </div>
                    <div class="subtitle-1">{{ $t('Register.CreateAccount') }}</div>
                  </div>

                  <v-sheet max-width="380" class="mx-auto" color="transparent">

                    <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="form">
                      <v-text-field color="purple darken-2" :label="$t('Register.Name')" v-model="form.name" required
                                    :error-messages="fieldErrors('form.name')"
                                    @blur="$v.form.name.$touch()" prepend-inner-icon="person" solo flat>
                      </v-text-field>

                      <v-text-field :error-messages="fieldErrors('form.email')" @input="$v.form.email.$touch()"
                                    @blur="$v.form.email.$touch()"
                                    prepend-inner-icon="email" v-model="form.email" :label="$t('Register.Email')" solo flat>
                      </v-text-field>

                      <v-text-field :error-messages="fieldErrors('form.password')"
                                    :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="showPwd ? 'text' : 'password'" @input="$v.form.password.$touch()"
                                    @blur="$v.form.password.$touch()"
                                    prepend-inner-icon="lock" v-model="form.password" :label="$t('Register.Password')"
                                    @click:append="showPwd = !showPwd" solo flat>
                      </v-text-field>

                      <v-text-field type="password" :label="$t('Register.ConfirmPassword')" v-model="form.password_confirmation"
                                    :error-messages="fieldErrors('form.password_confirmation')"
                                    @input="$v.form.password_confirmation.$touch()"
                                    @blur="$v.form.password_confirmation.$touch()"
                                    prepend-inner-icon="enhanced_encryption" required solo flat>
                      </v-text-field>

                      <v-checkbox color="primary" v-model="form.agreeToPolicy" required>
                        <div slot="label" @click.stop="() => {}">
                          {{ $t('Register.AgreeTo') }}
                          <v-btn-toggle class="transparent blue--text" @click.native.stop="dialog = !dialog">
                            {{ $t('Register.TermsAndPolicy') }}
                          </v-btn-toggle>
                        </div>
                      </v-checkbox>

                      <v-btn block type="submit" :disabled="$v.$invalid">
                        {{ $t('Register.SignUp') }}
                      </v-btn>

                      <v-dialog v-model="resendVerificationDialog" persistent max-width="290">
                        <v-card>
                          <v-card-title class="text-h5">
                            {{ $t('Register.VerificationLinkSent') }}
                          </v-card-title>

                          <v-card-text>
                            {{ $t('Register.ThankYouMessage') }}
                          </v-card-text>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-1" text @click="resendVerification">
                              {{ $t('Register.Resend') }}
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>

                      <div class="text-center my-5">{{ $t('Register.AlreadyHaveAccount') }}
                        <router-link to="/auth/login" class="py-1 no-text-decoration">
                          {{ $t('Register.Login') }}
                        </router-link>
                      </div>


                    </v-form>

                  </v-sheet>

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
// Validations
import {required, email, sameAs, minLength} from "vuelidate/lib/validators";
import validationMixin from "@/mixins/validationMixin";

const defaultForm = {
  name: "",
  email: "",
  password: "",
  agreeToPolicy: false
};

export default {
  components: {},
  mixins: [validationMixin],
  validations: {
    form: {
      name: {required},
      email: {required, email},
      password: {required, minLength: minLength(6)},
      password_confirmation: {
        required,
        sameAsPassword: sameAs("password")
      },
      agreeToPolicy: {required}
    }
  },
  validationMessages: {
    form: {
      name: {
        required: "Name is required."
      },
      email: {
        required: "Please enter email",
        email: "Email must be valid"
      },
      password: {
        required: "Please enter password",
        minLength: "Password must be of 6 characters"
      },
      password_confirmation: {
        sameAsPassword: "Password does not match"
      }
    }
  },
  data() {
    return {
      form: Object.assign({}, defaultForm),
      showPwd: false,
      dialog: false,
      sitename: process.env.VUE_APP_NAME,
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
    resendVerificationDialog: {
      get() {
        return this.$store.state.signup.success
      },
      set(val) {
        this.$store.state.signup.success = val
      }
    }
  },
  methods: {
    submit() {
      this.$store.dispatch("signup/signUpRequest", this.form);
    },
    resetForm() {
      this.form = Object.assign({}, defaultForm);
      this.$refs.form.reset();
    },
    resendVerification() {
      this.$store.dispatch("signup/resendVerification", this.form);
      setTimeout(() => {
        this.resendDialog = true;
      }, 1000);

    }
  }
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