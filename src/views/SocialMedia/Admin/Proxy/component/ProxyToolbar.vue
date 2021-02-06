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
                    v-model="searchInput"
                    label="Search Proxy"
                    solo
                    clear-icon="clear_all"
                    :append-icon="$vuetify.breakpoint.smAndDown ? 'close' : ''"
                    prepend-inner-icon="search"
                    class="input-width-3x mr-3"
                    dense
                    hide-details
                    clearable=""
            ></v-text-field>
        </v-scale-transition>

        <v-scale-transition>
          <div class="my-2 btn-private" >
            <v-btn small color="error" @click="userStatus(false)" class="" dark>DELETE</v-btn>
          </div>
        </v-scale-transition>

        <v-spacer></v-spacer>
        <v-scale-transition>
            <v-btn
                    icon
                    @click="onBulkDelete"
                    v-if="showBulkActionOptions"
            >
                <v-icon color="error">delete</v-icon>
            </v-btn>
        </v-scale-transition>

        <v-spacer></v-spacer>

        <v-btn ab @click="$emit('open-create-dialog')"
                class="box-glow"
                fab
                x-small
                dark
                v-if="!hideBtnWhileSearch"
        >
            <v-icon>add</v-icon>
        </v-btn>

    </v-toolbar>
</template>

<script>
    import EventBus from "@/plugins/event-bus";
    export default {
        data () {
            return {
                selectionAll: false,
                showSearch: false,
            }
        },
        props: {
            drawer:{
                type:Boolean,
                required:true,
                default: true
            },
            onSelectAll: Function,
            onUnselectAll: Function,
            onBulkDelete: Function,
            showBulkActionOptions: Boolean,
            search: String
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
            },
            searchInput: {
                get: function(){
                    return this.search;
                },
                set: function(newValue){
                    console.log(newValue)
                    EventBus.$emit('changeSearchProxyToolbar', newValue)
                }
            },
        },

        methods: {
            handleSelectAll() {
                if (this.selectionAll) {
                    this.onSelectAll();
                } else {
                    this.onUnselectAll();
                }
            }
        },

        watch: {
          onSelectAll(data){
            console.log("onSelectAll:",data)
          },
          onUnselectAll(data){
            console.log("onUnselectAll:",data)
          },
          onBulkDelete(data){
            console.log("onBulkDelete:",data)
          },
          showBulkActionOptions(data){
            console.log("showBulkActionOptions:",data)
          }
        }
    };
</script>
