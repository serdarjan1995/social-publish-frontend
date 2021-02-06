<template>
  <v-card class="neu-glow">
    <v-card-title class="text-subtitle-1 pb-0">
      <v-row class="mx-0" align="center" justify="space-between">
        <v-card-title class="text-subtitle-1 pa-0">{{ this.getTextEn("Operational.visitedPages")  }}</v-card-title>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-simple-table>
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">{{ $t("Operational.page")  }}</th>
            <th class="text-left">{{ $t("Operational.viewCount")  }}</th>
            <th class="text-left">{{ $t("Operational.value")  }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in visitedPages" :key="item.id">
            <td>{{ item.page }}</td>
            <td>{{ item.count }}</td>
            <td>{{ item.page_value }}</td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
import {visitedPages} from "@/data/dummyData"

export default {
  methods: {
    getTextEn(myText) {
      return this.$i18n.t('' + myText + '')
    }
  },
  data() {
    return {
      visitedPages
    }
  }
}
</script>

<style scoped>

</style>