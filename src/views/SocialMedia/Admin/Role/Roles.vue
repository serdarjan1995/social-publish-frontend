<template>
  <div class="vuse-content-wrapper">
    <v-btn class="float-right mt-10" @click="openDialog" color="indigo" dark>
      <v-icon dark>add</v-icon>{{this.getTextEn('Roles.add')}}</v-btn>
    <vuse-section-definition
        :title="$t('Roles.roles')"
        icon="dashboard"
    ></vuse-section-definition>
    <v-container fluid>
      <responsive-table-roles :arrdata="roleList" :headers="headerArray" :show-actions="true" :delete-function="openDeleteDialog" :edit-function="openEditDialog" :items-per-page="25">
        <template v-slot:item.actions="{item}">
          <v-icon small class="mr-2" @click="deleteDialog(item)">mdi-pencil</v-icon>
          <v-icon small >mdi-delete</v-icon>
        </template>
      </responsive-table-roles>
    </v-container>
    <delete-dialog :delete-dialog="deleteDialog" v-if="deleteDialog" :onDelete="deleteFunction" :postDeleteItem="this.dialogItem"></delete-dialog>
    <edit-dialog :edit-dialog="editDialog" v-if="editDialog" :onEdit="editFunction" :postEditItem="this.dialogItem"></edit-dialog>
    <add-dialog :add-dialog="addDialog" v-if="addDialog"></add-dialog>

  </div>
</template>
<script>

//import EventBus from "@/plugins/event-bus"
import { mapGetters, mapActions } from 'vuex'
import DeleteDialog from "@/views/SocialMedia/Admin/Role/component/DeleteDialog"
import ResponsiveTableRoles from "@/components/UI/Table/ResponsiveTableRoles"
import EditDialog from "@/views/SocialMedia/Admin/Role/component/EditDialog"
import AddDialog from "@/views/SocialMedia/Admin/Role/component/AddDialog"

export default {
  components: {
    AddDialog,
    EditDialog,
    ResponsiveTableRoles,
    DeleteDialog
  },
  data() {
    return {
      valid: true,
      title: '',
      description: '',
      headerArray: [
        { text: 'id', value: 'id'},
        { text: this.getTextEn('Roles.name'), value: 'name', i18n: 'Roles.name' },
        { text: this.getTextEn('Roles.actions'), value: 'actions', i18n: 'Roles.actions', sortable: false },
      ],
      tags: '',
      searchKey: '',
      addDialog: false,
      dialogItem: null,
      deleteDialog: false,
      editDialog: false,
      query: { sort: 'id', order: 'desc' },
    };
  },
  watch:{
    query: {
      handler(query) {
        this.setQuery(query)
      },
      deep: true
    }
  },
  created() {
    this.$root.relationships = this.relationships
    this.getAllData()
  },
  /*  mounted(){
      EventBus.$on('closeDeleteDialog', () => {
        this.deleteDialog=false;
      })
      EventBus.$on('closeAddDialog', () => {
        this.addDialog=false;
      })
      EventBus.$on('closeEditDialog', () => {
        this.editDialog=false;
      })
      EventBus.$on('addItem', obj => {
        this.$store.dispatch("roles/storeData", obj)
        this.addDialog=false;
      })

    },*/
  methods: {
    ...mapActions('roles', ['getAllData','destroyData','setQuery','storeData','updateData','getShowData','getPermissionsData']),
   getTextEn(value){
      return this.$i18n.t(value)
    },
    /*     deleteFunction(item){
          const obj = {
            id: item.id
          }
          this.$store.dispatch("roles/destroyData", obj)
          this.deleteDialog=false;
        },
        openDeleteDialog(item){
          this.dialogItem=item;
          this.deleteDialog=true;
        },
        editFunction(item){
          console.log('update roles',item)
          let myList = []
          item.permissions.find((permission) => {
            myList.push({"role_id" : item.id, "permission_id" : permission.id})
          })
          const obj = {
            name: item.name,
            permissions: myList
          }
          this.$store.dispatch("roles/updateData", obj)
          this.editDialog=false;
        },
        openEditDialog(item){
          this.dialogItem=item;
          this.editDialog=true;
        },
        openDialog(){
          this.addDialog=true;
        }*/
  },
  computed:{
    ...mapGetters('roles', ['data', 'total', 'relationships','item','permissionsAll'])
  },
  /*created() {
    this.$store.dispatch("roles/getAllData")
    this.$store.dispatch('permissions/getPermissionList')
  }*/
};
</script>
