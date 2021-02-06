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
        <user-sidebar
            :drawer="drawer"
            :items="menuItems"
            :activeItem="activeMenu"
            :itemClicked="setActiveOption"
            :onToggle="drawerHandler"
        />
      </template>
      <template v-slot:header>
        <div>
          <user-header
              :drawer="drawer"
              :onSelectAll="selectAll"
              :onUnselectAll="unselectAll"
              :onToggleDrawer="drawerHandler"
              :selectedContact="selectedContacts"
              :showBulkActionOptions="showBulkActionOptions"
              :onBulkDelete="
              () => {
                contacts = unselectedContacts;
              }
            "
              :addContactDialog="
              () => {
                contactDialog = !contactDialog;
              }
            "
              :search="search"
              @onSearch="searchHandler"
          />
        </div>
        <v-divider></v-divider>
      </template>
      <template v-slot:content>

        <template>
          <v-row justify="center">
          <!--     DIALOG       -->
            <v-dialog v-model="dialog" width="600px">
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ alertHeader }}</span>
                </v-card-title>
                <v-card-text>{{ alertContent }}</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="dialog = false"
                  >OK</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </template>

        <v-sheet height="100%" color="transparent" v-if="listContact.length" style="display: inline list-item;">
          <v-list
              two-line
              flat
              class="transparent"
              :style="{ 'overflow-x': 'hidden' }"
          >

            <user-tables-header></user-tables-header>
            <template v-for="(item, index) in listContact">
              <user-row
                  :key="`${index}-listcontact`"
                  :onEdit="editContact.bind(item)"
                  :item="item"
                  :SendMessage="SendMessage.bind(item)"
              />
            </template>

          </v-list>
        </v-sheet>
      </template>
    </inner-base-layout>
    <!-- Delete Contact confirmbox -->
    <v-dialog v-model="confirmBox.deleteContact" max-width="290">
      <confirm-box
          title="Delete Contact ?"
          subtitle="Are you sure you want to delete the Contact ?"
          leftBtnTxt="Cancel"
          :leftBtnEvent="resetDialog"
          rightBtnTxt="Delete"
          :rightBtnEvent="remove"
          v-if="confirmBox.deleteContact"
      />
    </v-dialog>
    <!-- Create Contact Modal -->
    <v-dialog v-model="contactDialog" scrollable persistent max-width="375">
      <v-card max-width="375" class="mx-auto" v-if="contactDialog">
        <v-card-text class="px-0">
          <v-list two-line>
            <v-list-item>
              <v-text-field
                  :error-messages="fieldErrors('form.name')"
                  @input="$v.form.name.$touch()"
                  @blur="$v.form.name.$touch()"
                  prepend-icon="person"
                  :label="$t('UserManager.FormName')"
                  v-model="form.name"
                  required
              ></v-text-field>
            </v-list-item>
            <v-list-item>
              <v-text-field
                  prepend-icon="person"
                  :label="$t('UserManager.FormSurname')"
                  v-model="form.surname"
              ></v-text-field>
            </v-list-item>

            <v-list-item>
              <v-text-field
                  :error-messages="fieldErrors('form.email')"
                  @input="$v.form.email.$touch()"
                  @blur="$v.form.email.$touch()"
                  prepend-icon="email"
                  v-model="form.email"
                  :label="$t('UserManager.FormEmail')"
              />
            </v-list-item>
            <v-list-item>
              <v-select
                  prepend-icon="person"
                  v-model="form.email_verified"
                  :items="emailVerified"
                  :label="$t('UserManager.FormEmailVerified')"
                  item-text="state"
                  item-value="abbr"
                  persistent-hint
                  return-object
              ></v-select>
            </v-list-item>

            <!-- <v-divider></v-divider> -->

            <v-list-item v-if="!isEditformMod">
              <v-text-field
                  prepend-icon="lock"
                  :label="$t('UserManager.FormPassword')"
                  v-model="form.password"
                  type="password"
              ></v-text-field>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-text-field
                    prepend-icon="phone"
                    :label="$t('UserManager.FormPhone')"
                    v-model="form.phone_number"
                    mask="+#### #### #######"
                    required
                />
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-select
                  prepend-icon="person"
                  v-model="form.status"
                  :items="statusData"
                  :label="$t('UserManager.FormStatus')"
                  item-text="state"
                  item-value="abbr"
                  persistent-hint
                  return-object
              ></v-select>
            </v-list-item>
            <v-list-item>
              <v-select
                  prepend-icon="person"
                  v-model="form.role_id"
                  :items="rolesData"
                  :label="$t('UserManager.FormRoles')"
                  item-text="state"
                  item-value="abbr"
                  persistent-hint
                  return-object
              ></v-select>
            </v-list-item>

          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn @click.native="resetContactForm()" text color="grey"
          >{{ $t('UserManager.FormClose') }}</v-btn
          >
          <v-spacer></v-spacer>
          <template>
            <v-btn
                @click.native="updateContact()"
                v-if="isEditformMod  && this.can('user_edit')"
                text
                color="primary"
            >{{ $t('UserManager.Update') }}</v-btn>
            <v-btn
                @click.native="createNewContact()"
                :disabled="$v.form.$invalid"
                v-else-if="this.can('user_create')"
                text
                color="primary"
            >{{ $t('UserManager.FormSave') }}</v-btn>
          </template>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import {filter, findIndex} from "lodash"
import {email, minLength, required} from "vuelidate/lib/validators"
import validationMixin from "@/mixins/validationMixin"
import InnerBaseLayout from "@/layouts/Inner/Layout"
import UserSidebar from "@/views/SocialMedia/Admin/User/Components/UserSidebar"
import UserHeader from "@/views/SocialMedia/Admin/User/Components/UserHeader"
import UserRow from "@/views/SocialMedia/Admin/User/Components/UserRow"
import ConfirmBox from "@/components/UI/Dialogs/ConfirmBox"

import UserTablesHeader from "@/views/SocialMedia/Admin/User/Components/UserTablesHeader";

export default {
  mixins: [validationMixin],
  validations: {
    form: {
      name: { required },
      email: { email },
      password: {
        required,
        minLength: minLength(6),
      },
    },
  },
  validationMessages: {
    form: {
      name: { required: "First name is required" },
      email: {
        email: "Email must be valid",
      },
      password: {
        required: "Password is required",
        minLength: "Min 6 character",
      },
    },
  },
  data() {
    return {
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' },
      ],
      dialog: false,
      namespace: "Applications",
      page: "UserManager",
      breadcrumbs: [
        {
          text: "UserManager",
          disabled: true,
        },
      ],
      alertHeader : 'AA',
      alertContent : 'bb',
      date: null,
      form: {
        name: "",
        surname: "",
        phone_number: "",
        email: "",
        password: "",
        status: "",
        role_id: "",
        profile_image: "",
        email_verified: "",
      },
      formUpdate: {
        name: "",
        surname: "",
        phone_number: "",
        email: "",
        password: "",
        status: "",
        role_id: "",
        profile_image: "",
        email_verified: "",
      },
      search: null,
      drawer: true,
      activeMenu: "all",
      menuItems: [
        { title: this.$t('UserManager.AllUsers'), isActive: true, slug: "all", abbr: 0 },
      ],
      statusData: [
        { state: 'Açık', abbr: 1 },
        { state: 'Kapalı', abbr: 0 },
      ],
      emailVerified: [
        { state: 'Onaylı', abbr: 1 },
        { state: 'Onaylansın', abbr: 0 },
      ],
      rolesData: [],
      contacts: [],
      originalUsersData: [],
      confirmBox: {
        deleteContact: false,
        item: null,
      },
      contactDialog: false,
      isEditformMod: false,
      editIndex: null,
      datepicker: false,
    };
  },
  components: {
    InnerBaseLayout,
    UserSidebar,
    UserHeader,
    UserRow,
    ConfirmBox,
    UserTablesHeader
  },
  methods: {
    selectAll() {
      if (this.unselectedContacts) {
        this.unselectedContacts.forEach((element) => {
          element.selected = true;
        });
      }
    },
    unselectAll() {

      if (this.selectedContacts) {
        this.selectedContacts.forEach((element) => {
          element.selected = false;
        });
      }
    },
    toggleFavourite(item) {
      item.is_favourite = !item.is_favourite;
    },
    remove() {
      console.log("remove", this.confirmBox.item)
      let index = this.contacts.indexOf(this.confirmBox.item);
      this.contacts.splice(index, 1);
      this.resetDialog();
    },
    resetDialog() {
      this.confirmBox = {
        deleteContact: false,
        item: null,
      };
    },
    SendMessage() {
      //console.log(item)
    },
    formatDate(date) {
      if (!date) {
        return null;
      }

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) {
        return null;
      }

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    resetContactForm() {
      this.form = {
        name: "",
        surname: "",
        status: "",
        phone_number: "",
        email: "",
        password: "",
        role_id: "",
        profile_image: "",
        email_verified: ""
      };
      this.contactDialog = false;
      this.isEditformMod = false;
      this.editIndex = null;
    },
    editContact(contact) {

      this.form = contact;
      this.isEditformMod = true;
      this.contactDialog = true;
      this.editIndex = findIndex(
          this.contacts,
          (contact) => contact === this.form
      );
    },
    createNewContact() {
      this.form.role_id !== '' ? this.form.role_id = this.form.role_id.abbr : null
      this.form.status !== '' ? this.form.status = this.form.status.abbr : null
      this.form.email_verified !== '' ? this.form.email_verified = this.form.email_verified.abbr : null

      this.$store.dispatch("users_manager/userCreate", this.form,).then((response) => {
        this.$v.$reset();
        this.contacts.push(this.form)
        this.originalUsersData.push(this.form)
        //location.reload();

        this.alertHeader  = response.status.toUpperCase()
        this.alertContent = response.data.message
        this.dialog = true
      })
      .catch((e) => {
        console.log(e)
        this.alertHeader = e.response.data.status.toUpperCase()
        this.alertContent = e.response.data.data.message
        this.dialog = true
      })
    },
    updateContact() {
      this.formUpdate.id                  =   this.form.id
      this.formUpdate.name                =   this.form.name
      this.formUpdate.surname             =   this.form.surname
      this.formUpdate.status              =   this.form.status
      this.formUpdate.phone_number        =   this.form.phone_number
      this.formUpdate.email               =   this.form.email
      this.formUpdate.password            =   this.form.password
      this.formUpdate.role_id             =   this.form.role_id
      this.formUpdate.profile_image       =   this.form.profile_image
      this.formUpdate.email_verified      =   this.form.email_verified

      if (typeof this.formUpdate.role_id === 'object') {
        console.log("object this")
        this.form.role_id !== '' ? this.formUpdate.role_id = this.form.role_id.abbr : this.formUpdate.role_id = null
      }
      if (typeof this.formUpdate.status === 'object') {
        console.log("object this")
        this.form.status !== '' ? this.formUpdate.status = this.form.status.abbr : this.formUpdate.status = null
      }
      if (typeof this.formUpdate.email_verified === 'object') {
        console.log("object this")
        this.form.email_verified !== '' ? this.formUpdate.email_verified = this.form.email_verified.abbr : this.formUpdate.email_verified = null
      }
      console.log("form role id : " + this.formUpdate.role_id)

      console.log("send data ", this.formUpdate)
      this.$store.dispatch("users_manager/updateUser", this.formUpdate).then((response) => {
        console.log(response)
        this.alertHeader  = response.status.toUpperCase()
        this.alertContent = response.data.message
        this.dialog = true
      })
      .catch((e) => {
        console.log(e)
        this.alertHeader = e.response.data.status.toUpperCase()
        this.alertContent = e.response.data.data.message
        this.dialog = true
      })
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
    frequentlyContacted() {
      return filter(this.contacts, (element) => element.is_frequent);
    },
    favouriteContacts() {
      return filter(this.contacts, (element) => element.is_favourite);
    },
    selectedContacts() {
      return filter(this.contacts, (element) => element.selected);
    },
    unselectedContacts() {
      return filter(this.contacts, (element) => !element.selected);
    },
    listContact() {
      let list = this.contacts;
      switch (this.activeMenu) {
        case "frequent":
          list = this.frequentlyContacted;
          break;

        case "favourite":
          list = this.favouriteContacts;
          break;

        default:
      }
      console.log("list ", list)
      return list;
    },
    showBulkActionOptions() {
      return this.selectedContacts && this.selectedContacts.length > 0;
    },
  },
  watch: {
    "form.birthdate"() {
      this.form.formatedBirthday = this.formatDate(this.form.birthdate);
    },
    contactDialog(from, to) {
      if (to) {
        this.resetContactForm();
      }
    },
    activeMenu(data){
      if (data === 'all') {
        this.contacts   = this.originalUsersData;
      } else {
        this.contacts   = this.originalUsersData.filter(key => {
          return key.role_name === data
        });
      }
    },
    rolesData(data){
      console.log("rolesData data change");
      data.forEach(element => {
        this.menuItems.push({
          title: element.title, isActive: element.isActive, slug: element.slug
        })
      });
      console.log(this.menuItems)
    },
    search(){
      if (this.search == null) {
        this.search = ""
      }
      this.contacts = this.originalUsersData.filter((element) => {
        let allName = element.name + " " + element.surname + " " + element.email
        return allName.toLowerCase().includes(this.search.toLowerCase())
      })

      console.log("search : ", this.contacts)
    }
  },
  created(){
    this.$store.dispatch("users_manager/getRoles", this.form).then((response) => {
      this.$v.$reset();
      this.rolesData  = response.data.message
    })
    .catch(() => {
      //console.log(e)
    })

    this.$store.dispatch("users_manager/getUsers", this.form).then((response) => {

      this.contacts           = response.data.message
      this.originalUsersData  = response.data.message
    })
    .catch(() => {
      //console.log(e)
    })

  },
  beforeDestroy() {
    this.form = null;
    this.contacts = null;
    this.originalUsersData = null;
    delete this.form;
    delete this.contacts;
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