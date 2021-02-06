<template>
  <div @mouseover="mouseover = true" @mouseleave="mouseover = false">
  <v-navigation-drawer
      app
      width="250"
      id="app-drawer"
      v-model="drawer"
      enable-resize-watcher
      floating
      mini-variant-width="60"
      class="vuse-sidebar"
      :mini-variant="isMinSideNav"
      :expand-on-hover="isMinSideNav"
      :left="!isSidenavPositionRight"
      :right="isSidenavPositionRight"
      :clipped="isClippedOver"
      :dark="semidark"
      :class="!semidark ? 'neu-glow' : ''"

  >
    <v-list-item
        v-if="!isClippedOver"
        :class="{ 'logo-section': true, 'semi-dark': semidark, 'pa-2': true }"
    >
      <v-list-item-content class="pb-2 pt-0">
        <vuse-logo class="primary--text"
                   size="150"
                   :logoOnly="isMinSideNav?(mouseover?false:isMinSideNav):false"
                   :semi-dark="semidark"/>
      </v-list-item-content>
    </v-list-item>
    <v-sheet color="transparent" :height="!isClippedOver ? 55 : 15"/>
    <v-list
        dense
        v-bind="{ ...activeItemStyle }"
        expand="expand"
        class="nav-drawer transparent"
        id="app-sidebar"
    >
        <template v-for="(item, iac) in Menus">
          <ListGroup v-bind="item" :key="`acc-${iac}`" v-if="item.items"/>
          <v-subheader
              v-else-if="item.header"
              class="heading-text nav-subheader"
              :key="`${iac}-items`"
              :class="{ 'mt-1': iac !== 0 }"
          >
            <v-icon>more_horiz</v-icon>
            <span>
              {{ item.header }}
            </span>
          </v-subheader>
          <NavigationItem v-else-if="item_check(item)" :key="`account-${iac}`" v-bind="item_check(item)"/>
        </template>
      <v-spacer class="mb-5"></v-spacer>
    </v-list>
  </v-navigation-drawer>
</div>
</template>

<script>

import {mapGetters} from "vuex";
import appDrawerItems from "@/config/navitems";
import ListGroup from "@/components/UI/NavigationItems/ListGroup";
import NavigationItem from "@/components/UI/NavigationItems/NavigationItem";
import has from "lodash/has";
import {navfilter} from "@/utils/helpers"
export default {

  data: () => ({
      sitename: process.env.VUE_APP_NAME,
      items: appDrawerItems,
      mouseover: false
  }),
  computed: {
    activeItemStyle: (state) => state.activeMenuStyle,
    ...mapGetters("navigations", [
      "isVisibleSideNav",
      "isMinSideNav",
      "activeItemStyle",
      "isSidenavPositionRight",
      "isClippedOver",
    ]),
    ...mapGetters("scheme", ["semidark"]),
    activemenu() {
      return this.$vuetify.theme.activemenu;
    },
    drawer: {
      get() {
        return this.isVisibleSideNav;
      },
      set(value) {
        this.$store.dispatch("navigations/setSidenavVisibility", value);
      },
    },
    Menus() {
      return this.items.map(this.addLanguagePrefix)
    },
  },
  components: {
    ListGroup,
    NavigationItem,
  },
  methods: {
    addLanguagePrefix(item) {
      const {items, ...props} = item;
      const newVal = has(props, "header") ? {header: this.$t(`AppDrawer.${item.i18n}`)} : {title: this.$t(`AppDrawer.${item.i18n}`)};
      const newItem = { ...props, ...newVal,};

      if (items) {
        newItem.items = items.map(this.addLanguagePrefix);
      }

      return newItem;
    },
    item_check(item){
      if (navfilter(item.permission) !== false){
        return item
      }else{
        return null
      }
    }
  }
};
</script>
