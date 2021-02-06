<template>
  <v-card class="neu-glow">
    <v-card-title class="mt-0 pa-5">
      <v-row class="mx-0" align="center" justify="space-between">
        <v-card-title class="text-caption-1 pa-0">{{ this.getTextEn("Analytical.latestPosts") }}</v-card-title>
      </v-row>
    </v-card-title>
    <v-card-text class="pt-0 mt-0">
      <v-data-table
          :headers="getMyData"
          :items="projects"
          hide-default-footer
          class="transparent"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>
              <v-avatar size="36px">
                <img :src="item.avatar" :alt="item.username"/>
              </v-avatar>
            </td>
            <td>{{ item.name }}</td>
            <td class="text-xs-left">
              <template v-for="(member, index) in item.members">
                <v-avatar size="25" :key="`member-${index}`">
                  <img :src="member.avatar" :alt="member.firstname"/>
                </v-avatar>
              </template>
              <v-avatar color="grey" size="25" v-if="item.membesCount > 3">
                <span class="white--text">+{{ item.membesCount - 3 }}</span>
              </v-avatar>
            </td>
            <td class="text-xs-right text-right">
              <v-btn icon color="grey">
                <v-icon>more_vert</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import {Projects} from "@/data/widgets/project";

export default {

  methods: {
    getTextEn(myText) {
      return this.$i18n.t('' + myText + '')
    }
  },
  data() {
    return {
    };
  },
  computed: {
    projects() {
      return Projects;
    },
    getMyData(){
      let myData = [
        {
          text: "",
          align: "center",
          sortable: false,
          value: "avatar",
          class: "text-caption-2"
        },
        {
          text: this.getTextEn("Analytical.name"),
          align: "left",
          value: "name",
          class: "text-caption-2"
        },
        {text: this.getTextEn("Analytical.members"), value: "members", class: "text-caption-2", sortable: false},
        {text: this.getTextEn("Analytical.action"), value: "action", class: "text-caption-2", align: "right", sortable: false},
      ];
      return myData;
    }
  },
};
</script>
