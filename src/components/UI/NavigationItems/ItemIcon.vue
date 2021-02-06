<template>
  <v-list-item-icon class="mr-n1 sidebar_icons">
    <v-icon v-if="icon" size="18">{{ icon }}</v-icon>
    <v-avatar size="18" v-else>
      <span class="sidebar_size">{{ title | first2Char }}</span>
    </v-avatar>
  </v-list-item-icon>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: null
    },
    title: {
      title: String,
      required: true
    }
  }
};
</script>
<style scoped>
.sidebar_size{
  font-size: 10px !important;
}
.sidebar_icons{
  height: auto !important;
}
</style>