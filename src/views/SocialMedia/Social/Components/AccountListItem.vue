<template>
  <v-card>
  <v-row>
    <v-img :src="avatar" aspect-ratio="1" v-if="avatar"
           :lazy-src="lazyUrl" class="ml-2 mr-2" :style="'max-width:'+avatar_size+'px'"></v-img>
    <div>
      <v-icon>mdi-rename-box</v-icon>
      <a v-if="link" target="_blank" :href="link"><span class="ml-2">{{name}}</span></a>
      <span v-else class="ml-2">{{name}}</span>
      <div v-if="category">
        <v-icon>mdi-format-list-bulleted-type</v-icon><span class="ml-2">{{category}}</span>
      </div>
      <div v-if="fan_count || fan_count === 0">
        <v-icon>mdi-account-group</v-icon><span class="ml-2">{{fan_count}}</span>
      </div>
    </div>
    <slot name="checkbox"></slot>
  </v-row>
  </v-card>
</template>

<script>
    export default {
        name: "AccountListItem",
        props: {
            id: String,
            avatar: String,
            name: String,
            category: String,
            fan_count: Number,
            link: String,
            avatar_size: {
                type: Number,
                default: 70
            }
        },
        data() {
            return {
                lazyUrl: require("@/assets/post-resources/avatar-person.svg"),
                selectionArray: []
            }
        },
    }
</script>

<style scoped>

</style>