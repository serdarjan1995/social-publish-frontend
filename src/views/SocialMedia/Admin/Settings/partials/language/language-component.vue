<template v-if="1">
    <v-row class="pa-5">
        <v-col cols="12" md="12">
            <h3>
                <v-icon>mdi-facebook</v-icon>
                {{$t('SocialNetwork.fb')}}
            </h3>
        </v-col>
        <v-col cols="12" md="12">
            <v-col cols="12" md="12">
                <h3>
                    <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
                    {{$t('SocialNetwork.fb_api_config')}}
                </h3>
            </v-col>
            <v-text-field
                    :label="$t('SocialNetwork.fb_client_id')"
            ></v-text-field>
        </v-col>


        <v-col cols="12" md="12">
            <v-btn tile color="indigo" dark>
                {{$t('SocialNetwork.submit')}}
            </v-btn>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        props: {
            drawer: {
                type: Boolean,
                default: true,
            },
            items: {
                type: Array,
                default: () => [],
            },
            search: {
                type: String,
                default: null,
            },
            itemClicked: Function,
            activeItem: {
                type: String,
                default: "all",
            },

        },
        data: () => ({
            templates: ['Pure']
        }),
    };
</script>
