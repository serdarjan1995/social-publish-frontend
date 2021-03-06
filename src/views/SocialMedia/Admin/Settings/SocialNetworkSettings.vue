<template>
  <div class="vuse-content-wrapper contact-app">
    <vuse-section-definition
        :title="$t('SocialNetwork.heading')"
        icon="contacts"
    />
    <inner-base-layout
        baseLayerClass="neu-glow-inset"
        innerContainerClass="transparent"
    >
      <template v-slot:sidebar>
        <sidenav
            :drawer="drawer"
            :items="menuItems"
            :activeItem="activeMenu"
            :itemClicked="setActiveOption"
            :onToggle="drawerHandler"
            @onSearch="searchHandler"
        />
      </template>
      <template v-slot:header>
        <div>
          <contact-toolbar
              :drawer="drawer"
              :onSelectAll="selectAll"
              :onUnselectAll="unselectAll"
              :onToggleDrawer="drawerHandler"
              :showBulkActionOptions="showBulkActionOptions"
              :onBulkDelete="() => { contacts = unselectedContacts }"
              :addContactDialog="() => { contactDialog = !contactDialog }"
          />
        </div>
        <v-divider></v-divider>
      </template>
      <template v-slot:content>
        <v-sheet height="100%" color="transparent" v-if="listContact.length">
          <v-list
              two-line
              flat
              class="transparent"
              :style="{ 'overflow-x': 'hidden' }">
            <facebook v-if="activeMenu=='facebook'" :id="activeMenuID"/>

            <google-my-business v-if="activeMenu=='google'" :id="activeMenuID"/>

            <instagram v-if="activeMenu=='instagram'" :id="activeMenuID"/>

            <linkedin v-if="activeMenu=='linkedin'" :id="activeMenuID"/>

            <odnoklasniki v-if="activeMenu=='ok'" :id="activeMenuID"/>

            <pinterest v-if="activeMenu=='pinterest'" :id="activeMenuID"/>

            <reddit v-if="activeMenu=='reddit'" :id="activeMenuID"/>

            <tumblr v-if="activeMenu=='tumblr'" :id="activeMenuID"/>

            <twitter v-if="activeMenu=='twitter'" :id="activeMenuID"/>

            <vikontakte v-if="activeMenu=='vk'" :id="activeMenuID"/>

            <youtube v-if="activeMenu=='youtube'" :id="activeMenuID"/>

            <telegram v-if="activeMenu=='telegram'" :id="activeMenuID" />

            <foursquare v-if="activeMenu=='foursquare'" :id="activeMenuID" />

            <whatsapp v-if="activeMenu=='whatsapp'" :id="activeMenuID"  />

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
        <v-img src="https://picsum.photos/630/280?image=618">
          <v-row class="fill-height ma-0">
            <v-col class="pa-0" cols="6">
              <v-avatar class="profile" color="grey" size="164" tile>
                <v-img :src="form.avatar"></v-img>
              </v-avatar>
            </v-col>
            <v-col class="pa-0 text-right" cols="6">
              <v-btn
                  icon
                  dark
                  class="fx-close-model-btn"
                  @click="contactDialog = false"
              >
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
            </v-col>
            <v-col class="py-0">
              <v-list-item color="rgba(0, 0, 0, .4)" dark>
                <v-list-item-content>
                  <v-list-item-title class="text-h6"
                  >{{ form.firstname }} {{ form.lastname }}
                  </v-list-item-title
                  >
                  <v-list-item-subtitle>{{
                      form.designation
                    }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-img>
        <v-card-text class="px-0">
          <v-list two-line>
            <v-list-item>
              <v-text-field
                  :error-messages="fieldErrors('form.firstname')"
                  @input="$v.form.firstname.$touch()"
                  @blur="$v.form.firstname.$touch()"
                  prepend-icon="person"
                  label="First Name"
                  v-model="form.firstname"
                  required
              ></v-text-field>
            </v-list-item>
            <v-list-item>
              <v-text-field
                  prepend-icon="c"
                  label="Last name"
                  v-model="form.lastname"
              ></v-text-field>
            </v-list-item>
            <v-list-item>
              <v-text-field
                  prepend-icon="c"
                  label="Nickname"
                  v-model="form.nickname"
              ></v-text-field>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-text-field
                    :error-messages="fieldErrors('form.phone')"
                    @input="$v.form.phone.$touch()"
                    @blur="$v.form.phone.$touch()"
                    prepend-icon="phone"
                    label="Phone"
                    v-model="form.phone"
                    mask="+#### #### #######"
                    required
                />
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-text-field
                  :error-messages="fieldErrors('form.email')"
                  @input="$v.form.email.$touch()"
                  @blur="$v.form.email.$touch()"
                  prepend-icon="email"
                  v-model="form.email"
                  label="Email"
              />
            </v-list-item>

            <!-- <v-divider></v-divider> -->

            <v-list-item>
              <v-text-field
                  prepend-icon="domain"
                  label="Company"
                  v-model="form.company"
              ></v-text-field>
            </v-list-item>
            <v-list-item>
              <v-text-field
                  prepend-icon="work"
                  label="Job"
                  v-model="form.designation"
              ></v-text-field>
            </v-list-item>

            <v-list-item>
              <v-menu
                  ref="datepicker"
                  :close-on-content-click="false"
                  v-model="datepicker"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                      v-on="on"
                      v-model="form.formatedBirthday"
                      label="Birthdate"
                      hint="MM/DD/YYYY format"
                      persistent-hint
                      prepend-icon="cake"
                      @blur="form.birthdate = parseDate(form.formatedBirthday)"
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="form.birthdate"
                    no-title
                    @input="datepicker = false"
                ></v-date-picker>
              </v-menu>
            </v-list-item>

            <!-- <v-divider inset></v-divider> -->

            <v-list-item>
              <v-text-field
                  prepend-icon="mdi-map-marker"
                  label="Address"
                  v-model="form.address"
              />
            </v-list-item>
          </v-list>
          <small class="px-5">*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-btn @click.native="resetContactForm()" text color="grey"
          >Close
          </v-btn
          >
          <v-spacer></v-spacer>
          <v-btn
              @click.native="updateContact()"
              :disabled="$v.form.$invalid"
              v-if="isEditformMod"
              text
              color="primary"
          >Edit
          </v-btn
          >
          <v-btn
              @click.native="createNewContact()"
              :disabled="$v.form.$invalid"
              v-else
              text
              color="primary"
          >Save
          </v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import {filter, findIndex} from "lodash";
import {
  required,
  maxLength,
  minLength,
  email,
} from "vuelidate/lib/validators";
import {validNumber} from "@/utils/validators";
import validationMixin from "@/mixins/validationMixin";
import {defaultUserPic, contacts} from "@/data/dummyData";

import InnerBaseLayout from "@/layouts/Inner/Layout";
import Sidenav from "./partials/sidenav";
import Facebook from "./partials/Social-Settings/Facebook";
import GoogleMyBusiness from "./partials/Social-Settings/GoogleMyBusiness";
import Instagram from "./partials/Social-Settings/Instagram";
import linkedin from "./partials/Social-Settings/Linkedin";
import Odnoklasniki from "./partials/Social-Settings/Odnoklasniki";
import Pinterest from "./partials/Social-Settings/Pinterest";
import Reddit from "./partials/Social-Settings/Reddit";
import Tumblr from "./partials/Social-Settings/Tumblr";
import Twitter from "./partials/Social-Settings/Twitter";
import Vikontakte from "./partials/Social-Settings/Vikontakte";
import Youtube from "./partials/Social-Settings/Youtube";
import ContactToolbar from "./partials/ContactToolbar";
import ConfirmBox from "@/components/UI/Dialogs/ConfirmBox";
import Telegram from "./partials/Social-Settings/Telegram";
import Foursquare from "./partials/Social-Settings/Foursquare";
import Whatsapp from "./partials/Social-Settings/Whatsapp"

export default {
  mixins: [validationMixin],
  validations: {
    form: {
      firstname: {required},
      email: {email},
      phone: {
        required,
        validNumber,
        maxLength: maxLength(15),
        minLength: minLength(7),
      },
    },
  },
  validationMessages: {
    form: {
      firstname: {required: "First name is required"},
      email: {
        email: "Email must be valid",
      },
      phone: {
        maxLength: "Max 14 digits",
        minLength: "Min 7 digits",
        validNumber: "Phone number must be a valid number",
      },
    },
  },
  data() {
    return {
      page: "SocialNetwork",
      breadcrumbs: [
        {
          text: "SocialNetwork",
          disabled: true,
        },
      ],
      namespace: "Applications",
      date: null,
      form: {
        firstname: "",
        lastname: "",
        nickname: "",
        phone: "",
        email: "",
        company: "",
        avatar: defaultUserPic,
        birthdate: "",
        formatedBirthday: "",
        address: "",
        notes: null,
        is_favourite: false,
        is_frequent: false,
        selected: false,
        designation: "",
      },
      search: null,
      drawer: true,
      activeMenu: "facebook",
      activeMenuID: 1,
      menuItems: [],
      contacts,
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
    Sidenav,
    Facebook,
    GoogleMyBusiness,
    Instagram,
    linkedin,
    Reddit,
    Tumblr,
    Twitter,
    ContactToolbar,
    ConfirmBox,
    Youtube,
    Odnoklasniki,
    Vikontakte,
    Pinterest,
    Telegram,
    Foursquare,
    Whatsapp
  },
  created() {
    this.$store.dispatch('social_medias/getSocialMediaList').then((resp) => {
      resp.list.forEach((items) => {
        let myObj = new Object
        myObj.icon = items.icon
        myObj.name = items.name
        myObj.color = items.color
        myObj.id = items.id
        myObj.slug = items.name.toLowerCase()
        this.menuItems.push(myObj)
      })
    })
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
    deleteContactDialogHandler(item) {
      this.confirmBox = {
        deleteContact: true,
        item,
      };
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
        firstname: "",
        lastname: "",
        nickname: "",
        phone: "",
        email: "",
        company: "",
        avatar: "/static/default/user.svg",
        designation: "",
        birthdate: "",
        formatedBirthday: "",
        address: "",
        notes: null,
        is_favourite: false,
        is_frequent: false,
        selected: false,
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
      this.isEditformMod = false;
      this.contacts.push(this.form);
      this.resetContactForm();
    },
    updateContact() {
      const index = this.editIndex;
      this.contacts[index] = this.form;
      this.resetContactForm();
    },
    setActiveOption(item) {
      this.activeMenu = item.slug;
      this.activeMenuID = item.id;
    },
    drawerHandler() {
      this.drawer = !this.drawer;
    },
    searchHandler(val) {
      this.search = val;
    },
  },
  computed: {
    selectedContacts() {
      return filter(this.contacts, (element) => element.selected);
    },
    unselectedContacts() {
      return filter(this.contacts, (element) => !element.selected);
    },
    listContact() {
      return this.contacts;
    },
    listMenuItems() {
      let list = this.contacts;
      switch (this.activeMenu) {
        default:
          if (this.search) {
            // list = filter(this.contacts, (element) => element.first === this.search || element.last === this.search || element.email === this.search || element.phone === this.search)
            list = this.menuItems.filter((menuItem) => {
              return (
                  menuItem.title
                      .toLowerCase()
                      .includes(this.search.toLowerCase())
              );
            });
          } else {
            list = this.menuItems;
          }
          break;
      }
      console.log(list)
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
  },
  beforeDestroy() {
    this.form = null;
    this.contacts = null;
    delete this.form;
    delete this.contacts;
  }
};
</script>
<style scoped>
.toobar-extension {
  margin-left: 0 !important;
  min-width: 300px;
}
</style>


