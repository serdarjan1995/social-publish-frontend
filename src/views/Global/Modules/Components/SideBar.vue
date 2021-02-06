<template>
    <v-navigation-drawer
            hide-overlay
            :value="drawer"
            :permanent="$vuetify.breakpoint.mdAndUp"
            enable-resize-watcher
            class="flex-shrink-0 vuse-sidebar-scrollable"
            width="280"
            :stateless="$vuetify.breakpoint.smAndDown"
            v-show="drawer"
            :floating="$vuetify.breakpoint.smAndDown"
            :color="$vuetify.breakpoint.mdAndUp ? 'transparent' : ''"
            :absolute="$vuetify.breakpoint.smAndDown"
            mobile-breakpoint>

        <div class="vuse-sidenav-wrapper">
            <v-toolbar flat class="transparent">
                <slot/>
                <v-spacer></v-spacer>
                <v-btn v-if="$vuetify.breakpoint.smAndDown && drawer" icon @click="onToggle()">
                    <v-icon>chevron_left</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-list class="scrollable-content" rounded>
                <v-slide-y-transition group>
                    <template v-for="(item, index) in items">
                        <v-list-item
                                :key="index"
                                @click="clicked(item)"
                                :class="[item.id === activeId ? 'neu-glow-inset-primary' : '']">
                            <v-list-item-avatar class="my-0">
                                <v-icon size="25px"> {{item.icon}} </v-icon>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title> {{ item.name }} </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                </v-slide-y-transition>
            </v-list>
        </div>
    </v-navigation-drawer>
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
            clicked: Function,
            activeId: {
                type: Number,
                default: 3,
            },
            onToggle: Function,
        }
    };
</script>
