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
                           style="max-width: 65%"
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
                    <div class="subtitle-1">{{ $t('Restore.RecoverAccount') }}</div>
                    <div class="body-2">{{ $t('Restore.ProvideEmailMessage') }}</div>
                    <br/>
                  </div>

                  <v-sheet max-width="380" class="mx-auto" color="transparent">
                    <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="form">
                      <v-text-field :error-messages="fieldErrors('form.email')" @input="$v.form.email.$touch()"
                                    @blur="$v.form.email.$touch()"
                                    prepend-inner-icon="email" v-model="form.email" :label="$t('Restore.Email')" solo flat>
                      </v-text-field>

                      <v-btn block type="submit" :disabled="$v.$invalid">
                        {{ $t('Restore.SendRecoveryEmail') }}
                      </v-btn>


                      <v-dialog v-model="recoveryEmailSentDialog" persistent max-width="290">
                        <v-card>
                          <v-card-title class="text-h5">
                            {{ $t('Restore.RecoveryLinkSent') }}
                          </v-card-title>

                          <v-card-text>{{ $t('Restore.RecoveryLinkMessage') }}</v-card-text>

                        </v-card>
                      </v-dialog>

                    </v-form>
                  </v-sheet>

                  <v-btn icon absolute top right to="/auth/login">
                    <v-icon small>close</v-icon>
                  </v-btn>
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
import {required, email} from "vuelidate/lib/validators";
import validationMixin from "@/mixins/validationMixin";

const defaultForm = {
  email: "",
};

export default {
  mixins: [validationMixin],
  validations: {
    form: {
      email: {required, email},
    }
  },
  validationMessages: {
    form: {
      email: {
        required: "Please enter email",
        email: "Email must be valid"
      }
    }
  },
  data() {
    return {
      form: Object.assign({}, defaultForm),
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
  computed:{
    recoveryEmailSentDialog: {
      get() {
        return this.$store.state.restore.success
      },
      set(val) {
        this.$store.state.signup.success = val
      }
    }
  },
  methods: {
    submit() {
      this.$store.dispatch("restore/restoreRequest", this.form);
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