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
            mobile-breakpoint
    >
        <div class="vuse-sidenav-wrapper" >
            <v-toolbar flat class="transparent">
                <slot/>
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
                    <v-list-item
                        :key="`member-0`"
                        @click="clicked({'id':0})"
                        :class="[0 === activeId ? 'neu-glow-inset-primary' : '']">
                      <v-list-item-avatar class="my-0">
                        <v-icon size="40">
                          group_work
                        </v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>
                          All
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <template v-for="(social, index) in sociallist">
                        <v-list-item
                                :key="`member-${index}-${social.id}`"
                                @click="clicked(social)"
                                :class="[social.id === activeId ? 'neu-glow-inset-primary' : '']">
                            <v-list-item-avatar class="my-0">
                                <v-icon size="40">
                                    {{social.icon}}
                                </v-icon>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ social.name }}
                                </v-list-item-title>
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
                default: () => []
            },
            clicked: Function,
            activeId: {
                type: Number,
                default: 1,
            },
            onToggle: Function
        },
        computed: {
            sociallist() {
                return orderBy(this.items, ["id"], ["asc"]);
            }
        }
    };
</script>
