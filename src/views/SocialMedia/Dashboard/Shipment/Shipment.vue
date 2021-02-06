<template>
  <div class="vuse-content-wrapper">
    <v-container fluid class="">
      <v-row class="neu-glow ma-0" dense>
        <v-card-title>
          <v-icon class="mr-2">{{page_icon}}</v-icon>
          {{ $t('AppDrawer.shipment') }}
        </v-card-title>
      </v-row>
      <v-row>
        <v-col md="12">
          <v-sheet color="transparent" class="mt-5 pa-1">
            <shippings/>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Shippings from "@/views/SocialMedia/Dashboard/comp/Shippings";

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
    };
  },
  methods: {
    change_data(social_network) {
      this.page = social_network.name;
      this.page_icon = social_network.mdi_icon;
    },
  },
  components: {
    Shippings,
  }
};
</script>
<style>
.socialWrapper{
  display: table-cell;
  float: right;
}
</style>