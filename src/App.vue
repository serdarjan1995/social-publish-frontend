<template>
    <v-app>
        <router-view name="sidebar"/>
        <router-view name="header" :handleSettingsDrawer="handleSettingsDrawer"/>
        <v-main class="vuse-content">
            <v-fade-transition>
                <router-view/>
            </v-fade-transition>
        </v-main>
        <router-view name="footer"/>
        <app-settings-drawer
                :handleDrawer="handleSettingsDrawer"
                :drawer="settingsDrawer"
        />
        <v-snackbar v-model="getSnackbarStatus"
                    :color="getSnackbarColor"
        >
            <v-row class="justify-center">
            <span style="margin: auto 0">{{getSnackbarMessage}}</span>
                <v-icon dark v-if="getSnackbarColor==='error'">error</v-icon>
                <v-icon dark v-else>check_circle</v-icon>
            </v-row>
        </v-snackbar>
    </v-app>
</template>

<script>
    import AppSettingsDrawer from "@/layouts/App/AppSettingsDrawer"

    export default {
        data: () => {
            return {
                settingsDrawer: false,
            };
        },
        created: function () {
          //set default theme to semidark
          this.$store.dispatch("scheme/setSemiDarkTheme", true);

            if (this.$store.getters["auth/isLoggedIn"] && !this.$store.getters["user/isProfileLoaded"]) {
               this.$store.dispatch("user/getUserProfileRequest")
            }
        },
        components: {
            AppSettingsDrawer,
        },
        methods: {
            handleSettingsDrawer() {
                this.settingsDrawer = !this.settingsDrawer;
            },
        },
        computed:{
            getSnackbarStatus:{
                get: function () {
                    return this.$store.state.snackbar.snackbar
                },
                set: function (newValue) {
                    this.$store.state.snackbar.snackbar = newValue
                }
            },
            getSnackbarMessage(){
                return this.$store.state.snackbar.snackbarMessage
            },
            getSnackbarColor(){
                return this.$store.state.snackbar.snackbarColor
            },
        }
    };
</script>
