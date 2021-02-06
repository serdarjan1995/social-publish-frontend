<template>
  <div class="vuse-content-wrapper">
    <v-container fluid class="">
      <v-row class="neu-glow ma-0" dense>
        <v-card-title>
          <v-icon class="mr-2">{{page_icon}}</v-icon>
          {{ page }}
        </v-card-title>
        <v-spacer/>
        <div v-for="(social_network, i) in social_networks" :key="i" class="socialWrapper"  style="margin: auto">
          <v-btn v-if="social_network.status" large icon @click="change_data(social_network)"
          >
            <v-icon>$vuetify.icons.{{social_network.icon_round}}</v-icon>
          </v-btn>
        </div>
      </v-row>
      <v-row>
        <v-col md="4" sm="12" xs="12">
          <v-sheet color="transparent" class="mt-0 pa-1">
            <private-statistics />
          </v-sheet>
        </v-col>
        <v-col md="8" sm="12" xs="12">
          <v-sheet color="transparent" class="mt-0 pa-1">
            <opponent-analyse />
          </v-sheet>
        </v-col>
        <v-col md="3" sm="12" xs="12">
          <v-sheet color="transparent" class="mt-0 pa-1">
            <comment-like />
          </v-sheet>
        </v-col>
        <v-col md="6" sm="12" xs="12">
          <v-sheet color="transparent" class="mt-0 pa-1">
            <people-types />
          </v-sheet>
        </v-col>
        <v-col md="3" sm="12" xs="12">
          <v-sheet color="transparent" class="mt-0 pa-1">
            <follows-followers />
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import social_networks from "@/data/socialNetworks";
import OpponentAnalyse from "@/views/SocialMedia/Dashboard/comp/OpponentAnalyse";
import FollowsFollowers from "@/views/SocialMedia/Dashboard/comp/FollowsFollowers";
import PeopleTypes from "@/views/SocialMedia/Dashboard/comp/PeopleTypes";
import PrivateStatistics from "@/views/SocialMedia/Dashboard/comp/PrivateStatistics";
import CommentLike from "@/views/SocialMedia/Dashboard/comp/CommentLike";
export default {
  components: {CommentLike, PrivateStatistics, PeopleTypes, FollowsFollowers, OpponentAnalyse},
  methods: {
    change_data(social_network) {
      this.page = social_network.name;
      this.page_icon = social_network.mdi_icon;
    },
  },
  data(){
    return{
      page: "Admin",
      page_icon : null,
      social_networks: social_networks
    }
  }
};

</script>
