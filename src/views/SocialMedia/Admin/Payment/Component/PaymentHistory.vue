<template>
    <div class="pl-5 pr-5 pt-5">
        <v-card class="neu-glow">
            <v-row class="mx-0 pa-4" justify="space-between" align="center">
                <div>
                    <div class="text-h6">Payment Manager</div>
                </div>
            </v-row>
            <project-table :headers="headers" :items="items">

            </project-table>
        </v-card>
    </div>
</template>
<script>
    import ProjectTable from "@/views/SocialMedia/Admin/Payment/Component/ProjectTable";
    export default {
        components:{
          ProjectTable
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

        },

    };


</script>
