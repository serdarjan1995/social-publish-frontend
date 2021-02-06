<template>
    <v-toolbar flat color="transparent">
        <v-app-bar-nav-icon
                v-if="$vuetify.breakpoint.smAndDown && !drawer"
                @click="onToggleDrawer()"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>
            {{ social.name }}
        </v-toolbar-title>

        <v-spacer></v-spacer>
    </v-toolbar>
</template>

<script>
    export default {
        props: {
            drawer: Boolean,
            social: Object,
            onToggleDrawer: Function,
        },
        data() {
            return {
                userDetailMenu: false,
            };
        },
    };
</script>
