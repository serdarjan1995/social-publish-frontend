<template>
  <!-- 2 -->
  <v-list-group :group="group">

    <template v-slot:activator>
      <v-list-item-content>

        <v-list-item-title>{{ title }}</v-list-item-title>
      </v-list-item-content>
    </template>

    <v-list-item
        v-for="(subitem, i) in filterList"
        :key="i"
        :to="toBind(subitem)"
        ripple
        :exact="subitem.exact"
    >
      <ItemIcon :icon="subitem.icon" :title="subitem.title"/>
      <v-list-item-title v-text="subitem.title"></v-list-item-title>
      <v-badge inline :content="subitem.badge" v-if="subitem.badge"></v-badge>
    </v-list-item>
  </v-list-group>
</template>

<script>
import ItemIcon from "./ItemIcon";
import {navfilter} from "@/utils/helpers";

export default {
  props: {
    group: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
    },
    toBind: {
      type: Function,
    },
  },
  components: {
    ItemIcon,
  },
  computed: {
    filterList() {
      return this.items.filter((item) => {
        if (typeof item.permission !== 'undefined') {
          if (navfilter(item.permission) !== false) {
            return item
          } else {
            return null
          }
        }
      })
    }
  }
};
</script>
