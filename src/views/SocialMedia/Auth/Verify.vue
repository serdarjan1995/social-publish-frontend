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
                           style="max-width: 65%;"
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
                      <vuse-logo class="primary--text" size="245"/>
                    </div>
                  </div>

                  <v-row class="ma-0">
                    <v-col cols="12" md="12" sm="12">
                        <div class="display-1 d-flex justify-center align-center text-center">
                          <p v-if="isVerified">{{ $t('Verify.VerifiedMessage') }}</p>
                          <p v-if="!isVerified">{{this.$store.state.signup.verifyErrorMsg}}</p>
                        </div>
                    </v-col>
                  </v-row>

                  <v-row class="ma-0">
                    <v-col cols="12" md="12">
                      <div class="my-8 text-center">
                        <div class="display-1 d-flex justify-center align-center text-center">
                          <v-btn color="primary" @click="goToLogin">
                            {{ $t('Verify.GoToLogin') }}
                          </v-btn>
                        </div>
                      </div>
                    </v-col>
                  </v-row>

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
export default {
  name: "Verify",
  data: () => ({
      style_arr: [
          'brightness',
          'contrast',
          'grayscale',
          'huerotate',
          'saturate',
          'sepia',
      ],
      classBind: 'img3d',
  }),
  created() {
    const req = {
      id: this.$route.params.uuID,
      expires: this.$route.query.expires,
      hash: this.$route.query.hash,
      signature: this.$route.query.signature
    }
    this.$store.dispatch("signup/verify", req);
  },
  computed: {
    isVerified: {
      get() {
        return this.$store.state.signup.verifySuccess
      },
      set(val) {
        this.$store.state.signup.verifySuccess = val
      }
    }
  },
  methods: {
    goToLogin() {
      this.$router.push({
        name: "auth/LoginPage",
      });
    }
  },

}
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