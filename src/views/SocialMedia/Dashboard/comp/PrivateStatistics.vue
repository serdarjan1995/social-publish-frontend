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
        <v-row>
          <v-col
              v-for="(item, itemKey) in data.items"
              :key="itemKey">
            <div class="text-caption">
              <span style="font-weight: bold"> {{ item.heading }}</span> <span>{{ item.title }}</span>
            </div>
            <v-progress-linear
                :value="item.value"
                :color="item.color+' accent-3'"
            ></v-progress-linear>
          </v-col>
        </v-row>
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
          title: "Active users",
          showAvatar: false,
          cols: 6,
          showActions: false,
          items: [
            {
              title: "active",
              cols: 12,
              value: 52,
              color: "blue",
              heading: "52"
            }
          ],
        },
        {
          title: "Organisations",
          showAvatar: false,
          cols: 6,
          showActions: false,
          items: [
            {
              title: "Individual",
              cols: 12,
              value: 52,
              color: "blue",
              heading: "8 hours"
            },
            {
              title: "Commerce",
              cols: 12,
              value: 48,
              color: "red",
              heading: "8 hours"
            }
          ],
        }
      ];
    }
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
.rounded_corner {
  border-radius: 10px;
}
</style>