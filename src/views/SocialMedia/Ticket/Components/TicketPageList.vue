<template>
  <div class="scrollable-content" ref="conversations">
    <v-card-text>
      <v-slide-y-transition group tag="div" class="row">
        <template>
          <v-col cols="12" v-for="(thread, index) in messData(chat)" :key="index">
            <v-sheet
                color="transparent"
                class="d-flex"
                :class="[ myUser == thread.user.id ? 'flex-row-reverse' : 'flex-row']"
            >
              <div>
                <v-avatar size="40px" color="grey lighten-4">
                  <img
                      :src="thread.user.avatar"
                      alt="example"/>
                </v-avatar>
              </div>
              <v-sheet class="mx-3 pa-3"
                       :class="[myUser == thread.user.id ? 'rounded' : 'rounded']">
                <template>
                  <div v-html="thread.message"></div>
                </template>
                <div class="text-sm-caption text&#45;&#45;darken-1">
                  {{ new Date(thread.timestamp / 1000).toLocaleString("en-US", {hour12: false}) }}
                </div>
              </v-sheet>


            </v-sheet>
          </v-col>
        </template>
      </v-slide-y-transition>
    </v-card-text>
  </div>
</template>
<script>

import {orderBy} from "lodash";

export default {
  props: {
    chat: {
      type: Array,
      default: () => [],
    },
    user: Number,
  },
  methods: {
    messData(messages) {
      return orderBy(messages, 'timestamp', 'asc')
    }
  },
  computed:{
    myUser:{
      get(){
        return this.user
      },
      set(newValue){
        this.user = newValue
      }
    }
  }
};
</script>
<style scoped>
.floLeft {
  float: left;
  max-width: 18px;
}
</style>