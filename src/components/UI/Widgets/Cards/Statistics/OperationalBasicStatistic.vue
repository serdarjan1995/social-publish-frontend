<template>
    <v-card :max-width="maxWidth" class="neu-glow">
        <v-card-title class="pb-0 pt-1 text-caption">
            {{ title }}
        </v-card-title>
        <v-card-text class="pt-0">
            <v-list-item class="px-0">
                <v-list-item-content>
                    <v-list-item-title class="text-h6">{{ heading }}<span class="text-caption" v-if="subText">{{subText}}</span></v-list-item-title>
                </v-list-item-content>
                <v-list-item-avatar
                        v-bind="avatar.avatarStyle ? avatar.avatarStyle : {}"
                >
                    <img :src="avatar.src" v-if="avatar.src" />
                    <v-icon
                            v-else-if="avatar.icon"
                            v-bind="avatar.style ? avatar.style : {}"
                            large>{{ avatar.icon }}</v-icon
                    >
                    <span style="white-space: pre;" v-else>{{ avatar.text }}</span>
                </v-list-item-avatar>
            </v-list-item>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        props: {
            maxWidth: {
                type: [Number, String],
                default: "",
            },
            title: {
                type: String,
                default: ""
            },
            heading: {
                type: String,
                required: true,
            },
            subText: {
                type: String,
                required: false,
                default: null
            },
            avatar: {
                type: Object,
                default: () => {
                    return {
                        avatarStyle: null,
                    };
                },
            },
        },
    };
</script>
