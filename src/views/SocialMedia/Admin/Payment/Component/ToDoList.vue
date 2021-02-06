<template>
    <div>
        <v-card class="todo-list todo-area"  color="#0097a7">
            <div class="todo-list" align="end">
                <v-img class="white--text align-end height=250"
                       src="/payment.png">
                </v-img>
                <div class="">
                </div>
            </div>
        </v-card>

        <v-row class="mr-5 ml-5" v-if="reportArea">
            <v-col md="6">
                <v-card class="todo-col-list col-md-6 mt-n16 pb-10  mr-5">
                    <v-icon size="40" color="#3ef1e5" >insert_drive_file</v-icon>
                    <div class="clearfix mt-3"></div>
                    <span class="todo-title private-font-header text-h5 font-weight-bold py-3">{{$t('PaymentManager.Today')}}</span>
                    <div class="clearfix"></div>
                    <br>
                    <span class="todo-number private-font-count font-weight-bold">{{ allData.data.reports.day.count }} {{$t('PaymentManager.Payments')}}</span>
                    <div class="todo-number private-font-total" style="font-size: 16px;">{{ $t('PaymentManager.CurrencyType')}}{{ allData.data.reports.day.total }} {{$t('PaymentManager.Gain')}}</div>
                </v-card>
            </v-col>

            <v-col md="6">
                <v-card class="todo-col-list col-md-6 mt-n16 pb-10 ">
                    <v-icon size="40" color="#3ef1e5">insert_drive_file</v-icon>
                    <div class="clearfix mt-3"></div>
                    <span class="todo-title private-font-header text-h5 font-weight-bold py-3">{{$t('PaymentManager.ThisWeek')}}</span>
                    <div class="clearfix"></div>
                    <br>
                    <span class="todo-number private-font-count font-weight-bold">{{ allData.data.reports.week.count }} {{$t('PaymentManager.Payments')}}</span>
                    <div class="todo-number private-font-total" style="font-size: 16px;">{{ $t('PaymentManager.CurrencyType')}}{{ allData.data.reports.week.total }} {{$t('PaymentManager.Gain')}}</div>
                </v-card>
            </v-col>

            <v-col md="6">
                <v-card class="todo-col-list col-md-6  pb-10 ">
                    <v-icon  size="40" color="#3ef1e5">insert_drive_file</v-icon>
                    <div class="clearfix mt-3"></div>
                    <span class="todo-title private-font-header text-h5 font-weight-bold py-3">{{$t('PaymentManager.ThisMonth')}}</span>
                    <div class="clearfix"></div>
                    <br>
                    <span class="todo-number private-font-count font-weight-bold">{{ allData.data.reports.month.count }} {{$t('PaymentManager.Payments')}}</span>
                    <div class="todo-number private-font-total" style="font-size: 16px;">{{ $t('PaymentManager.CurrencyType')}}{{ allData.data.reports.month.total }} {{$t('PaymentManager.Gain')}}</div>
                </v-card>
            </v-col>

            <v-col md="6">
              <v-card class="todo-col-list col-md-6 pb-10 ">
                <v-icon  size="40" color="#3ef1e5">insert_drive_file</v-icon>
                <div class="clearfix mt-3"></div>
                <span class="todo-title private-font-header text-h5 font-weight-bold py-3">{{$t('PaymentManager.This3Month')}}</span>
                <div class="clearfix"></div>
                  <br>
                <span class="todo-number private-font-count font-weight-bold">{{ allData.data.reports.threemonth.count }} {{$t('PaymentManager.Payments')}}</span>
                <div class="todo-number private-font-total" style="font-size: 16px;">{{ $t('PaymentManager.CurrencyType')}}{{ allData.data.reports.threemonth.total }} {{$t('PaymentManager.Gain')}}</div>
              </v-card>
            </v-col>

            <v-col md="6">
                <v-card class="todo-col-list col-md-6 pb-10 ">
                    <v-icon  size="40" color="#3ef1e5">insert_drive_file</v-icon>
                    <div class="clearfix mt-3"></div>
                    <span class="todo-title private-font-header text-h5 font-weight-bold py-3">{{$t('PaymentManager.This6Month')}}</span>
                    <div class="clearfix"></div>
                    <br>
                    <span class="todo-number private-font-count font-weight-bold">{{ allData.data.reports.sixmonth.count }} {{$t('PaymentManager.Payments')}}</span>
                    <div class="todo-number private-font-total" style="font-size: 16px;">{{ $t('PaymentManager.CurrencyType')}}{{ allData.data.reports.sixmonth.total }} {{$t('PaymentManager.Gain')}}</div>
                </v-card>
            </v-col>
            <v-col md="6">
                <v-card class="todo-col-list col-md-6 pb-10 ">
                    <v-icon size="40" color="#3ef1e5">insert_drive_file</v-icon>
                    <div class="clearfix mt-3"></div>
                    <span class="todo-title private-font-header text-h5 font-weight-bold py-3">{{$t('PaymentManager.ThisYear')}}</span>
                    <div class="clearfix"></div>
                    <br>
                    <span class="todo-number private-font-count font-weight-bold">{{ allData.data.reports.year.count }} {{$t('PaymentManager.Payments')}}</span>
                    <div class="todo-number private-font-total" style="font-size: 16px;">{{ $t('PaymentManager.CurrencyType')}}{{ allData.data.reports.year.total }} {{$t('PaymentManager.Gain')}}</div>
                </v-card>
            </v-col>

        </v-row>

    </div>

</template>
<script>
    //import CheckList from "@/components/UI/Widgets/Lists/CheckList/CheckList";
    export default {
        props: {
          items: {
            default: null
          },
          allData: {
            default: null
          }
        },
        //components: { CheckList },
        data() {
            return {
                componentProps: {
                    title: "Todo",
                    list: [
                        {
                            title: "Project Scoping & Estimation",
                            body: "Due in 1 day",
                            isCompleted: false,
                            tags: [
                                {
                                    color: "info",
                                },
                            ],
                        },
                        {
                            title: "Sprint Planning",
                            body: "Due in 2 day",
                            isCompleted: false,
                            tags: [
                                {
                                    color: "warning",
                                },
                            ],
                        },
                        {
                            title: "WireFrames and Design",
                            body: "Due in 1Wk",
                            isCompleted: false,
                            tags: [
                                {
                                    color: "error",
                                },
                            ],
                        },
                        {
                            title: "Gather API requirement",
                            body: "Due in 10 Days",
                            isCompleted: false,
                            tags: [
                                {
                                    color: "success",
                                },
                            ],
                        },
                    ],
                },
                reportArea: false,
                myItems: {
                  data: {
                    reports: {
                      day: {
                        count: 0,
                        total: 0
                      },
                      week: {
                        count: 0,
                        total: 0
                      },
                      month: {
                        count: 0,
                        total: 0
                      },
                      threemonth: {
                        count: 0,
                        total: 0
                      },
                      sixmonth: {
                        count: 0,
                        total: 0
                      },
                      year: {
                        count: 0,
                        total: 0
                      },
                    }
                  }
                }
            };
        },
        beforeDestroy() {
            this.componentProps = null;
            delete this.componentProps;
            console.log("todo before destroy")
            this.reportArea = true
        },
        created() {
          //let myDatam = this.$store.getters["payments/getPaymentAll"]
          //this.myItems = myDatam
          //console.log("myDatam created:", myDatam);
        },
        watch:{
          allData(data){
            this.myItems = data
            console.log("change data", data)
            this.reportArea = true
          }
        }
    };
</script>

<style scoped>
 .todo-area {
   height: 242px !important;
 }
</style>