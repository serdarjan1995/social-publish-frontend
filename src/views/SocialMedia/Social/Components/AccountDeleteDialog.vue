<template>
    <v-row justify="center">
        <v-dialog v-model="accountDeleteDialog" justify="center" persistent max-width="350">
            <v-card>
                <v-card-title class="text-h5"
                >{{$t('Schedules.deletePost')}}</v-card-title
                >
                <v-card-text
                >{{$t('Schedules.deleteAsk')}} {{accountDeleteItem.name}} ?</v-card-text
                >
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="ma-2" tile outlined color="error" @click="closeMyDialog">
                        <v-icon left>mdi-close</v-icon>
                        {{$t('Schedules.close')}}
                    </v-btn>
                    <v-btn class="ma-2" tile outlined color="success" @click="closeMyDialog">
                        <v-icon left>mdi-delete</v-icon>
                        {{$t('Schedules.delete')}}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
    import EventBus from "@/plugins/event-bus";
    export default {
        name: "AccountDeleteDialog",
        props: {
            accountDeleteDialog:Boolean,
            accountDeleteItem:Object
        },
        created() {

        },
        data: () => ({
        }),
        methods:{
            closeMyDialog(){
                const newValue = false;
                EventBus.$emit('closeAccountDeleteDialog',newValue);
            }
        }
    }
</script>


