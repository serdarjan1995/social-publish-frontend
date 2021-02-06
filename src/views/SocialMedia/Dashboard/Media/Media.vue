<template>
  <div class="vuse-content-wrapper">
    <v-container fluid class="">
      <v-row class="neu-glow ma-0" dense>
        <v-card-title>
          <v-icon class="mr-2">{{ active_social_icon }}</v-icon>
          {{ active_social_name }}
          {{ $t('AppDrawer.mediaAnalyse') }}
        </v-card-title>
        <v-spacer/>
        <div v-for="(account_group, i) in account_groups" :key="i" class="socialWrapper">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn large icon color="primary" dark v-bind="attrs" v-on="on">
                <v-icon>{{ account_group.social_network[0].icon }} </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(account, index) in account_group.accounts" :key="index" @click="change_data(account_group.social_network[0], account)" >
                <v-list-item-title>{{account.name}}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-row>
      <v-row>
        <v-col md="12">
          <v-sheet color="transparent" class="mt-5 pa-1">
            <two-statistics />
          </v-sheet>
        </v-col>
        <v-col md="12">
          <v-sheet color="transparent" class="mt-5 pa-1">
            <two-statistics />
          </v-sheet>
        </v-col>
        <v-col md="6">
          <v-sheet color="transparent" class="mt-5 pa-1">
            <latest-post />
          </v-sheet>
        </v-col>
        <v-col md="6">
          <v-sheet color="transparent" class="mt-5 pa-1">
            <follower-locations />
          </v-sheet>
          <v-sheet color="transparent" class="mt-5 pa-1 ">
            <interaction />
          </v-sheet>
        </v-col>
        <v-col md="4">
          <most-interacted-accounts/>
        </v-col>
        <v-col md="4">
          <the-best-hashtags/>
        </v-col>
        <v-col md="4">
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import TwoStatistics from "@/views/SocialMedia/Dashboard/comp/TwoStatistics";
import FollowerLocations from "@/views/SocialMedia/Dashboard/comp/FollowerLocations";
import LatestPost from "@/views/SocialMedia/Dashboard/comp/LatestPost";
import Interaction from "@/views/SocialMedia/Dashboard/comp/Interaction";
import MostInteractedAccounts from "@/views/SocialMedia/Dashboard/comp/MostInteractedAccounts";
import TheBestHashtags from "@/views/SocialMedia/Dashboard/comp/TheBestHashtags";
export default {
  components: {
    TheBestHashtags,
    MostInteractedAccounts,
    Interaction,
    LatestPost,
    FollowerLocations,
    TwoStatistics,
  },
  data() {
    return {
      breadcrumbs: [
        {
          text: "Analytical",
          disabled: true,
        },
      ],
      active_social_icon: null,
      active_social_name: null,
      active_social_id: null,
    };
  },
  created() {
    this.$store.dispatch('accounts/getAccountGroup');
  },
  mounted() {},
  computed:{
    account_groups:{
      get() {
        return this.$store.state.accounts.accountList
      },
      set(newValue) {
        this.$store.state.accounts.accountList = newValue
      }
    },
  },
  methods: {
    change_data(social_network, account) {
      console.log("Social Network: ", social_network.id, ". Account: ", account.id);
      this.active_social_name = social_network.name;
      this.active_social_icon = social_network.icon;
      this.active_social_id = social_network.id;

      this.getStatisticalData(this.active_social_id, account.id);
    },

    getStatisticalData(social_media_id, account_id){
      let req;
      switch(social_media_id){
        case 2:
          req = {
            action: 'getStatisticalData',
            account_id: account_id
          }
          this.$store.dispatch('twitter_media_analytics/getStatisticalData', req)
          break;
      }
    },
  },
};
</script>
<style>
.socialWrapper {
  display: table-cell;
  float: right;
}
</style>