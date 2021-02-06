<template>
  <div class="vuse-content-wrapper">
    <v-btn class="float-right mt-10" @click="openDialog" color="indigo" dark>
      <v-icon dark>add</v-icon>
      {{this.getTextEn('Roles.add')}}
    </v-btn>
    <vuse-section-definition
        :title="$t('Roles.permissions')"
        icon="dashboard"
    ></vuse-section-definition>
    <v-container fluid>
      <responsive-table :arrdata="permissionList.data" :headers="headerArray" :current-page="permissionList.current_page" :last-page="permissionList.last_page" :show-actions="true" :delete-function="openDeleteDialog" :edit-function="openEditDialog" :items-per-page="25">
        <template v-slot:item.actions="{item}">
          <v-icon small class="mr-2" @click="deleteDialog(item)">
            mdi-pencil
          </v-icon>
          <v-icon small >
            mdi-delete
          </v-icon>
        </template>
      </responsive-table>
    </v-container>
    <delete-dialog :delete-dialog="deleteDialog" v-if="deleteDialog" :onDelete="deleteFunction" :postDeleteItem="this.dialogItem"></delete-dialog>
    <edit-dialog :edit-dialog="editDialog" v-if="editDialog" :onEdit="editFunction" :postEditItem="this.dialogItem"></edit-dialog>
    <add-dialog :add-dialog="addDialog" v-if="addDialog"></add-dialog>
  </div>
</template>
<script>

import EventBus from "@/plugins/event-bus";
import DeleteDialog from "@/views/SocialMedia/Admin/Permission/component/DeleteDialog";
import ResponsiveTable from "@/components/UI/Table/ResponsiveTable";
import EditDialog from "@/views/SocialMedia/Admin/Permission/component/EditDialog";
import AddDialog from "@/views/SocialMedia/Admin/Permission/component/AddDialog";

export default {
  components: {
    AddDialog,
    EditDialog,
    ResponsiveTable,
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
      editDialog: false
    };
  },
  mounted(){
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
      this.$store.dispatch("permissions/createPermission", obj)
      this.addDialog=false;
    })
  },
  methods: {
    getTextEn(value){
      return this.$i18n.t(value)
    },
    updateItem(item){
      const obj = {
        id: item.id,
        name: item.name
      }
      this.$store.dispatch("permissions/updatePermission", obj)
    },
    deleteFunction(item){
      const obj = {
        id: item.id
      }
      this.$store.dispatch("permissions/deletePermission", obj)
      this.deleteDialog=false;
    },
    openDeleteDialog(item){
      this.dialogItem=item;
      this.deleteDialog=true;
    },
    editFunction(item){
      const obj = {
        name: item.name,
        id: item.id
      }
      this.$store.dispatch("permissions/updatePermission", obj)
      this.editDialog=false;
    },
    openEditDialog(item){
      this.dialogItem=item;
      this.editDialog=true;
    },
    openDialog(){
      this.addDialog=true;
    }
  },
  computed:{
    permissions:{
      get(){
        return this.$store.state.permissions.permissionList
      },
      set(newValue){
        this.$store.state.permissions.permissionList = newValue
      }
    },
    permissionList:{
      get(){
        return this.$store.state.permissions.permissionList
      },
      set(newValue) {
        this.$store.state.permissions.permissionList.data = newValue
      }
    }
  },
  created() {
    this.$store.dispatch("permissions/getPermissionList")
  }
};
</script>
