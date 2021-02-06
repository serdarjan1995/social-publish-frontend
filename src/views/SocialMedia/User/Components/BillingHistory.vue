<template>
    <div class="pl-5 pr-5 pt-5">
        <v-card class="neu-glow">
            <v-row class="mx-0 pa-4" justify="space-between" align="center">
                <div>
                    <div class="text-h6">Billing History</div>
                </div>
            </v-row>
            <billing-table :headers="headers" :items="items" >

            </billing-table>

        </v-card>
    </div>
</template>
<script>
  import BillingTable from "@/views/SocialMedia/User/Components/BillingTable";
    export default {
        components:{
            BillingTable,
        },
        props: {
            items: {
                type: Array
            }
        },
        data() {
            return {
                headers: [
                    {text: "Type ", value: "type"},
                    {text: "Email", value: "email"},
                    {text: "Fullname", value: "fullname"},
                    {text: "Package name", value: "packagename"},
                    {text: "Transaction Id", value: "transactionId"},
                    {text: "Plan", value: "plan"},
                    {text: "Amount", value: "amount"},
                    {text: "Created", value: "created"},
                    {text: "Status", value: "status"},
                ],
            }

        }
    };


</script>
