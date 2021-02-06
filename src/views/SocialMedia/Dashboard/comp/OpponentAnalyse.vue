<template>
  <v-row>
    <v-col
        class="pt-0 rounded_corner"
        style="width:100% !important"
        v-for="(data, index) in getMyData"
        :key="index"
        :md="data.cols"
        sm="12"
        xs="12"
    >
      <basic-statistic
          :actions="data.showActions"
          :has-avatar="data.showAvatar"
          :title="data.title"
          style="width:100% !important; height: 100%"
      >
        <div
            v-for="(item, itemKey) in data.items"
            :key="itemKey">
          <div class="text-caption">
            <span style="font-weight: bold"> {{ item.heading }}</span> <span>{{ item.title }}</span>
          </div>
          <v-progress-linear
              :value="item.value"
              :color="item.color+' accent-3'"
          ></v-progress-linear>
        </div>
      </basic-statistic>
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
      return [
        {
          title: "Interest areas",
          showAvatar: false,
          cols: 3,
          showActions: false,
          items: [
            {
              title: "Design",
              cols: 12,
              value: 52,
              color: "blue",
              heading: "52"
            },
            {
              title: "Modern Culture",
              cols: 12,
              value: 48,
              color: "green",
              heading: "48"
            },
            {
              title: "Theatre",
              cols: 12,
              value: 27,
              color: "red",
              heading: "27"
            }
          ],
        },
        {
          title: "Product",
          showAvatar: false,
          cols: 3,
          showActions: false,
          items: [
            {
              title: "Computer",
              cols: 12,
              value: 52,
              color: "blue",
              heading: "52"
            },
            {
              title: "Web design",
              cols: 12,
              value: 48,
              color: "green",
              heading: "48"
            },
            {
              title: "Mobile app",
              cols: 12,
              value: 27,
              color: "red",
              heading: "27"
            }
          ],
        },
        {
          title: "Posts",
          showAvatar: false,
          cols: 3,
          showActions: false,
          items: [
            {
              title: "Frequency",
              cols: 12,
              value: 52,
              color: "blue",
              heading: "8 hours"
            },
            {
              title: "Count",
              cols: 12,
              value: 48,
              color: "green",
              heading: "48"
            }
          ],
        },
        {
          title: "Follower/Following",
          showAvatar: false,
          cols: 3,
          showActions: false,
          items: [
            {
              title: "Following count",
              cols: 12,
              value: 77,
              color: "blue",
              heading: "46K"
            },
            {
              title: "Follower count",
              cols: 12,
              value: 67,
              color: "green",
              heading: "46K"
            }
          ],
        }
      ];
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