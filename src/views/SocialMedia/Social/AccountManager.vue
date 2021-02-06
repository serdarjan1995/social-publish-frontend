<template>
  <div class="vuse-content-wrapper chat-app">
    <v-breadcrumbs :items="breadcrumbs_items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
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
              label="Search Social List"
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
              @account-manager-add-account="showAddDialog(true)"
          />
        </div>
        <v-divider></v-divider>
      </template>
      <template v-slot:content>
        <div v-if="activeSocialId !== 0">
          <template>
            <container-column
                :items="socialType"
                :onEdit="openEditDialog"
                :onDelete="openDeleteDialog"
            />
          </template>
        </div>
        <div v-else>
          <template>
            <container-all-list
                :items="groupsRegulated"
                :onEdit="openEditDialog"
                :onDelete="openDeleteDialog"
            />
          </template>
        </div>
      </template>
    </inner-base-layout>

    <v-sheet class="transparent">
      <account-add-dialog
            :data="socialDataList"
            @account-manager-add-dialog-close="showAddDialog(false)"
            @account-manager-add-instagram-account-show="showInstagramAddDialog(true)"
            :model="accountAddDialog"
      ></account-add-dialog>
      <account-edit-dialog
            :account-edit-dialog="accountEditDialog"
            v-if="accountEditDialog"
            :account-edit-item="this.dialogItem"
      ></account-edit-dialog>
      <account-delete-dialog
            :account-delete-dialog="accountDeleteDialog"
            v-if="accountDeleteDialog"
            :account-delete-item="this.dialogItem"
      ></account-delete-dialog>

      <instagram-account-add-dialog
            :model="instagramAddDialog"
            @account-manager-add-instagram-account-close="showInstagramAddDialog(false)"
      ></instagram-account-add-dialog>
    </v-sheet>

  </div>
</template>
<script>
  import {find} from "lodash";
  import ContainerSidebarList from "@/views/SocialMedia/Social/Components/ContainerSidebarList"
  import ContainerHeader from "@/views/SocialMedia/Social/Components/ContainerHeader"
  import ContainerColumn from "@/views/SocialMedia/Social/Components/ContainerColumn"
  import ContainerAllList from "@/views/SocialMedia/Social/Components/ContainerAllList"
  import AccountDeleteDialog from "@/views/SocialMedia/Social/Components/AccountDeleteDialog";
  import AccountAddDialog from "@/views/SocialMedia/Social/Components/AccountAddDialog";
  import AccountEditDialog from "@/views/SocialMedia/Social/Components/AccountEditDialog";
  import InstagramAccountAddDialog from "@/views/SocialMedia/Social/Components/InstagramAccountAddDialog";
  import InnerBaseLayout from "@/layouts/Inner/Layout"
  import EventBus from "@/plugins/event-bus";

  export default {
    components: {
      ContainerSidebarList,
      ContainerHeader,
      ContainerColumn,
      ContainerAllList,
      AccountDeleteDialog,
      AccountEditDialog,
      AccountAddDialog,
      InnerBaseLayout,
      InstagramAccountAddDialog
    },
    data() {
      return {
        search: '',
        drawer: true,
        breadcrumbs_items: [
            {
                text: "Account manager",
                disabled: true,
            },
        ],
        accountEditDialog: false,
        accountDeleteDialog: false,
        accountAddDialog: false,
        instagramAddDialog: false,
        dialogItem: null,
        activeSocialId: 0,
      };
    },
    computed: {
      socialDataList:{
          get() {
              return this.$store.state.social_medias.socialMediaList
          },
          set(newValue) {
              this.$store.state.social_medias.socialMediaList = newValue
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
      socialType() {
        return this.accountAll.filter((item) =>
            item.social_network_id === this.activeSocialId?item:null
        );
      },
      accountAll(){
          return this.$store.state.accounts.accountList
      },
      groupsRegulated(){
          return this.$store.state.accounts.accountGroupRegulated
      }
    },
    watch: {

    },
    methods: {
      openEditDialog(item) {
        this.dialogItem = item;
        this.accountEditDialog = true;
      },
      openDeleteDialog(item) {
        this.dialogItem = item;
        this.accountDeleteDialog = true;
      },
      switchType(list) {
        this.activeSocialId = list.id
      },
      drawerHandler() {
        this.drawer = !this.drawer
      },
      showAddDialog(value){
          this.accountAddDialog = value
      },
      showInstagramAddDialog(value){
          this.instagramAddDialog = value
      }
    },
    created() {
      this.$store.dispatch('social_medias/getSocialMediaList')
      this.$store.dispatch('accounts/getAccountAll')
      this.$store.dispatch('accounts/getAccountGroup')
    },
    mounted() {
      EventBus.$on('closeAccountEditDialog', () => {
        this.accountEditDialog = false;
      })
      EventBus.$on('closeAccountDeleteDialog', () => {
        this.accountDeleteDialog = false;
      })
    }
};

</script>
