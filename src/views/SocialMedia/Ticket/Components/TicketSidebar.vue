<template>
  <v-navigation-drawer
      hide-overlay
      :value="drawer"
      :permanent="$vuetify.breakpoint.mdAndUp"
      enable-resize-watcher
      class="flex-shrink-0 vuse-sidebar-scrollable"
      width="280"
      :stateless="$vuetify.breakpoint.smAndDown"
      v-show="drawer"
      :floating="$vuetify.breakpoint.smAndDown"
      :color="$vuetify.breakpoint.mdAndUp ? 'transparent' : ''"
      :absolute="$vuetify.breakpoint.smAndDown"
      mobile-breakpoint>
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
      <v-list class="scrollable-content" rounded>
        <v-slide-y-transition group v-if="check(items)">

          <template v-for="(item, index) in items">
            <v-list-item
                @click="clicked(item.id); $emit('thread_id_event',item.id)"
                :key="`member-${index}-${item.index}`"
                :class="[item.id === activeId ? 'neu-glow-inset-primary' : '']"
            >
              <v-list-item-avatar class="unset-overflow">
                <v-avatar size="50">
                  <template v-if="item.users.length === 1">
                    <v-img :src="item.users[0].profile_pic_url"></v-img>
                  </template>
                  <template v-else>
                    <v-img
                        src="https://i.picsum.photos/id/328/100/100.jpg?hmac=P5_NrWitwAoKkJWb8RJbWH2Gznx3jUIcVcLkZgS12Qs"></v-img>
                  </template>
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
                <template v-if="item.users.length === 1">
                  <v-list-item-title>{{ item.users[0].full_name }}</v-list-item-title>
                </template>
                <template v-else>
                  <v-list-item-title>Group</v-list-item-title>
                </template>

                <v-list-item-subtitle>{{ item.message[0].text }}</v-list-item-subtitle>
                <v-list-item-subtitle style="font-size: 10px !important;">{{ timefunc(item.last_activity) }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action v-if="item.new_message !== 0">
                <v-btn icon x-small>
                  <v-icon color="secondary" x-small>mdi-bell</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-slide-y-transition>
        <v-slide-y-transition v-else>
          <v-sheet :color="theme.isDark ? 'darken-2' : 'lighten-4'" class="pa-2 transparent">
            <v-responsive class="mx-auto" v-for="(item,i) in skeleton" :key="i">
              <v-skeleton-loader
                  ref="skeleton"
                  type="list-item-avatar-three-line"
                  :class="`mx-auto`+item"
                  :tile="false"
                  :boilerplate="false"
              ></v-skeleton-loader>
              <div class="mt-1"></div>
            </v-responsive>
          </v-sheet>
        </v-slide-y-transition>
      </v-list>
    </div>
  </v-navigation-drawer>
</template>

<script>
export default {
  inject: ['theme'],
  props: {
    drawer: {
      type: Boolean,
      default: true,
    },
    items: {
      type: Array,
      default: () => [],
    },
    clicked: Function,
    timefunc: Function,
    activeId: {
      type: Number
    },
    onToggle: Function,
  },
  data() {
    return {
      skeleton: 6
    }
  },
  methods: {
    check(val) {
      if (val.length > 0) {
        return true
      } else {
        return false
      }
    }
  }
};
</script>