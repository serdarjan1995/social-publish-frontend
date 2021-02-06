<template>
    <v-toolbar
            flat
            color="transparent"
    >

        <v-checkbox
                :value="selectionAll"
                v-model="selectionAll"
                hide-details
                @change="handleSelectAll($event)"
        ></v-checkbox>
        <v-scale-transition>
            <v-app-bar-nav-icon
                    @click.stop="onToggleDrawer"
                    class="hidden-md-and-up"
            ></v-app-bar-nav-icon>
        </v-scale-transition>

        <v-scale-transition>
            <v-text-field
                    :value="search"
                    :label="$t('UserManager.UsertoSearch')"
                    solo
                    prepend-inner-icon="search"
                    class="input-width-3x mr-3"
                    dense
                    @input="$emit('onSearch', $event)"
                    @click:append="handleSearchVisibility()"
                    hide-details
                    clearable=""
                    v-if="isSearchVisible"
            >
            </v-text-field>
        </v-scale-transition>



        <v-spacer></v-spacer>
        <v-scale-transition
            v-if="showBulkActionOptions">
            <div class="my-2 btn-private" >
              <v-btn small color="success" @click="userStatus(true)" class="mx-1" dark>TRUE</v-btn>
              <v-btn small color="error" @click="userStatus(false)" class="" dark>FALSE</v-btn>
            </div>
        </v-scale-transition>
        <v-slide-y-transition>
            <v-btn
                    class="box-glow mx-2"
                    fab
                    x-small
                    dark
                    @click="handleSearchVisibility()"
                    v-if="!isSearchVisible"
            >
                <v-icon>search</v-icon>
            </v-btn>
        </v-slide-y-transition>
        <v-slide-y-transition>
            <v-btn
                    class="box-glow"
                    fab
                    x-small
                    dark
                    @click="addContactDialog"
                    v-if="!hideBtnWhileSearch"
            >
                <v-icon>add</v-icon>
            </v-btn>
        </v-slide-y-transition>
    </v-toolbar>
</template>

<script>
    export default {
        props: {
            drawer: {
                type: Boolean,
                default: true,
            },
            search: {
                type: String,
                default: null,
            },
            selectedContact: Array,
            showBulkActionOptions: Boolean,
            onSelectAll: Function,
            onUnselectAll: Function,
            onBulkDelete: Function,
            addContactDialog: Function,
            onToggleDrawer: Function
        },
        data () {
            return {
                selectionAll: false,
                showSearch: false,
            }
        },
        computed: {
            isSearchVisible: {
                get () {
                    return !this.$vuetify.breakpoint.smAndDown || this.showSearch
                },
                set (val) {
                    this.showSearch = val;
                }
            },
            hideBtnWhileSearch () {
                return this.$vuetify.breakpoint.smAndDown && this.showSearch
            }
        },
        methods: {
            handleSelectAll () {
                if (this.selectionAll) {
                    this.onSelectAll();
                } else {
                    this.onUnselectAll();
                }
            },
            handleSearchVisibility () {
                this.showSearch = !this.showSearch;
            },
            userStatus (userStatus) {
                let sendData  = {
                  'selectedData': this.selectedContact,
                  'type': userStatus
                }
                this.$store.dispatch("users_manager/userStatus", sendData).then(() => {
                    location.reload()
                })
                .catch((e) => {
                  console.log(e)
                })
            }
        },
        watch: {
          //
        }
    }
</script>

<style>
  .btn-private {
    position: absolute;
    right: 55px;
  }
</style>