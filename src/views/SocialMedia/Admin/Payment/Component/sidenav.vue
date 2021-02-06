<template>
    <v-navigation-drawer
            hide-overlay
            :value="drawer"
            :permanent="$vuetify.breakpoint.mdAndUp"
            enable-resize-watcher
            :temporary="$vuetify.breakpoint.smAndDown"
            class="flex-shrink-0 vuse-sidebar-scrollable"
            :stateless="$vuetify.breakpoint.smAndDown"
            v-show="drawer"
            :color="$vuetify.breakpoint.mdAndUp ? 'transparent' : ''"
            :absolute="$vuetify.breakpoint.smAndDown"
            mobile-breakpoint
    >
        <div class="vuse-sidenav-wrapper">
            <v-toolbar flat class="transparent">
                <v-toolbar-title class="ml-2 text-subtitle-1">Fılter</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn
                        icon
                        v-if="$vuetify.breakpoint.smAndDown && drawer"
                        @click="onToggle()"
                >
                    <v-icon color="grey lighten-1">history</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-list dense rounded class="scrollable-content">
                <template v-for="(item, index) in items">
                    <v-list-item
                            :key="`${index}-menuitems`"
                            @click="itemClicked(item)"
                            :class="[item.slug === activeItem ? 'neu-glow-inset-primary' : '']"
                    >
                     <v-icon >payment</v-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{ $t('PaymentManager.'+item.title) }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
        </div>
    </v-navigation-drawer>
</template>
<script>
    import { authUser } from "@/data/dummyData";
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
            itemClicked: Function,
            activeItem: {
                type: String,
                default: "all",
            },
            onToggle: Function,
        },
        data() {
            return {
                authUser,
            };
        },
    };
</script>
