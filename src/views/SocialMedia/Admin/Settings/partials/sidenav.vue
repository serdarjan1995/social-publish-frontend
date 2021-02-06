<template>
  <v-navigation-drawer
    hide-overlay
    :value="drawer"
    :permanent="$vuetify.breakpoint.mdAndUp"
    enable-resize-watcher
    :temporary="$vuetify.breakpoint.smAndDown"
    class="flex-shrink-0 vuse-sidebar-scrollable"
    :stateless="$vuetify.breakpoint.smAndDown"
    v-show="drawer"
    :color="$vuetify.breakpoint.mdAndUp ? 'transparent' : ''"
    :absolute="$vuetify.breakpoint.smAndDown"
    mobile-breakpoint
  >
    <div class="vuse-sidenav-wrapper">
      <v-toolbar flat class="transparent">
        <v-text-field
                :value="search"
                :label="$t('GeneralSettings.search')"
                solo
                clear-icon="clear_all"
                :append-icon="$vuetify.breakpoint.smAndDown ? 'close' : ''"
                prepend-inner-icon="search"
                class="input-width-3x mr-3"
                dense
                @input="$emit('onSearch', $event)"
                @click:append="handleSearchVisibility()"
                hide-details
                clearable=""
                v-if="isSearchVisible"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn
          icon
          v-if="$vuetify.breakpoint.smAndDown && drawer"
          @click="onToggle()"
        >
          <v-icon color="grey lighten-1">chevron_left</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list dense rounded class="scrollable-content">
        <template v-for="(item, index) in items">
          <v-list-item
            :key="`${index}-menuitems`"
            @click="itemClicked(item)"
            :class="[item.slug === activeItem ? 'neu-glow-inset-primary' : '']"
          >
            <v-list-item-avatar class="my-0">
              <v-avatar size="40">
                <v-icon>{{item.icon}}</v-icon>
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { authUser } from "@/data/dummyData";
export default {
  props: {
    drawer: {
      type: Boolean,
      default: true,
    },
    items: {
      type: Array,
      default: () => [],
    },
    search: {
      type: String,
      default: null,
    },
    itemClicked: Function,
    activeItem: {
      type: String,
      default: "all",
    },
    onToggle: Function,
  },
  computed: {
    isSearchVisible: {
      get () {
        return !this.$vuetify.breakpoint.smAndDown || this.showSearch
      },
      set (val) {
        this.showSearch = val;
      }
    },
    hideBtnWhileSearch () {
      return this.$vuetify.breakpoint.smAndDown && this.showSearch
    }
  },
  methods: {
    handleSearchVisibility () {
      this.showSearch = !this.showSearch;
    }
  },
  data() {
    return {
      authUser,
      showSearch: false,
    };
  },
};
</script>
