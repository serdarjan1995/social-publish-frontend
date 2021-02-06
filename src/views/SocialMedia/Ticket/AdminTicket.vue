<template>
  <div class="vuse-content-wrapper contact-app">
    <vuse-section-definition
        :title="$t('UserManager.UserManagement')"
        icon="contacts"
    />
    <inner-base-layout
        baseLayerClass="neu-glow-inset"
        innerContainerClass="transparent"
    >
      <template v-slot:sidebar>
        <page-sidebar
            :drawer="drawer"
            :items="menuItems"
            :activeItem="activeMenu"
            :itemClicked="setActiveOption"
            :onToggle="drawerHandler"
        />
      </template>
      <template v-slot:content>
        <v-sheet height="100%" color="transparent" v-if="listContact.length">
          <v-card>
            <v-card-title>
              <v-spacer></v-spacer>
              <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
                :headers="headers"
                :items="listContact"
                :search="search"
            >
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="logConsole(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="logConsole(item)">
                  mdi-delete
                </v-icon>
              </template>
            </v-data-table>
          </v-card>
        </v-sheet>
      </template>
    </inner-base-layout>
  </div>
</template>
<script>

import {filter} from "lodash"
import {contacts} from "@/data/dummyData"
import InnerBaseLayout from "@/layouts/Inner/Layout"
import PageSidebar from "@/views/SocialMedia/Ticket/Components/PageSidebar"

export default {
  data() {
    return {
      dialog: false,
      namespace: "Ticket",
      page: "AdminTicket",
      breadcrumbs: [
        {
          text: "Tickets",
          disabled: true,
        },
      ],
      headers: [
        { text: 'Ticket No', value: 'id' },
        { text: 'Name Surname', value: 'name_surname' },
        { text: 'Belongs To', value: 'belongs_to' },
        { text: 'Started Time', value: 'started_time' },
        { text: 'End Time', value: 'end_time' },
        { text: 'Email', value: 'email' },
        { text: 'Phone', value: 'phone' },
        { text: 'Actions', value: 'actions' },
      ],
      date: null,
      search: null,
      drawer: true,
      activeMenu: "active",
      menuItems: [
        { title: "Active", isActive: true, slug: "active", icon: "mdi-bell-ring" },
        { title: "Waiting", isActive: false, slug: "waiting" },
        { title: "Finished", isActive: false, slug: "finished" },
      ],
      rolesData: [],
      originalUsersData: [],
    };
  },
  components: {
    PageSidebar,
    InnerBaseLayout,
  },
  methods: {
    logConsole(item){
      console.log(item)
    },
    setActiveOption(item) {
      this.activeMenu = item.slug;
    },
    drawerHandler() {
      this.drawer = !this.drawer;
    },
    searchHandler(val) {
      this.search = val;
    },
  },
  computed: {
    activeTickets() {
      return filter(contacts, (element) => element.is_active);
    },
    waitingTickets() {
      return filter(contacts, (element) => element.is_waiting);
    },
    finishedTickets() {
      return filter(contacts, (element) => element.is_finished);
    },
    listContact() {
      let list = contacts;
      switch (this.activeMenu) {
        case "active":
          list = this.activeTickets;
          break;
        case "waiting":
          list = this.waitingTickets;
          break;
        case "finished":
          list = this.finishedTickets;
          break;
      }
      let myArray = []
      list.forEach((item) =>{
        let myObject = new Object
        myObject.id = item.id
        myObject.name_surname = item.firstname+" "+item.surname
        myObject.email = item.email
        myObject.started_time = "29.12.2020 13:45"
        myObject.end_time = "29.12.2020 13:45"
        myObject.belongs_to = "John Dohn"
        myObject.phone = item.phone
        myArray.push(myObject)
      })
      return myArray
    },
  },
  created(){
    this.$store.dispatch("users_manager/getUsers", this.form).then((response) => {
      this.contacts           = response.data.message
      this.originalUsersData  = response.data.message
    })
  },
};
</script>
<style scoped>
.toobar-extension {
  margin-left: 0 !important;
  min-width: 300px;
}
.v-input.theme--light.v-text-field.v-text-field--is-booted {
  padding-top: 1px !important;
  margin-top: 3px !important;
}
.v-dialog > .v-card > {
  padding: 10px 16px 0 !important;
}
.v-card__actions {
  padding: 1px 8px !important;
}
.v-card__text.px-0 {
  padding: 10px 0 0 !important;
}
</style>
<style>
.private-width {
  max-width: 60px;
}
.private-width-two {
  max-width: 120px;
}
</style>