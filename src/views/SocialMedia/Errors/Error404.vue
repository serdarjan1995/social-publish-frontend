<template>
  <v-sheet height="100%" class="neu-glow-inset">
    <v-container class="fill-height justify-center" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="9" md="6">
          <v-sheet class="neu-glow with-radius fill-height" height="100%">
            <v-img
              src="/static/illustator/not_found.png"
              lazy-src="/static/illustator/not_found.png"
              height="250"
              contain
            >
            </v-img>
            <v-row justify="end" class="fill-height">
              <v-col cols="12">
                <h1
                  class="text-center display-4 font-weight-black neu-text-glow"
                >
                  404
                </h1>
              </v-col>
              <v-col class="text-center px-10" cols="12">
                <div class="body-1 mb-5">
                  Sorry but we could not find the page that <br />
                  you are looking for
                </div>
                <v-btn color="secondary" to="/" class="mb-5"
                  >Back To Home</v-btn
                >
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>
