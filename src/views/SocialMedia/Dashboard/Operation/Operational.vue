<template>
  <div class="vuse-content-wrapper">
    <v-container fluid class="">
      <v-row>
        <v-col md="8" sm="12" xs="12">
          <v-sheet color="transparent" class="mt-5 pa-1">
            <collecting/>
          </v-sheet>
          <v-sheet color="transparent" class="mt-5 pa-1">
            <payments/>
          </v-sheet>
          <v-sheet color="transparent" class="mt-5 pa-1">
            <twelve-weeks-cash-flow/>
          </v-sheet>
        </v-col>
        <v-col md="4" sm="12" xs="12">
          <v-sheet color="transparent" class="mt-5 pa-1">
            <operational-statistics/>
          </v-sheet>
          <v-sheet color="transparent" class="mt-5 pa-1">
            <cash-flow/>
          </v-sheet>
          <v-sheet color="transparent" class="mt-5 pa-1">
            <sales-report/>
          </v-sheet>
        </v-col>
        <v-col md="12" sm="12" xs="12">
            <v-sheet color="transparent" class="mt-0 pa-1">
                <accounts-connected-banks />
            </v-sheet>
          <v-sheet color="transparent" class="mt-5 pa-1">
            <shipping/>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import social_networks from "@/data/socialNetworks";
import OperationalStatistics from "@/views/SocialMedia/Dashboard/comp/OperationalStatistics";
import Collecting from "@/views/SocialMedia/Dashboard/comp/Collecting";
import Payments from "@/views/SocialMedia/Dashboard/comp/Payments";
import CashFlow from "@/views/SocialMedia/Dashboard/comp/CashFlow";
import SalesReport from "@/views/SocialMedia/Dashboard/comp/SalesReport";
import Shipping from "@/views/SocialMedia/Dashboard/comp/Shippings";
import AccountsConnectedBanks from "@/views/SocialMedia/Dashboard/comp/AccountsConnectedBanks";
import TwelveWeeksCashFlow from "@/views/SocialMedia/Dashboard/comp/TwelveWeeksCashFlow";

export default {
  components: {
    TwelveWeeksCashFlow,
    AccountsConnectedBanks,
    SalesReport,
    CashFlow,
    Payments,
    Shipping,
    Collecting,
    OperationalStatistics
  },
  data: () => ({
    page: "Operational",
    social_networks: social_networks
  })
};

</script>
