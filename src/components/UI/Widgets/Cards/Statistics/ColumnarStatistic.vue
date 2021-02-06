<template>
  <v-card :max-width="maxWidth" class="neu-glow">
    <v-card-title class="ma-0 pa-0 px-5">
      <v-row class="mx-0" align="center" justify="space-between">
        <v-card-title class="text-caption-1 pa-0">{{ title }}</v-card-title>
        <statistic-actions />
      </v-row>
    </v-card-title>
    <v-card-text class="ma-0 pa-0">
      <v-row align="center" justify="space-between">
        <v-col
          class="text-center"
          :cols="item.cols"
          v-for="(item, i) in items"
          :key="`${item.heading}-col-${i}`"
        >
          <!-- Avatar -->
          <v-avatar
            v-if="item.avatar"
            v-bind="item.avatar.avatarStyle ? item.avatar.avatarStyle : {}"
          >
            <img :src="item.avatar.src" v-if="item.avatar.src" />
            <v-icon
              v-else-if="item.avatar.icon"
              v-bind="item.avatar.style ? item.avatar.style : {}"
              >{{ item.avatar.icon }}</v-icon
            >
            <span class="text-subtitle-1" v-else>{{ item.avatar.text }}</span>
          </v-avatar>
          <!-- Heading -->
          <div class="text-subtitle-1 mt-1">{{ item.heading }}</div>
          <!-- Subheading -->
          <div v-bind="item.subheading.style ? item.subheading.style : {}">
            <v-icon
              small
              v-bind="
                item.subheading.icon.style ? item.subheading.icon.style : {}
              "
              v-if="item.subheading.icon"
              class="ml-2"
              >{{ item.subheading.icon.name }}</v-icon
            >
            <span class="text-caption" v-html="item.subheading.text"></span>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import StatisticActions from "@/components/UI/Widgets/Cards/Statistics/StatisticActions";
export default {
  components: {StatisticActions},
  props: {
    items: {
      type: Array,
      showMore: {
        type: Boolean,
        default: true
      },
      default: () => [
        {
          cols: 12,
          avatarSize: 15,
          avatarIcon: "phone_iphone",
          iconColor: "teal--text text--accent-3",
          info: "Views",
          largeText: "36K",
        },
      ],
    },
    title: {
      type: String,
      required: true,
    },
    maxWidth: {
      type: [Number, String],
      default: "",
    },
  },
};
</script>
