<template>
  <div class="vuse-content-wrapper ">
    <v-container fluid>
      <v-row class="ma-0" dense>
        <v-card-title>
          My Tickets
        </v-card-title>
      </v-row>
    </v-container>
    <inner-base-layout>
      <template v-slot:sidebar>
        <ticket-page-sidebar
            :drawer="drawer"
            :items="filteredUsers"
            :active-id="activeGroupId"
            :clicked="switchGroup"
            :onToggle="drawerHandler">
          <v-text-field
              v-model="search"
              label="Search Ticket"
              solo
              dense
              flat
              prepend-icon="search"
              hide-details
          ></v-text-field>
        </ticket-page-sidebar>
      </template>
      <template v-slot:header>
        <div>
          <ticket-header
              :drawer="drawer"
              :message_user="header_user"
              :onToggleDrawer="drawerHandler"
          />
        </div>
        <v-divider></v-divider>
        <template v-if="check(myMessages)">
          <ticket-page-list
              :chat="myMessages"
              :user="user"
          />
          <div>
            <v-textarea
                class="chat-input"
                name="message"
                placeholder="Write your message ..."
                auto-grow
                outlined
                solo
                rows="1"
                full-width
                hide-details
                append-icon="send"
                v-model="chatMessageEditor"
                @click:append="sendMessage"
            ></v-textarea>
          </div>
        </template>

        <template v-else>
          <div class="ma-auto">
            <v-icon size="64" color="success" class="ma-auto">library_add</v-icon>
          </div>
        </template>
      </template>
    </inner-base-layout>
  </div>
</template>
<script>
import InnerBaseLayout from "@/layouts/Inner/Layout"
import TicketPageSidebar from "@/views/SocialMedia/Ticket/Components/TicketPageSidebar"
import TicketHeader from "@/views/SocialMedia/Ticket/Components/TicketHeader"
import TicketPageList from "@/views/SocialMedia/Ticket/Components/TicketPageList"
import {tickets} from "@/data/dummyData"
import social_networks from "@/data/socialNetworks"

export default {
  components: {
    TicketPageSidebar,
    TicketHeader,
    TicketPageList,
    InnerBaseLayout
  },
  data() {
    return {
      page: "UserTicket",
      search: "",
      drawer: true,
      activeGroupId: null,
      page_icon: null,
      users: [],
      header_user: [],
      user: null,
      messages: null,
      chatMessageEditor: null,
      thread_id: null,
      social_networks: social_networks,
      showProgress: false,
      active_account_id: 14,
      items : tickets
    };
  },
  computed:{
    account_groups:{
      get() {
        return this.$store.state.accounts.accountList
      },
      set(newValue) {
        this.$store.state.accounts.accountList = newValue
      }
    },
    myMessages:{
      get() {
        return this.messages
      },
      set(newValue) {
        this.messages = newValue
      }
    },
    filteredUsers:{
      get(){
        if(this.search === ""){
          return this.items
        }
        else{
          return this.items.filter((item) => {
            if(item.title.toLowerCase().includes(this.search.toLowerCase()) || item.id.toString().includes(this.search.toLowerCase()) ){
              return item
            }
          })
        }
      },
      set(newValue){
        this.$store.state.direct_message.chat_users = newValue
      }
    }
  },
  methods: {
    check(items){
      if(items)
        return true
      else
        return false
    },
    sendMessage() {
    },
    switchGroup(item) {
      this.activeGroupId = item.id;
      this.messages = item.messages
      this.user = item.user
    },
    drawerHandler() {
      this.drawer = !this.drawer;
    }
  }
};
</script>
