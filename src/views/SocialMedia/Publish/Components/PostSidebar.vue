<template>
    <v-navigation-drawer
            hide-overlay
            :value="drawer"
            :permanent="$vuetify.breakpoint.mdAndUp"
            enable-resize-watcher
            class="flex-shrink-0 vuse-sidebar-scrollable"
            style="width:100% !important"
            :stateless="$vuetify.breakpoint.smAndDown"
            v-show="drawer"
            :floating="$vuetify.breakpoint.smAndDown"
            :color="$vuetify.breakpoint.mdAndUp ? 'transparent' : ''"
            :absolute="$vuetify.breakpoint.smAndDown"
            mobile-breakpoint>
        <div class="vuse-sidenav-wrapper">
            <v-toolbar flat class="transparent">
                <slot />
                <v-spacer></v-spacer>
                <v-btn
                        v-if="$vuetify.breakpoint.smAndDown && drawer"
                        icon
                        @click="onToggle()"
                >
                    <v-icon>chevron_left</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-list class="scrollable-content" rounded>
                <v-slide-y-transition group>
                    <template v-for="(group, index) in users">
                        <v-list-item
                                :key="`member-${index}-${group.id}`"
                                class="px-2"
                        >
                          <v-list-item-action @click.stop class="ma-0">
                            <v-checkbox
                                color="sidebar"
                                hide-details
                                @change="checkChanged"
                                v-model="group.selected"
                            ></v-checkbox>
                          </v-list-item-action>
                            <v-list-item-avatar class="unset-overflow">
                              <v-icon>
                                {{ group.social_icon }}
                              </v-icon>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>{{ group.name }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                </v-slide-y-transition>
            </v-list>
        </div>
    </v-navigation-drawer>
</template>

<script>
    import orderBy from "lodash/orderBy";

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
            checkChanged: Function,
            activeId: {
                type: Number,
                default: 1,
            },
            onToggle: Function,
        },
        computed: {
            users() {
                return orderBy(this.items, ["msgOn"], ["desc"]);
            },
        },
    };
</script>
