<template>
    <div class="vuse-content-wrapper">
        <v-container fluid class="">
            <v-row class="neu-glow ma-0" dense>
                    <v-card-title>
                        <v-icon class="mr-2">{{page_icon}}</v-icon>
                        {{ $t('AppDrawer.Analytical') }}
                    </v-card-title>
                    <v-spacer/>
                    <div v-for="(social_network, i) in social_networks" :key="i" class="socialWrapper">
                        <v-btn v-if="social_network.status" large icon @click="change_data(social_network)"
                        >
                            <v-icon>{{social_network.mdi_icon}}</v-icon>
                        </v-btn>
                    </div>
            </v-row>
            <v-row>
                <v-col md="6">
                    <v-sheet color="transparent" class="mt-5 pa-1">
                      <post-analyse/>
                    </v-sheet>
                    <v-sheet color="transparent" class="mt-5 pa-1 neu-glow">
                        <profile-increase />
                    </v-sheet>
                </v-col>
                <v-col md="6">
                    <v-sheet color="transparent" class="mt-5 pa-1">
                      <post-ratio/>
                    </v-sheet>
                  <v-sheet color="transparent" class="mt-5 pa-1">
                    <all-reports/>
                  </v-sheet>
                </v-col>
            </v-row>
            <v-row>
                <user-area/>
            </v-row>
        </v-container>
    </div>
</template>
<script>
    import UserArea from "@/views/SocialMedia/Dashboard/comp/UserArea";
    import PostRatio from "@/views/SocialMedia/Dashboard/comp/PostRatio";
    import PostAnalyse from "@/views/SocialMedia/Dashboard/comp/PostAnalyse";
    import social_networks from "@/data/socialNetworks";
    import ProfileIncrease from "@/views/SocialMedia/Dashboard/comp/ProfileIncrease";
    import AllReports from "@/views/SocialMedia/Dashboard/comp/AllReports";

    export default {
        data() {
            return {
                breadcrumbs: [
                    {
                        text: "Analytical",
                        disabled: true,
                    },
                ],
                page_icon: null,
                social_networks: social_networks
            };
        },
        methods: {
            change_data(social_network) {
                this.page = social_network.name;
                this.page_icon = social_network.mdi_icon;
            },
        },
        components: {
          AllReports,
            ProfileIncrease,
            PostAnalyse,
            PostRatio,
            UserArea,
        }
    };
</script>
<style>
    .socialWrapper{
        display: table-cell;
        float: right;
    }
</style>