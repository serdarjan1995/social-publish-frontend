<template>
    <v-sheet height="100%" class="neu-glow-inset">
        <v-container class="fill-height justify-center" fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="8" md="7">
                    <v-sheet class="neu-glow with-radius">
                        <v-card-text class="pa-0">
                            <v-row class="ma-0">
                                <v-col
                                        cols="12"
                                        md="6"
                                        class="pa-0"
                                        v-if="$vuetify.breakpoint.mdAndUp"
                                >
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
                                <!-- 2 -->
                                <v-col cols="12" md="6">
                                    <div class="my-8 text-center">
                                        <div class="display-1 d-flex justify-center align-center">
                                            <vuse-logo class="primary--text" size="245" />
                                        </div>
                                        <div class="subtitle-1 mt-3">{{ $t('Login.Welcome') }}</div>
                                    </div>
                                    <v-sheet max-width="380" class="mx-auto" color="transparent">
                                        <v-form
                                                @submit.prevent="$v.$invalid ? null : submit()"
                                                ref="form"
                                        >
                                            <v-text-field
                                                    :error-messages="fieldErrors('form.email')"
                                                    @input="$v.form.email.$touch()"
                                                    @blur="$v.form.email.$touch()"
                                                    prepend-inner-icon="email"
                                                    v-model="form.email"
                                                    :label="$t('Login.Email')"
                                                    solo
                                                    flat
                                            />
                                            <v-text-field
                                                    :error-messages="fieldErrors('form.password')"
                                                    :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                                                    :type="showPwd ? 'text' : 'password'"
                                                    @input="$v.form.password.$touch()"
                                                    @blur="$v.form.password.$touch()"
                                                    prepend-inner-icon="vpn_key"
                                                    v-model="form.password"
                                                    :label="$t('Login.Password')"
                                                    @click:append="showPwd = !showPwd"
                                                    solo
                                                    flat
                                            />
                                            <div class="d-flex flex-no-wrap justify-space-between">
                                                <v-checkbox
                                                        v-model="form.rememberMe"
                                                        :label="$t('Login.RememberMe')"
                                                        class="mt-0"
                                                ></v-checkbox>
                                                <router-link
                                                        to="/auth/forgot"
                                                        class="py-1 no-text-decoration"
                                                >{{ $t('Login.ForgotPassword') }}
                                                </router-link>
                                            </div>
                                            <v-btn block type="submit" :disabled="$v.$invalid"
                                            >{{ $t('Login.SignIn') }}</v-btn
                                            >
                                            <div class="text-center my-5" v-if="isRegisterActive">
                                              {{ $t('Login.DontHaveAccount') }}
                                                <router-link
                                                        to="/auth/signup"
                                                        class="py-1 no-text-decoration"
                                                >{{ $t('Login.CreateAccount') }}
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
    import { required, email, minLength } from "vuelidate/lib/validators"
    import validationMixin from "@/mixins/validationMixin"
    const defaultForm = {
        email: "",
        password: "",
        rememberMe: false,
    };
    export default {
        mixins: [validationMixin],
        validations: {
            form: {
                email: { required, email },
                password: {
                    required,
                    minLength: minLength(6),
                },
            },
        },
        validationMessages: {
            form: {
                email: {
                    required: "Please enter email",
                    email: "Email must be valid",
                },
                password: {
                    required: "Please enter password",
                    minLength: "Password must be of 6 characters",
                },
            },
        },
        data() {
            return {
                form: Object.assign({}, defaultForm),
                showPwd: false,
                sitename:process.env.VUE_APP_NAME,
                isRegisterActive: true,
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

        methods: {
            submit: function() {
                this.$store.dispatch("auth/authRequest", this.form,).then(() => {
                  this.$store.dispatch("rules/getRule")
                      .then(() => {
                        this.$v.$reset();
                        setTimeout(() => {
                          this.$router.push({
                            name: "dashboard/Operational",
                          });
                        }, 1000);
                      })

                    })
            },
            resetForm() {
                this.form = Object.assign({}, defaultForm);
                this.$refs.form.reset();
            }
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