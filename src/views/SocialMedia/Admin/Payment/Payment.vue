<template>
  <div class="vuse-content-wrapper">
    <vuse-section-definition :title="page" icon="dashboard"></vuse-section-definition>
    <v-container fluid class="fill-height">
      <inner-base-layout baseLayerClass="neu-glow-inset" innerContainerClass="transparent" class="ml-3 mr-3">
        <template v-slot:sidebar>
          <sidenav
              :drawer="drawer"
              :items="menuItems"
              :activeItem="activeMenu"
              :itemClicked="setActiveOption"
              :onToggle="drawerHandler"
          />
        </template>
        <template v-slot:content>
          <v-sheet color="transparent">
            <v-list
                two-line
                flat
                class="transparent"
                :style="{ 'overflow-x': 'hidden' }">
              <payment-report v-show="activeMenu==='payment_report'"
                              :items="myReports"
                              :allData="allData"
              />

              <payment-history v-show="activeMenu==='payment_history'"
                               :items="myData"
              />

              <payment-make v-show="activeMenu==='payment_make'"
                               :items="myData"
              />
            </v-list>
          </v-sheet>

        </template>
      </inner-base-layout>
    </v-container>
  </div>
</template>

<script>
import InnerBaseLayout from "@/layouts/Inner/Layout"
import sidenav from "@/views/SocialMedia/Admin/Payment/Component/sidenav";
import PaymentReport from "@/views/SocialMedia/Admin/Payment/Component/PaymentReport";
import PaymentHistory from "@/views/SocialMedia/Admin/Payment/Component/PaymentHistory";
import PaymentMake from "@/views/SocialMedia/Admin/Payment/Component/PaymentMake";

export default {

  data() {
    return {
      headers: [
        {text: "Types ", value: "type"},
        {text: "Email", value: "email", align: "right"},
        {text: "Fullname", value: "fullname", align: "right"},
        {text: "Package name", value: "packagename", align: "right"},
        {text: "Transaction Id", value: "transactionId", align: "right"},
        {text: "Plan", value: "plan", align: "right"},
        {text: "Amount", value: "amount", align: "right"},
        {text: "Created", value: "created", align: "right"},
        {text: "Status", value: "status", align: "right"},
      ],
      chartData: [],
      drawer: true,
      search: '',
      allData: [],
      myData: [],
      myReports: [],
      activeMenu: "payment_report",
      menuItems: [
        {title: "PaymentReport", isActive: true, slug: "payment_report"},
        {title: "PaymentHistory", isActive: false, slug: "payment_history"},
        {title: "PaymentMake", isActive: false, slug: "payment_make"},
      ],
      page: "Payment Manager",
      breadcrumbs: [
        {
          text: "PaymentManager",
          disabled: true,
        },
      ]
    };
  },
  methods: {
    setActiveOption(item) {
      this.activeMenu = item.slug;
    },
    drawerHandler() {
      this.drawer = !this.drawer;
    },
    selectAll() {
      if (this.unselectedContacts) {
        this.unselectedContacts.forEach((element) => {
          element.selected = true;
        });
      }
    },
    unselectAll() {
      if (this.selectedContacts) {
        this.selectedContacts.forEach((element) => {
          element.selected = false;
        });
      }
    },
  },
  components: {
    sidenav,
    InnerBaseLayout,
    PaymentHistory,
    PaymentReport,
    PaymentMake
  },

  computed: {
    listContact() {
      return this.contacts;
    },
  },
  beforeCreate() {
  },
  created() {
    //
  },
  destroyed() {
  }

};

</script>


