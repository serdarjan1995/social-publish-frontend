<template>
  <div class="vuse-content-wrapper">
    <v-container fill-height fill-width>
      <v-row justify="center" v-if="showProgress">
        <v-progress-circular
              :size="100"
              :width="7"
              indeterminate
              style="margin: 0 auto"
        ></v-progress-circular>
      </v-row>
      <v-card width="60%" justify="center" style="margin: 0 auto" v-else-if="responseLoaded">
        <v-toolbar dense>
          <v-icon class="mr-2">mdi-account-group</v-icon>
          <v-toolbar-title>{{$t('AccountManager.add_fb_groups_and_pages')}}</v-toolbar-title>
          <v-spacer/>
          <v-btn icon @click='$router.push({name:"Accountmanager"})'>
            <v-icon small>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container v-for="(account,i) in accountsArr" :key="'account'+i">
          <account-list-item
                :name="account.name"
                :avatar="account.avatar"
                :category="account.category"
                :fan_count="account.fan_count"
                :link="account.link"
          >
            <template v-slot:checkbox>
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
        </v-container>
        <v-btn color="primary" class="mb-4 mr-4"
               style="float: right"
               @click="addSelectedAccounts"
        >{{$t('AccountManager.add_account')}}</v-btn>
      </v-card>
    </v-container>
  </div>
</template>

<script>
  import AccountListItem from "@/views/SocialMedia/Social/Components/AccountListItem";

export default {
  name: "Callback",
  components:{
      AccountListItem
  },
  data: () =>{
      return{
          showProgress: false,
          accountSelectionArray: [],
          accountsArr: [],
          parent_id: null,
          responseLoaded: false,
      }
  },
  created() {
    this.showProgress = true;
    let req;
    switch (this.$route.params.provider){
      case 'twitter':
        req = {
          provider: this.$route.params.provider,
          user: this.$route.query.user,
          oauth_token: this.$route.query.oauth_token,
          oauth_verifier: this.$route.query.oauth_verifier,
        }
        this.$store.dispatch("accounts/sendTwitterAuthData", req);

        break;

      default:

        req = {
          provider: this.$route.params.provider,
          code: this.$route.query.code,
        }

        this.$store.dispatch("accounts/sendProviderCode", req)
            .then((resp) => {
                this.showProgress = false;
                console.log(resp.accounts,resp.accounts !== [])
                if (req.provider === 'facebook' && typeof(resp.accounts) !== 'undefined' && resp.accounts.length){
                    this.accounts = resp.accounts
                    this.parent_id = resp.parent_id
                    this.responseLoaded = true
                }
                else{
                    this.backToAccountManagerPage()
                }
              }
            ).catch(()=>{
                this.showProgress = false;
                this.backToAccountManagerPage()
            });
    }

  },
    computed:{
        accounts:{
            get() {
                return this.accountsArr;
            },
            set(newValue) {
                this.accountsArr = newValue;
            }
        },
    },
    methods:{
        addSelectedAccounts(){
            console.log(this.parent_id)
            console.log(this.accountSelectionArray)
            let req = {
                parent_id: this.parent_id,
                accounts: this.accountSelectionArray,
            }
            this.$store.dispatch("facebook_accounts/addFacebookUserAccounts", req)
        },
        backToAccountManagerPage(){
            this.$router.push({name:"Accountmanager"})
        }
    }
}
</script>

<style scoped>

</style>