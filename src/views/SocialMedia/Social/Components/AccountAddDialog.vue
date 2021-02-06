<template>
  <v-row justify="center">
    <v-dialog
          v-model="show"
          width="60%"
          v-bind:contentClass="this.$parent.isDark?'shadowed-box-lightgray':'shadowed-box-black'"
    >
      <v-card>
        <v-toolbar dense>
          <v-icon class="mr-2">mdi-account-group</v-icon>
          <v-toolbar-title>{{$t('AccountManager.add_account')}}</v-toolbar-title>
          <v-spacer/>
          <v-btn icon @click="$emit('account-manager-add-dialog-close')">
            <v-icon small>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container
              v-if="data.length > 0"
              fluid
        >
          <v-row>
            <v-col cols="12" sm="3" v-for="(item, index) in data" :key="index">
              <v-card
                    v-for="(category,i) in accountCategoryById(item.id)"
                    :key="'cat-'+i"
              >
                <v-card-title
                      class="ma-0 pt-0 pb-0"
                      @click="addAccount(item,category)"
                >
                  <v-list-item-avatar>
                    <v-icon large :style="'color:'+item.color">{{item.icon}}</v-icon>
                  </v-list-item-avatar>
                  <v-toolbar-title>
                    <v-list-item-title>{{item.name}}</v-list-item-title>
                    <v-list-item-title style="font-style: italic">{{category}}</v-list-item-title>
                  </v-toolbar-title>
                </v-card-title>

              </v-card>
            </v-col>
          </v-row>

        </v-container>

      </v-card>
    </v-dialog>

    <v-dialog
          v-model="show_child"
          width="40%"
          v-bind:contentClass="this.$parent.isDark?'shadowed-box-lightgray':'shadowed-box-black'"
    >
      <v-card justify="center" style="margin: 0 auto">
        <v-toolbar dense>
          <v-icon class="mr-2">mdi-account-group</v-icon>
          <v-toolbar-title>{{$t('AccountManager.add_fb_groups_and_pages')}}</v-toolbar-title>
          <v-spacer/>
          <v-btn icon @click='show_child = false'>
            <v-icon small>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container v-for="(account,i) in getFacebookAccounts"
                     :key="'account'+i"
        >
          <div @click="accountClicked(account)">
            <account-list-item
                  :name="account.name"
                  :avatar="account.avatar_url || account.avatar"
                  :avatar_size="accounts.length === 0 ? 50: 70"
                  :category="account.category"
                  :fan_count="account.fan_count"
                  :link="account.link"
            >
              <template v-slot:checkbox v-if="accounts.length > 0">
                <v-checkbox
                      v-model="accountSelectionArray"
                      :value="account.id"
                      class="ma-0 very-small"
                      style="position:absolute; right:3px; z-index: 1"
                      hide-details
                      :ripple=false
                />
              </template>
            </account-list-item>
          </div>
        </v-container>
        <v-container v-if="loading" class="pop-up">
          <v-row justify="center">
            <v-progress-circular
                  :size="50"
                  :width="7"
                  indeterminate
                  style="position: absolute; top: 50%"
            ></v-progress-circular>
          </v-row>
        </v-container>
        <v-container v-if="accounts.length > 0"
                     fill-height fill-width class="pa-0" style="display: inline-block">
          <v-btn color="primary" class="mb-4 mr-4"
                 style="float: right"
                 :disabled="accountSelectionArray.length === 0"
                 @click="addSelectedAccounts"
          >{{$t('AccountManager.add_account')}}</v-btn>
        </v-container>
      </v-card>
    </v-dialog>



    <v-dialog
          v-model="show_child_linkedin"
          width="40%"
          v-bind:contentClass="this.$parent.isDark?'shadowed-box-lightgray':'shadowed-box-black'"
    >
      <v-card justify="center" style="margin: 0 auto">
        <v-toolbar dense>
          <v-icon class="mr-2">mdi-account-group</v-icon>
          <v-toolbar-title>{{$t('AccountManager.add_fb_groups_and_pages')}}</v-toolbar-title>
          <v-spacer/>
          <v-btn icon @click='show_child_linkedin = false'>
            <v-icon small>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container v-for="(account,i) in getLinkedinAccounts"
                     :key="'account'+i"
        >
          <div @click="accountClicked(account)">
            <account-list-item
                  :name="account.name"
                  :avatar="account.avatar_url || account.avatar"
                  :avatar_size="accounts.length === 0 ? 50: 70"
                  :category="account.category"
                  :fan_count="account.fan_count"
                  :link="account.link"
            >
              <template v-slot:checkbox v-if="accounts.length > 0">
                <v-checkbox
                      v-model="accountSelectionArray"
                      :value="account.key"
                      class="ma-0 very-small"
                      style="position:absolute; right:3px; z-index: 1"
                      hide-details
                      :ripple=false
                />
              </template>
            </account-list-item>
          </div>
        </v-container>
        <v-container v-if="loading" class="pop-up">
          <v-row justify="center">
            <v-progress-circular
                  :size="50"
                  :width="7"
                  indeterminate
                  style="position: absolute; top: 50%"
            ></v-progress-circular>
          </v-row>
        </v-container>
        <v-container v-if="accounts.length > 0"
                     fill-height fill-width class="pa-0" style="display: inline-block">
          <v-btn color="primary" class="mb-4 mr-4"
                 style="float: right"
                 :disabled="accountSelectionArray.length === 0"
                 @click="addSelectedAccountsLinkedin"
          >{{$t('AccountManager.add_account')}}</v-btn>
        </v-container>
      </v-card>
    </v-dialog>



  </v-row>
</template>

<script>
import AccountListItem from "@/views/SocialMedia/Social/Components/AccountListItem";
    export default {
        name: "AccountAddDialog",
        components:{
            AccountListItem,
        },
        data() {
            return {
                show_child: false,
                show_child_linkedin: false,
                category: '',
                loading: false,
                accounts: [],
                parent_id: null,
                accountSelectionArray: [],
                getAccount: []
            }
        },
        props: {
            data: Array,
            model: Boolean,
        },
        computed: {
            show:{
                get() {
                    return this.model
                },
                set() {
                    this.$emit('account-manager-add-dialog-close')
                }
            },
            getFacebookAccounts: {
                get() {
                    return this.accounts.length === 0 ?
                        this.$store.state.accounts.accountList.filter((item)=>{
                            return item.social_network_id ===1 && item.category === 'profile' ?item:null
                        })
                        :this.accounts
                },
                set(val) {
                    this.accounts = val
                }
            },
            getLinkedinAccounts: {
                get() {
                    return this.accounts.length === 0 ?
                        this.$store.state.accounts.accountList.filter((item)=>{
                            return item.social_network_id ===4 && item.category === 'profile' ?item:null
                        })
                        :this.accounts
                },
                set(val) {
                    this.accounts = val
                }
            }
        },
        methods: {
            accountCategoryById(id){
                let socialNetworkItem = this.$store.state.accounts.categories.find(
                    item => {return item.social_network_id === id})
                if(socialNetworkItem){
                    return socialNetworkItem.category
                }
                else{
                    return null
                }
            },
            addAccount(social_network,category){
                // Facebook
                if(social_network.id === 1 && (category === 'group' || category === 'page')){
                    if(this.getFacebookAccounts.length >0){
                        this.getAccount = this.getFacebookAccounts;
                        console.log("get account", this.getAccount)
                        this.show_child = true
                        this.category = category
                    }
                    else{
                        this.$store.state.snackbar.snackbarMessage =
                        this.$i18n.t('AccountManager.add_profile_account_first',{name:'Facebook'})
                        this.$store.state.snackbar.snackbarColor = 'error'
                        this.$store.state.snackbar.snackbar = true
                    }
                    return

                // Linkedin
                } else if (social_network.id === 4 && category === 'company') {
                  if(this.getLinkedinAccounts.length >0){
                      this.getAccount = this.getLinkedinAccounts;
                      this.show_child_linkedin = true
                      this.category = category
                    }
                    else{
                      this.$store.state.snackbar.snackbarMessage =
                          this.$i18n.t('AccountManager.add_profile_account_first',{name:'Linkedin'})
                      this.$store.state.snackbar.snackbarColor = 'error'
                      this.$store.state.snackbar.snackbar = true
                    }
                    return
                }
                let payload = {social_network_id:social_network.id, category: category}
                this.$store.dispatch('accounts/getAddAccountLink', payload)
                    .then((resp) => {
                        let uri = resp.link.uri
                        console.log(uri)
                        if (social_network.id === 3 && resp.link.type === 'login'){
                            this.emitEvent('account-manager-add-instagram-account-show')
                        }
                        else{
                            window.location = uri
                        }
                    })
                .catch((e) => {
                    console.log(e)
                })
            },
            getCompany(account){
                this.loading = true
                this.parent_id = account.id
                this.$store.dispatch('linkedin_accounts/getLinkedinPages',account)
                    .then((resp) => {
                      console.log("Detay resp", resp)
                      this.getLinkedinAccounts = resp
                      this.loading = false
                    })
                    .catch((e) => {
                      console.log("Detay e", e)
                      this.loading = false
                    })
            },
            getFacebookPages(account){
                this.loading = true
                this.parent_id = account.id
                let payload = {id:account.id}
                this.$store.dispatch('facebook_accounts/getFacebookPages',payload)
                    .then((resp) => {
                        this.getFacebookAccounts = resp.data.pages
                        this.loading = false
                    })
                    .catch((e) => {
                        console.log(e)
                        this.loading = false
                    })
            },
            getFacebookGroups(account){
                this.loading = true
                this.parent_id = account.id
                let payload = {id:account.id}
                this.$store.dispatch('facebook_accounts/getFacebookGroups',payload)
                    .then((resp) => {
                        this.getFacebookAccounts = resp.data.groups
                        this.loading = false
                    })
                    .catch((e) => {
                        console.log(e)
                        this.loading = false
                    })
            },
            accountClicked(account){
                // Facebook
                if (account.social_network_id === 1) {
                  if(this.accounts.length > 0){
                    return null
                  }
                  else if(this.category==='page'){
                    this.getFacebookPages(account)
                  }
                  else if(this.category==='group'){
                    this.getFacebookGroups(account)
                  }

                // Linkedin
                } else if (account.social_network_id === 4) {
                  this.getCompany(account)
                }
            },
            addSelectedAccounts(){
                let req = {
                    parent_id: this.parent_id,
                    accounts: this.accountSelectionArray,
                }
                if (this.category === 'page'){
                    this.$store.dispatch("facebook_accounts/addFacebookPages", req)
                        .then(() => {
                            this.$store.dispatch('accounts/getAccountAll')
                            this.$store.dispatch('accounts/getAccountGroup')
                            this.show_child = false;
                            this.show = false
                            this.accountSelectionArray = []
                        })
                }
                else if (this.category === 'group'){
                    this.$store.dispatch("facebook_accounts/addFacebookGroups", req)
                        .then(() => {
                            this.$store.dispatch('accounts/getAccountAll')
                            this.$store.dispatch('accounts/getAccountGroup')
                            this.show_child = false;
                            this.show = false
                            this.accountSelectionArray = []
                        })
                }

            },
            addSelectedAccountsLinkedin(){
              let req = {
                parent_id: this.parent_id,
                accounts: this.accountSelectionArray,
              }

              this.$store.dispatch("linkedin_accounts/addLinkedinPages", req)
                  .then((resp) => {
                    console.log("end resp", resp)
                    this.$store.dispatch('accounts/getAccountAll')
                    this.$store.dispatch('accounts/getAccountGroup')
                    this.show_child_linkedin = false;
                    this.show = false
                    this.accountSelectionArray = []
                  })
                  .catch((e) => {
                    console.log("end e", e)
                  })
            },
            emitEvent(event_name){
                this.$emit(event_name)
            }
        },
        created() {
            if (!this.$store.getters["accounts/isCategoriesLoaded"]) {
                this.$store.dispatch("accounts/getSocialMediaCategories")
            }
        },
        mounted() {
        },
        watch:{
            show_child: function (val) {
                if(!val){
                    this.accounts = []
                }
            }
        }
    }
</script>

<style>
  .shadowed-box-lightgray {
    box-shadow: 0 0 10px rgb(153, 167, 175) !important;
  }
  .shadowed-box-black {
    box-shadow: 0 0 10px rgb(36, 41, 43) !important;
  }
  .pop-up{
    position: absolute;
    top: 0;
    background-color: rgba(150,150,150,0.5);
    height: 100%;
  }
</style>
