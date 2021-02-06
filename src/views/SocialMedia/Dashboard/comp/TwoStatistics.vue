<template>
  <v-row v-if="getMyData">
    <v-col
        cols="12"
        sm="12"
        lg="4"
        class="pt-0 rounded_corner"
        v-for="(item, i) in getMyData"
        :key="`${item.title}-two-col-${i}`"
    >
      <basic-statistic v-bind="item" :showMore="false"/>
    </v-col>
  </v-row>
</template>
<script>
import BasicStatistic from "@/components/UI/Widgets/Cards/Statistics/BasicStatistic";

export default {
  components: {BasicStatistic},
  methods: {
    getTextEn(myText) {
      return this.$i18n.t('' + myText + '')
    }
  },
  computed: {
    getMyData() {
      let twoColumnarStatsData = [
        {
          avatar: {
            icon: "favorite",
            style: {
              color: "pink accent-3",
            },
            avatarStyle: {class: "neu-glow", size: 40},
          },
          heading: "46K",
          title: "Total Followers",
          hasAvatar : true
        },
        {
          avatar: {
            icon: "favorite",
            style: {
              color: "pink accent-3",
            },
            avatarStyle: {class: "neu-glow", size: 40},
          },
          heading: "46K",
          title: "Follower Evolution",
          hasAvatar : true
        },
        {
          avatar: {
            icon: "favorite",
            style: {
              color: "pink accent-3",
            },
            avatarStyle: {class: "neu-glow", size: 40},
          },
          heading: "46K",
          title: "Follower Evolution Percentage",
          hasAvatar : true
        },
      ];
      return twoColumnarStatsData;
    }
  },
  data() {
    return {};
  },
  beforeDestroy() {
    this.twoColumnarStatsData = null;
    delete this.twoColumnarStatsData;
  },
};
</script>
<style scoped>
.rounded_corner {
  border-radius: 10px;
}
</style>