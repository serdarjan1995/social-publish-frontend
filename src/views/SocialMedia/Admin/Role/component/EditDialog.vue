<template>
  <v-row justify="center">
    <v-dialog v-model="editDialog" justify="center" persistent max-width="800">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{$t('Roles.editRole')}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                    :label="$t('Roles.name')"
                    v-model="postEditItem.name"
                    type="text"
                    required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                    v-model="getItemPermissionlist"
                    :items="permissions"
                    :value="this.state"
                    item-text="name"
                    item-value="id"
                    return-object
                    chips
                    deletableChips
                    small-chips
                    multiple
                    hideSelected
                    solo
                    :label="$t('Roles.permissions')"
                    required
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="ma-2" tile outlined color="error" @click="closeMyDialog"
          >{{$t('Roles.cancel')}}
          </v-btn
          >
          <v-btn class="ma-2" tile outlined color="success" @click="onEdit(postEditItem)">
            {{$t('Roles.update')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import EventBus from "@/plugins/event-bus";
export default {
  name: "EditDialog",
  props: {
    editDialog:Boolean,
    postEditItem:Object,
    onEdit: Function
  },
  data: () => ({
    newValue: true
  }),
  methods:{
    closeMyDialog(){
      EventBus.$emit('closeEditDialog',false);
    }
  },
  computed:{
    getItemPermissionlist:{
      get(){

        return this.$props.postEditItem.permissions
      },
      set(newValue){
        this.$props.postEditItem.permissions = newValue
      }
    },
    permissions:{
      get(){
        return this.$store.state.permissions.permissionList
      },
      set(newValue){
        this.$store.state.permissions.permissionList = newValue
      }
    }
  },
  created(){
    this.$store.dispatch('permissions/getPermissionList')
  }
}
</script>


