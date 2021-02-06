<template v-if="postlist.length">
  <v-navigation-drawer
      hide-overlay
      :value="drawerRight"
      :permanent="$vuetify.breakpoint.mdAndUp"
      enable-resize-watcher
      class="flex-shrink-0 vuse-sidebar-scrollable"
      :stateless="$vuetify.breakpoint.smAndDown"
      v-show="drawerRight"
      :floating="$vuetify.breakpoint.smAndDown"
      :color="$vuetify.breakpoint.mdAndUp ? 'transparent' : ''"
      :absolute="$vuetify.breakpoint.smAndDown"
      mobile-breakpoint
  >
    <div class="vuse-sidenav-wrapper">
      <v-toolbar flat class="transparent">
        <slot/>
        <v-spacer></v-spacer>
        <v-btn
            v-if="$vuetify.breakpoint.smAndDown && drawer"
            icon
            @click="onToggle()"
        >
          <v-icon>chevron_left</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list class="scrollable-content">
        <v-card v-for="(post, index) in postlist" :key="index" class="mt-3">
          <v-list-item class="px-0 ma-0">
            <v-list-item-avatar>
              <v-icon>
                {{post.icon}}
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                <a :href="post.account_url" target="_blank" class="text-decoration-none">
                  {{post.account_name}}
                </a>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-img
              v-if="post.media!=null"
              max-height="150"
              :src="JSON.parse(post.media)[0].url"
          ></v-img>
          <v-img
              v-else
              src="https://static.thenounproject.com/png/340719-200.png"
              max-height="150"
          ></v-img>
          <v-card-text>
            <div>
              <v-icon class="iconClass">mdi-calendar</v-icon>
              <span class="ml-0">{{post.start}}</span>
            </div>
            {{post.description}}
            <div class="mt-2">
              <v-icon class="iconClass">mdi-thumb-up</v-icon>
              <span class="ml-2">{{post.likeCount}}</span>
              <v-icon class="ml-2 iconClass">mdi-comment</v-icon>
              <span class="ml-2">{{post.commentCount}}</span>
              <span class="ml-2 float-right">{{post.shareCount}}</span>
              <v-icon class="ml-2 iconClass float-right" >mdi-eye</v-icon>
            </div>
          </v-card-text>
        </v-card>
      </v-list>
    </div>
  </v-navigation-drawer>
</template>


<script>
import orderBy from "lodash/orderBy";

export default {
  props: {
    drawerRight: {
      type: Boolean,
      default: true,
    },
    items: {
      type: Array,
      default: () => []
    },
    onEdit: {
      type: Function
    },
    onDelete: {
      type: Function
    },
    clicked: Function,
    activeId: {
      type: Number,
      default: 1,
    },
    onToggle: Function
  },
  computed: {
    postlist() {
      return orderBy(this.items, ["id"], ["asc"]);
    }
  },
  components:{
  }
};
</script>
<style scoped>
.transparentBg {
  background-color: rgba(0, 0, 0, 0.35) !important;
}
.iconClass{
  font-size:1rem !important;
  line-height:22px !important;
}
</style>
