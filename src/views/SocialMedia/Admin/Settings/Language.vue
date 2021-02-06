<template>
    <div class="vuse-content-wrapper contact-app">
        <vuse-section-definition
                :title="$t('Language.heading')"
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
            <template v-slot:content>
                <v-sheet height="100%" color="transparent" v-if="listContact.length">
                    <v-list
                            two-line
                            flat
                            class="transparent"
                            :style="{ 'overflow-x': 'hidden' }">

                        <language-component v-if="activeMenu=='language-component'"/>


                    </v-list>
                </v-sheet>
            </template>
        </inner-base-layout>

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
    import LanguageComponent from "./partials/language/language-component"



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
                activeMenu: "language-component",
                menuItems: [
                    {title: "Turkish", isActive: true, slug: "language-component", icon: "mdi-tr"},
                    {title: "English", isActive: false, slug: "english", icon: "mdi-en"},
                    {title: "Russian", isActive: false, slug: "russian", icon: "mdi-russian"},
                ],
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
            LanguageComponent
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


