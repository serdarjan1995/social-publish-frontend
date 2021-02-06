<template>
    <v-dialog v-model="accountEditDialog" scrollable persistent max-width="500" max-height="600">
        <v-card max-width="600" class="mx-auto pa-3">
            <v-img
                    class="white--text align-end"
                    height="200px"
                    :src="accountEditItem.avatar_url"
            >
                <v-card-title>{{accountEditItem.name}}</v-card-title>
            </v-img>
            <v-text-field class="mb-1" :label="$t('Schedules.accountName')" :value="accountEditItem.name"/>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="ma-2" tile outlined color="error" @click="closeMyDialog">
                    <v-icon left>mdi-close</v-icon>
                    {{$t('Schedules.cancel')}}
                </v-btn>
                <v-btn class="ma-2" tile outlined color="success">
                    <v-icon left>mdi-pencil</v-icon>
                    {{$t('Schedules.edit')}}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
    import EventBus from "@/plugins/event-bus";
    export default {
        name: "AccountEditDialog",
        props: {
            accountEditDialog:Boolean,
            accountEditItem:Object
        },
        data: () => ({
        }),
        methods:{
            closeMyDialog(){
                const newValue = false;
                EventBus.$emit('closeAccountEditDialog',newValue);
            }
        }
    }
</script>


