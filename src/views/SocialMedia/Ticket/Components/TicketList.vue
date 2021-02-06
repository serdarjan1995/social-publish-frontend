<template>
  <div class="scrollable-content" ref="conversations">
    <v-card-text>
      <v-slide-y-transition group tag="div" class="row">
        <template v-if="check(chat)">
           <v-col cols="12" v-for="(thread, index) in messData(chat.messages)" :key="index">
             <v-sheet
                 color="transparent"
                 class="d-flex"
                 :class="[ chat.user.pk === getThreadUser(thread.user_id).pk ? 'flex-row-reverse' : 'flex-row']"
             >
               <div>
                 <v-avatar size="40px" color="grey lighten-4">
                   <img
                       :src="getThreadUser(thread.user_id).profile_pic_url"
                       alt="example"/>
                 </v-avatar>
               </div>
               <v-sheet class="mx-3 pa-3"
                        :class="[chat.user.pk === getThreadUser(thread.user_id).pk ? 'rounded' : 'rounded']">
                 <template v-if="thread.item_type === 'media'">
                   <img
                       :src="thread.media.image_versions2.candidates[0].url"
                       alt="example" width="400px"/>
                 </template>
                 <template v-else>
                   <div v-html="thread.text"></div>
                 </template>
                 <div class="text-sm-caption text&#45;&#45;darken-1">
                   {{ new Date(thread.timestamp / 1000).toLocaleString("en-US", {hour12: false}) }}
                 </div>
                 <div v-if="thread.reactions">
                   <v-btn icon color="red" class="floLeft" x-small>
                     <v-icon>mdi-heart-outline</v-icon>
                   </v-btn>
                   <div class="float-right">
                     <div v-for="(like, i) in thread.reactions.likes" :key="i" class="floLeft">
                       <v-avatar size="18px" color="grey lighten-4">
                         <img :src="getThreadUser(like.sender_id).profile_pic_url" alt="example"/>
                       </v-avatar>
                     </div>
                   </div>
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
      type: Object,
      default: () => {
      }
    },
    user: Object,
    timefunc: Function,
  },
  methods: {
    messData(messages) {
      return orderBy(messages, 'timestamp', 'asc')
    },
    check(item) {
      if (item || item.length) {
        return true
      } else {
        return false
      }
    },
    getThreadUser(user_pk) {
      if (user_pk === this.chat.user.pk) {
        return this.chat.user
      } else {
        var users = this.chat.users.filter((user) => {
          return user.pk === user_pk ? user : null
        })
        return users[0]
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