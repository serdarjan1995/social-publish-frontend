<template>
    <div class="vuse-content-wrapper chat-app">
        <vuse-section-definition
                :title="page"
                icon="dashboard"/>
        <inner-base-layout
                baseLayerClass="neu-glow-inset"
                innerContainerClass="transparent"
        >
            <template v-slot:sidebar>
                <container-sidebar-list
                        :drawer="drawer"
                        :items="filteredSocial"
                        :clicked="switchType"
                        :activeId="activeSocialId"
                        :onToggle="drawerHandler">
                    <v-text-field
                            v-model="search"
                            :label="$t('Schedules.searchSocial')"
                            solo
                            dense
                            flat
                            prepend-icon="search"
                            hide-details>
                    </v-text-field>
                </container-sidebar-list>
            </template>
            <template v-slot:header>
                <div>
                    <container-header
                            :drawer="drawer"
                            :item="activeSocial"
                            :onToggleDrawer="drawerHandler"
                    />
                </div>
                <v-divider></v-divider>
            </template>
            <template v-slot:sidebar-right>
                <right-sidebar
                        :drawer="drawerRight"
                        :items="filteredPosts"
                        :activeId="activePostId"
                        :onEdit="openEditDialog"
                        :onDelete="openDeleteDialog"
                        style="border-left:1px solid #d5d5d9 !important;float:right;"
                        :onToggle="drawerRightHandler">
                    <v-text-field
                            v-model="searchRight"
                            :label="$t('Schedules.searchPost')"
                            solo
                            dense
                            flat
                            prepend-icon="search"
                            hide-details>
                    </v-text-field>
                </right-sidebar>
            </template>
            <template v-slot:content>
                <v-container fluid class="pt-0">
                    <v-row class="pt-0">
                        <v-col md="12" class="pt-0">
                            <v-row class="pt-0">
                                <v-col md="12" class="pt-0">
                                    <v-row>
                                        <v-col md="3">
                                            <v-btn
                                                    fab
                                                    small
                                                    left
                                                    @click="$refs.calendar.prev()"
                                            >
                                                <v-icon dark>mdi-chevron-left</v-icon>
                                            </v-btn>
                                        </v-col>
                                        <v-col md="6">
                                            <v-tabs
                                                    class="elevation-20 rounded-corners"
                                                    :centered="true"
                                                    :grow="true"
                                            >
                                                <v-tabs-slider></v-tabs-slider>
                                                <v-tab
                                                        v-for="i in typeOptions"
                                                        :key="i.value"
                                                        @click="changeType(i.value)"
                                                        hide-details
                                                        outlined
                                                >
                                                    {{ i.text }}
                                                </v-tab>
                                            </v-tabs>
                                        </v-col>
                                        <v-col md="3">
                                            <v-btn
                                                    fab
                                                    small
                                                    right
                                                    style="float:right;"
                                                    @click="$refs.calendar.next()"
                                            >
                                                <v-icon dark>mdi-chevron-right</v-icon>
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col md="12">
                                            <v-sheet>
                                                <v-calendar style="min-height:700px !important;"
                                                            ref="calendar"
                                                            v-model="value"
                                                            :weekdays="weekday"
                                                            :type="type"
                                                            :events="filteredEvents"
                                                            :event-overlap-mode="mode"
                                                            :event-overlap-threshold="30"
                                                            :event-color="getEventColor"
                                                            @change="getEvents"
                                                            interval-width="2"
                                                            @click:date="openEx"
                                                            @click:day="openEx"
                                                            @click:time="openEx"
                                                >
                                                  <template v-slot:event="{ event }" class="myWrapper">
                                                        <v-icon color="white" small>{{ event.icon }}</v-icon>
                                                    </template>
                                                </v-calendar>
                                            </v-sheet>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-container>
            </template>
        </inner-base-layout>
        <post-edit-dialog :edit-dialog="editDialog" v-if="editDialog" :postEditItem="this.dialogItem"></post-edit-dialog>
        <post-delete-dialog :delete-dialog="deleteDialog" v-if="deleteDialog" :postDeleteItem="this.dialogItem"></post-delete-dialog>
    </div>
</template>
<script>
    import ContainerSidebarList from "@/views/SocialMedia/Social/Components/ContainerSidebarList"
    import RightSidebar from "./Comp/RightSidebar"
    import PostEditDialog from "./Comp/PostEditDialog"
    import PostDeleteDialog from "./Comp/PostDeleteDialog"
    import ContainerHeader from "@/views/SocialMedia/Social/Components/ContainerHeader"
    import InnerBaseLayout from "@/layouts/Inner/Layout"
    import { find } from "lodash";
    import EventBus from "@/plugins/event-bus";
    export default {
        data: () => ({
            page: "Schedules",
            search: '',
            searchRight: '',
            editDialog:false,
            deleteDialog:false,
            searchSocialId: '',
            drawer: true,
            showRight: false,
            drawerRight: true,
            selectedDate: "",
            dialogItem: null,
            activeSocialId: 0,
            activePostId: 0,
            type: 'month',
            types: ['month', 'week', 'day', '4day'],
            mode: 'stack',
            modes: ['stack', 'column'],
            typeOptions: [
                {
                    "text": "Month",
                    "value": "month"
                },
                {
                    "text": "Week",
                    "value": "week"
                },
                {
                    "text": "Day",
                    "value": "day"
                }
            ],
            weekday: [0, 1, 2, 3, 4, 5, 6],
            weekdays: [
                {text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6]},
                {text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0]},
                {text: 'Mon - Fri', value: [1, 2, 3, 4, 5]},
                {text: 'Mon, Wed, Fri', value: [1, 3, 5]},
            ],
            value: '',
            events: [],
            colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
            names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
        }),
        components: {
            ContainerSidebarList,
            RightSidebar,
            ContainerHeader,
            PostEditDialog,
            PostDeleteDialog,
            InnerBaseLayout
        },
        computed: {
            socialDataList:{
              get(){
                return this.$store.state.social_medias.socialMediaList
              },
              set(newValue){
                this.$store.state.social_medias.socialMediaList = newValue
              }
            },
            myEventList:{
              get(){
                return this.$store.state.posts.postList
              },
              set(newValue){
                this.$store.state.posts.postList = newValue
              }
            },
            activeSocial() {
                return find(this.socialDataList, {id: this.activeSocialId});
            },
            filteredSocial() {
              return this.socialDataList.filter((items) =>
                  items.name.toLowerCase().includes(this.search.toLowerCase())
              );
            },
            filteredPosts() {
                if(this.activeSocialId == 0) {
                  return this.myEventList.filter((items) =>
                      items.start!= null && (items.account_name.toLowerCase().includes(this.searchRight.toLowerCase()) || items.description.toLowerCase().includes(this.searchRight.toLowerCase())) && items.start.toLowerCase().includes(this.selectedDate.toLowerCase())
                  );
                }
                else{
                  return this.myEventList.filter((items) =>
                      items.start!= null && items.social_id == this.activeSocialId && (items.account_name.toLowerCase().includes(this.searchRight.toLowerCase()) || items.description.toLowerCase().includes(this.searchRight.toLowerCase())) && items.start.toLowerCase().includes(this.selectedDate.toLowerCase())
                  );
                }
            },
            filteredEvents() {
              if(this.activeSocialId == 0) {
                return this.myEventList.filter((items) =>
                    items.start!= null
                )
              }
              else{
                return this.myEventList.filter((items) =>
                    items.start!= null && items.social_id == this.activeSocialId
                );
              }
            }
        },
        methods: {
            openEditDialog(item){
                this.dialogItem=item;
                this.editDialog=true;
            },
            openDeleteDialog(item){
                this.dialogItem=item;
                this.deleteDialog=true;
            },
            switchType(list) {
                this.activeSocialId = list.id;
            },
            drawerHandler() {
                this.drawer = !this.drawer
            },
            drawerRightHandler() {
                this.drawerRight = !this.drawerRight
            },
            openEx(e) {
                if (!this.showRight) {
                    this.showRight = true;
                }
                this.selectedDate = e.date;
            },
            changeType(myItem) {
                this.type = myItem;
            },
            getEvents() {
                const myEvents = this.myEventList.map((list) => {
                    return {...list};
                });
                this.events = JSON.parse(JSON.stringify(myEvents));
            },
            getEventColor(event) {
                return event.color
            },
            rnd(a, b) {
                return Math.floor((b - a + 1) * Math.random()) + a
            },
        },
        created(){
          this.$store.dispatch('social_medias/getSocialMediaList')
          this.$store.dispatch('posts/getPostList')
        },
        mounted(){
            EventBus.$on('closeEditDialog', newValue => {
                console.log(newValue);
                this.editDialog=false;
            })
            EventBus.$on('account-manager-add-account', () => {
              console.log(this.activeSocialId);
            })
            EventBus.$on('closeDeleteDialog', newValue => {
                console.log(newValue);
                this.deleteDialog=false;
            })
        }
    }
</script>
<style>
    .rounded-corners {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        background-color: blueviolet;
    }
    .v-event{
        width:20px !important;
        text-align:center !important;
        float:left !important;
        margin-left:2px !important;
    }
    .v-calendar-weekly__day{
    }
</style>