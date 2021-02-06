<template>
    <div class="vuse-content-wrapper">
        <vuse-section-definition :title="page" icon="dashboard"></vuse-section-definition>
        <v-container fluid class="fill-height">
            <inner-base-layout baseLayerClass="neu-glow-inset" innerContainerClass="transparent" class="ml-3 mr-3" >
                <template v-slot:sidebar>
                    <Sidenav
                            :drawer="drawer"
                            :items="menuItems"
                            :activeItem="activeMenu"
                            :itemClicked="setActiveOption"
                            :onToggle="drawerHandler"
                    />
                </template>
                <template v-slot:header>
                    <div>
                        <billing-toolbar
                                :drawer="drawer"
                                :onUnselectAll="unselectAll"
                                :search="search"
                                :onSelectAll="selectAll"
                        />
                    </div>
                    <v-divider></v-divider>
                </template>
                <template v-slot:content>
                    <v-sheet color="transparent">
                        <v-list
                                two-line
                                flat
                                class="transparent"
                                :style="{ 'overflow-x': 'hidden' }">
                            <billing-report v-show="activeMenu==='billing_report'"
                                            :items="myData"
                                            :allData="allData"

                            />
                            <billing-history v-show="activeMenu==='billing_history'"
                                             :items="myData"
                            />

                        </v-list>
                    </v-sheet>

                    <v-sheet class="mr-4 ml-4"  v-show="activeMenu==='billing_report'">
                        <billing-chart :allData="allData" :chartData="chartData"/>
                    </v-sheet>

                </template>
            </inner-base-layout>
        </v-container>
    </div>
</template>
<script>
    import InnerBaseLayout from "@/layouts/Inner/Layout";
    import Sidenav from "@/views/SocialMedia/User/Components/Sidenav";
    import BillingToolbar from "@/views/SocialMedia/User/Components/BillingToolbar";
    import BillingReport from "@/views/SocialMedia/User/Components/BillingReport";
    import BillingChart from "@/views/SocialMedia/User/Components/BillingChart";
    import BillingHistory from "@/views/SocialMedia/User/Components/BillingHistory";

    export default {
        data() {
            return {
                myData : [],
                allData : [],
                chartData: [],
                page: "Billing",
                breadcrumbs: [
                    {
                        text: "Billing",
                        disabled: true,
                    },
                ],
                search:'',
                drawer: true,
                activeMenu: "billing_report",
                menuItems: [
                    {title: "Billing Report", isActive: true, slug: "billing_report"},
                    {title: "Billing History", isActive: true, slug: "billing_history"},
                ],
            };
        },
        methods:{
            setActiveOption(item) {
                console.log(item.slug)
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
            InnerBaseLayout,
            Sidenav,
            BillingToolbar,
            BillingReport,
            BillingChart,
            BillingHistory
        },
        beforeCreate() {
          this.$store.dispatch("payments/getPayments", null).then((resp) => {
            this.myData = resp.data.reports.all;
            this.myData.find((res) => {
              if (res.status === 1) {
                res.status = this.$t("PaymentManager.Paid")
              } else {
                res.status = this.$t("PaymentManager.Unpaid")
              }
            })

            this.allData = resp;
          })
        }
    };
</script>
