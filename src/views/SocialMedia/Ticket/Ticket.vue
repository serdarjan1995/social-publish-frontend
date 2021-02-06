<template>
  <div class="vuse-content-wrapper ">
    <v-container fluid>
      <v-row class="neu-glow ma-0" dense>
        <v-card-title>
          <v-icon class="mr-2">{{ active_social_icon }}</v-icon>
          {{ active_social_name }}
          {{ $t('AppDrawer.mediaAnalyse') }}
        </v-card-title>
        <v-spacer/>
        <div v-for="(account_group, i) in account_groups" :key="i" class="socialWrapper">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn large icon color="primary" dark v-bind="attrs" v-on="on">
                <v-icon>{{ account_group.social_network[0].icon }} </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(account, index) in account_group.accounts" :key="index" @click="change_data(account_group.social_network[0], account)" >
                <v-list-item-title>{{account.name}}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-row>
    </v-container>
    <inner-base-layout baseLayerClass="neu-glow-inset" innerContainerClass="transparent">
      <template v-slot:sidebar>
        <ticket-sidebar
            :drawer="drawer"
            :items="filteredUsers"
            :clicked="switchGroup"
            @thread_id_event="getEvent($event)"
            :timefunc="time_convert"
            :onToggle="drawerHandler">
          <v-text-field
              v-model="search"
              label="Search User"
              solo
              dense
              flat
              prepend-icon="search"
              hide-details
          ></v-text-field>
        </ticket-sidebar>
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
        <template v-if="check(messages)">
          <ticket-list
              :chat="messages"
              :user="user"
              :timefunc="time_convert"
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
                prepend-icon="send"
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
import TicketSidebar from "@/views/SocialMedia/Ticket/Components/TicketSidebar"
import TicketHeader from "@/views/SocialMedia/Ticket/Components/TicketHeader"
import TicketList from "@/views/SocialMedia/Ticket/Components/TicketList"
import social_networks from "@/data/socialNetworks"

export default {
  components: {
    TicketSidebar,
    TicketHeader,
    TicketList,
    InnerBaseLayout
  },
  data() {
    return {
      page: "Chat",
      search: "",
      drawer: true,
      activeGroupId: null,
      page_icon: null,
      users: [],
      header_user: [],
      user: {},
      messages: {},
      chatMessageEditor: null,
      thread_id: null,
      social_networks: social_networks,
      showProgress: false,
      active_social_icon: null,
      active_social_name: null,
      active_social_id: null,
      active_account_id: null,
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
    filteredUsers:{
      get(){
        if(this.search === ""){
          return this.$store.state.direct_message.chat_users.filter((item) => {
            if(item.account_id === this.active_account_id){
              return item
            }
          })
        }
        else{
          return this.$store.state.direct_message.chat_users.filter((item) => {
            if(item.account_id === this.active_account_id && item.users[0].full_name.toLowerCase().includes(this.search.toLowerCase())){
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
  created() {
    this.$store.dispatch("direct_message/DirectMessageRequest")
        .then(() => {
          this.users = this.$store.state.direct_message.chat_users
        })
    this.$store.dispatch('accounts/getAccountGroup');
  },
  methods: {
    change_data(social_network, account) {
      this.messages = []
      this.header_user = []
      this.active_social_name = social_network.name
      this.active_social_icon = social_network.icon
      this.active_social_id = social_network.id
      this.active_account_id = account.id
    },
    time_convert(val) {
      const timestamp = val.substring(0, 10)
      return new Date(timestamp * 1000).toLocaleString("en-US", {hour12: false})
    },
    getEvent(params) {
      return this.thread_id = params
    },
    check(val) {
      if (val && typeof val.users !== "undefined" && val.users.length) {
        return true
      } else {
        return false
      }
    },
    sendMessage() {
      const req = {
        threadID: this.messages.id,
        message: this.chatMessageEditor,
      }
      this.$store.dispatch("direct_message/SendDirectMessageRequest", req)
          .then(() => {
            this.chatMessageEditor = null
            this.switchGroup(this.thread_id)
          })
    },
    switchGroup(user) {
      const obj = {
        id: user
      }
      this.$store.dispatch("direct_message/ShowDirectMessageRequest", obj).then(() => {
        this.messages = this.$store.state.direct_message.chat_messages
        this.header_user = this.$store.state.direct_message.chat_messages.users
        this.user = this.messages.user
      })
      this.activeGroupId = user;
    },
    drawerHandler() {
      this.drawer = !this.drawer;
    }
  }
};
</script>

