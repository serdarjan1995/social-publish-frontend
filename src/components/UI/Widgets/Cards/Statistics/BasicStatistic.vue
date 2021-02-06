<template>
  <v-card :max-width="maxWidth" class="neu-glow" align="center">
    <v-list-item-avatar v-if="hasAvatar" class="mx-auto" align="center"
                        v-bind="avatar.avatarStyle ? avatar.avatarStyle : {}"
    >
      <img :src="avatar.src" v-if="avatar.src" />
      <v-icon
          v-else-if="avatar.icon"
          v-bind="avatar.style ? avatar.style : {}"
          large>{{ avatar.icon }}</v-icon
      >
      <span style="white-space: pre;" v-else>{{ avatar.text }}</span>
    </v-list-item-avatar>
    <v-card-title class="mt-0 pt-0 pb-0 mb-0">
      <v-row class="mx-0 " align="center" justify="space-between">
        <v-card-title class="pa-0 mx-auto">{{ heading }}</v-card-title>
      </v-row>
    </v-card-title>
    <v-card-text class="mt-0 pt-0">
      <v-list-item class="px-0 mt-0 pt-0 mx-auto" style="width:100% !important;">
        <v-list-item-content>
          <v-list-item-title class="text-subtitle-2 mx-auto">{{ title }}</v-list-item-title>
          <v-list-item-subtitle>
            <slot />
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    maxWidth: {
      type: [Number, String],
      default: "",
    },
    title: {
      type: String,
      required: false,
    },
    heading: {
      type: String,
      required: false,
    },
    actions:{
      type: Boolean,
      default: true
    },
    hasAvatar:{
      type: Boolean,
      default: false
    },
    avatar: {
      type: Object,
      default: () => {
        return {
          avatarStyle: null,
        };
      },
    },
  },
};
</script>
