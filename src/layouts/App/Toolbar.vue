<template>
    <v-app-bar
            app
            flat
            :clipped-left="isClippedLeft"
            :clipped-right="isClippedRight"
            v-if="isVisibleHeader"
            v-bind="bindStyle"
            :dense="isDense"
            :prominent="isProminent"
            :hide-on-scroll="isHideOnScroll"
            :shrink-on-scroll="isShrinkOnScroll"
    >
        <v-sheet
                color="transparent"
                v-if="isClippedOver || $vuetify.breakpoint.mdAndDown"
        >
            <v-list-item class="pl-0">
                <!--<v-list-item-avatar tile>
                    <vuse-logo class="primary--text" size="40"/>
                </v-list-item-avatar>
                <v-list-item-content v-if="$vuetify.breakpoint.mdAndUp">
                    <v-list-item-title class="text-h6 primary--text"
                    >{{sitename}}
                    </v-list-item-title
                    >
                </v-list-item-content>-->
                <v-list-item-content>
                    <vuse-logo class="primary--text" size="150"/>
                </v-list-item-content>
                <v-list-item-action v-if="$vuetify.breakpoint.lgAndUp">
                    <v-btn
                            @click.stop="toggleMiniVariant"
                            x-small
                            fab
                    >
                        <v-icon
                                :color="!bindStyle.color ? 'primary' : bindStyle.color"
                                v-if="isMinSideNav"
                        >double_arrow
                        </v-icon>
                        <v-icon
                                :color="!bindStyle.color ? 'primary' : bindStyle.color"
                                v-else
                        >menu_open
                        </v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>
        </v-sheet>
        <!-- Toolbar view when 'isClippedOver' is false-->
        <!--<div v-if="$vuetify.breakpoint.lgAndUp">
            <v-btn
                    @click.stop="toggleMiniVariant"
                    small
                    fab
                    :class="!bindStyle.color ? 'neu-glow' : ''"
                    v-if="!isClippedOver"
            >
                <v-icon
                        :color="!bindStyle.color ? 'primary' : bindStyle.color"
                        v-if="isMinSideNav"
                >double_arrow
                </v-icon
                >
                <v-icon :color="!bindStyle.color ? 'primary' : bindStyle.color" v-else
                >menu_open
                </v-icon
                >
            </v-btn>

            <v-btn small fab :class="!bindStyle.color ? 'neu-glow' : ''" active-class="neu-glow-inset" class="mx-3"
                   to="/app/chat">
                <v-icon :color="!bindStyle.color ? 'primary' : bindStyle.color">chat</v-icon>
            </v-btn>
        </div>-->
        <v-spacer/>
        <!--Modules-->
        <v-btn
              x-small
              fab
              active-class="neu-glow-inset"
              to="/extra/modules"
            >
            <v-icon :color="!bindStyle.color ? 'primary' : bindStyle.color">mdi-puzzle</v-icon>
        </v-btn>
        <!--end Modules-->

        <!--notification-->
        <div class="private-notification-area">
          <v-btn @click="notificationClick" x-small fab class="mx-3">
            <v-icon color="primary">notifications_none</v-icon>
            <span class="notification-count" v-if="notificationCountArea">{{ notificationCount }}</span>
          </v-btn>

          <template v-if="notificationArea">
            <div class="d-flex justify-center private-card-container">
              <flex-list v-bind="componentProps" v-if="componentProps"/>
            </div>
          </template>
        </div>

        <!--end notification-->
        <v-btn v-if="$vuetify.breakpoint.mdAndDown" class="mr-3" small fab @click="handleSidenavDrawer()">
            <v-icon :color="!bindStyle.color ? 'primary' : bindStyle.color">menu</v-icon>
        </v-btn>
        <!--settings-->
        <v-btn class="mr-3" x-small fab @click="handleSettingsDrawer()">
            <v-icon :color="!bindStyle.color ? 'primary' : bindStyle.color">settings</v-icon>
        </v-btn>
        <!-- Dark theme on/off -->
        <v-btn class="mr-3" x-small fab
               :class="isDarkMode ? 'theme--light' : 'theme--dark'"
               :style="isDarkMode?'background-color: yellow':''"
               @click="handleDarkMode()">
          <v-icon color="primary" v-if="isDarkMode">mdi-weather-sunny</v-icon>
          <v-icon color="yellow" v-else >mdi-weather-night</v-icon>
        </v-btn>
        <!--end settings-->
        <!--language-->
        <v-menu offset-y close-on-click>
            <template v-slot:activator="{ on }">
                <v-btn v-on="on" x-small fab class="mr-3">
                    <v-avatar size="30">
                        <v-img :src="currentLocaleImg"></v-img>
                    </v-avatar>
                </v-btn>
            </template>

            <v-list dense class="neu-glow">
                <v-list-item
                  v-for="(item, index) in langs"
                  :key="index"
                  @click="handleInternationalization(item.value)"
                >
                    <v-list-item-avatar tile class="with-radius" size="25">
                        <v-img :src="item.img"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <!--end language-->
        <!-- User Profile Menu -->
        <v-menu offset-y min-width="160">
            <template v-slot:activator="{ on }">
                <v-btn v-on="on" x-small fab  class="mr-0">
                    <v-avatar size="30">
                        <v-img :src="$store.state.user.profile.profile_image"></v-img>
                    </v-avatar>
                </v-btn>
            </template>
            <v-list nav dense class="neu-glow-primary with-radius">
                <template v-for="(item, index) in itm">
                    <v-divider v-if="item.divider" :key="index"></v-divider>
                    <template v-else>
                        <v-list-item
                                :key="index"
                                :to="item.path"
                                v-if="item.path"
                        >
                            <v-list-item-icon>
                                <v-icon v-text="item.icon"></v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title v-if="item.path" v-text="item.title"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item
                                :key="index"
                                @click="logout"
                                v-else
                        >
                            <v-list-item-icon>
                                <v-icon v-text="item.icon"></v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title v-text="item.title"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                </template>
            </v-list>
        </v-menu>
        <v-dialog v-model="confirmBox" max-width="400">
            <confirm-box
                    :title="$t('Global.loggingOut')"
                    :subtitle="$t('Global.logoutAreYouSure')"
                    :leftBtnTxt="$t('Global.cancel')"
                    :leftBtnEvent="resetDialog"
                    :rightBtnTxt="$t('Global.yes')"
                    :rightBtnEvent="logOutConfirmed"
                    v-if="confirmBox"
            />
        </v-dialog>
    </v-app-bar>
</template>

<script>
    import {mapGetters} from "vuex"
    import {availableLocale} from "@/config/locale"
    import ToolbarItems from "@/config/toolbar"
    import FlexList from "@/components/UI/List/FlexList/FlexList"
    import ConfirmBox from "@/components/UI/Dialogs/ConfirmBox"
    import has from "lodash/has";
    import EventBus from "@/plugins/event-bus";

    export default {
        props: {
            handleSettingsDrawer: Function,
        },
        data() {
            return {
                notificationCountArea: false,
                notificationCount: 0,
                items: ToolbarItems,
                langs: availableLocale,
                isDarkMode: false,
                notificationArea: false,
                notificationAreaCount: 0,
                componentProps: {
                    title: this.$t("Notification.NewNotifications"),
                    maxWidth: 370,
                    list: [],
                    alignItems: "center",
                },
                confirmBox: false,
                sitename: process.env.VUE_APP_NAME,
            };
        },
        computed: {
            authUser: {
                get: function () {
                    if(this.$store.getters["auth/isLoggedIn"] && this.$store.getters["user/isProfileLoaded"]){
                        let user = this.$store.getters["user/getProfile"]
                        return {
                            name: user.name,
                            surname: user.surname,
                            email: user.email,
                            phoneNumber: user.phone_number,
                            profile_image: user.profile_image ===null ? user.profile_image:require("@/assets/post-resources/avatar-person.svg")
                        }
                    }
                    else{
                        return {
                            name: this.$i18n.t('PostPreviews.anonymous'),
                            surname: this.$i18n.t('PostPreviews.anonymous'),
                            email: 'demo@demo.com',
                            phoneNumber: '-',
                            profile_image: require("@/assets/post-resources/avatar-person.svg")
                        }
                    }
                },
                set: function (authUser) {
                    this.$store.state.user.profile = authUser
                }
            },
            activeItemStyle: (state) => state.activeMenuStyle,
            ...mapGetters("navigations", [
                "isVisibleHeader",
                "isSidenavPositionRight",
                "isClippedOver",
                "isMinSideNav",
                "isDense",
                "isProminent",
                "isHideOnScroll",
                "isShrinkOnScroll",
                "isFloating",
            ]),
            ...mapGetters("scheme", ["header"]),
            ...mapGetters(["locale"]),
            isClippedRight() {
                return this.isClippedOver && this.isSidenavPositionRight;
            },
            isClippedLeft() {
                return this.isClippedOver && !this.isSidenavPositionRight;
            },
            bindStyle() {
                const {color, dark, classes} = this.header;
                return {
                    class: {
                        "vuse-header": true,
                        "with-radius": true,
                        [classes]: true,
                        "mx-6 mt-3": this.isFloating && !this.isClippedOver,
                    },
                    dark,
                    color,
                };
            },
            currentLocaleImg() {
                return this.langs.find((item) => item.value === this.locale).img;
            },
            itm() {
                return this.items.map(this.addLanguagePrefix);
            },
        },
        components: {
            FlexList,
            ConfirmBox: ConfirmBox
        },
        created: function () {
            if (this.$store.getters["auth/isLoggedIn"] && !this.$store.getters["user/isProfileLoaded"]) {
                this.$store.dispatch("user/getUserProfileRequest")
            }

            // Notification Count
            this.$store.dispatch("notifications/getNotificationCount").then((resp) => {
              if (parseInt(resp) !== 0) {
                this.notificationCount = resp
                this.notificationCountArea = true
              }
            })

            // Notification All Data
            this.$store.dispatch("notifications/getNotifications").then((resp) => {
                this.notificationAreaCount = resp.data.count
                this.componentProps.list = resp.data.notifications
            })
        },
        methods: {
            notificationClick() {
              if (this.notificationAreaCount !== 0) {
                this.notificationArea = !this.notificationArea
                this.$store.dispatch("notifications/readNotification")

                this.notificationCountArea = false
                this.notificationCount = 0
              } else {
                this.$store.state.snackbar.snackbarMessage = 'Notification not found'
                this.$store.state.snackbar.snackbarColor = 'error'
                this.$store.state.snackbar.snackbar = true
              }
            },
            toggleMiniVariant() {
                this.$store.dispatch("navigations/setMiniVariant");
            },
            handleSidenavDrawer() {
                this.$store.dispatch("navigations/setSidenavVisibility");
            },
            handleInternationalization(value) {
                this.$store.dispatch("setLocale", value);
            },
            addLanguagePrefix(item) {
                if (!item.i18n){
                    return item
                }
                const {items, ...props} = item;
                const newVal = has(props, "header")
                    ? {header: this.$t(`AppDrawer.${item.i18n}`)}
                    : {title: this.$t(`AppDrawer.${item.i18n}`)};
                const newItem = {
                    ...props,
                    ...newVal,
                };

                if (items) {
                    newItem.items = items.map(this.addLanguagePrefix);
                }

                return newItem;
            },
            logout() {
                this.confirmBox = true
            },
            resetDialog() {
                this.confirmBox = false
            },
            logOutConfirmed() {
                this.$store.dispatch("auth/authLogoutRequest")
                      .then(() => this.$router.push('/auth/login'))
            },
            handleDarkMode(){
                this.isDarkMode = !this.isDarkMode
                this.$vuetify.theme.dark = this.isDarkMode;
                EventBus.$emit('dark-mode-theme', this.isDarkMode);
                this.$store.dispatch("scheme/setDarkTheme", this.isDarkMode);
            }
        },
    };

</script>
<style>
  .private-card-container {
    position: fixed;
    right: 0;
    top: 104%;
  }
  .notification-count {
    position: absolute;
    z-index: 12;
    right: 0;
    top: -13px;
    background: red;
    color: white;
    font-size: 8px;
    padding: 3px 2px;
    border-radius: 50%;
    font-weight: bold;
    width: 16px;
    height: 17px;
    text-align: center;
  }
</style>
