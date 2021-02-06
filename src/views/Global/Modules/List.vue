<template>
    <div class="vuse-content-wrapper">
        <vuse-section-definition :title="page" icon="mdi-puzzle"/>
        <inner-base-layout baseLayerClass="neu-glow-inset" innerContainerClass="transparent">

            <!-- SIDE BAR -->
            <template v-slot:sidebar>

                <side-bar
                        :drawer="drawer"
                        :items="filteredSocialData"
                        :clicked="switchSocials"
                        :activeId="activeSocialId"
                        :onToggle="drawerHandler"
                >
                    <v-text-field
                            v-model="search"
                            label="Search Social List"
                            solo
                            dense
                            flat
                            prepend-icon="search"
                            hide-details>
                    </v-text-field>
                </side-bar>
            </template>

            <!-- HEADER BAR -->
            <template v-slot:header>
                <header-bar :drawer="drawer" :social="activeSocial" :onToggleDrawer="drawerHandler"/>
                <v-divider></v-divider>
            </template>

            <!-- Cards -->
            <template v-slot:content>
                <card-list
                            :relative-card-list="relativeCardList"
                            :toggleBookmark="toggleBookmark"
                            :change-color="changeColor"
                            :apply-card-dialog-handler="applyCardDialogHandler"
                            :confirm-box="confirmBox"
                    />
            </template>
        </inner-base-layout>
    </div>
</template>

<script>
    import {find} from "lodash";
    import {carddata, socialdata} from "./dummyData"
    import InnerBaseLayout from "@/layouts/Inner/Layout"
    import SideBar from "@/views/Global/Modules/Components/SideBar"
    import HeaderBar from "@/views/Global/Modules/Components/HeaderBar"
    import CardList from "@/views/Global/Modules/Components/CardList"

    export default {
        components: {
            InnerBaseLayout,
            SideBar,
            HeaderBar,
            CardList
        },
        data() {
            return {
                confirmBox: {
                    model: false,
                    item: null,
                },
                page: "Modules & Themes",
                search: "",
                drawer: true,
                activeSocialId: 3,
                cards: carddata,
                socials: socialdata,

            };
        },
        computed: {
            relativeCardList() {
                const cards = this.cards.map((card) => {
                    return card;
                });
                if (this.activeSocialId === 2) {

                    return cards.filter((element) =>
                        element.count > 900
                    );
                } else if (this.activeSocialId === 1) {
                    return cards.filter((element) =>
                        element.isBookmarked === true
                    );
                } else {
                    return cards.filter((element) =>
                        element.activeSocialId === this.activeSocialId
                    );
                }
            },
            activeSocial() {
                return find(this.socials, {id: this.activeSocialId});
            },
            filteredSocialData() {
                const socials = this.socials.map((social) => {
                    return social;
                });
                return socials.filter((social) =>
                    social.name.toLowerCase().includes(this.search.toLowerCase())
                );
            },
        },
        methods: {
            changeColor(item) {
              if (item.isBookmarked) return "red"
                else return "white"
            },
            applyCardDialogHandler(item) {
                this.confirmBox = {
                    model: true,
                    item,
                };
            },
            switchSocials(social) {
                this.activeSocialId = social.id;
            },
            drawerHandler() {
                this.drawer = !this.drawer;
            },
            toggleBookmark(card) {
                card.isBookmarked = !card.isBookmarked;
            }
        }
        ,
        beforeDestroy() {
            clearTimeout(this.timeout);
            this.groups = null;
            this.conversation = null;
            delete this.groups;
            delete this.conversation;
        }
        ,
    }
    ;
</script>
