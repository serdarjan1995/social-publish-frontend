<template>
  <v-row justify="center">
    <v-dialog v-model="deleteDialog" justify="center" persistent max-width="350">
      <v-card>
        <v-card-title class="text-h5"
        >{{$t('Roles.deleteRole')}}</v-card-title
        >
        <v-card-text
        >{{$t('Roles.deleteAsk')}} {{postDeleteItem.name}} ?</v-card-text
        >
        <v-card-actions>
          <v-btn class="ma-2" tile outlined color="error" @click="closeMyDialog">
            <v-icon left>mdi-close</v-icon>
            {{$t('Roles.close')}}
          </v-btn>
          <v-btn class="ma-2" tile outlined color="success" @click="onDelete(postDeleteItem)">
            <v-icon left>mdi-delete</v-icon>
            {{$t('Roles.delete')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import EventBus from "@/plugins/event-bus";
export default {
  name: "DeleteDialog",
  props: {
    deleteDialog:Boolean,
    postDeleteItem:Object,
    onDelete: Function
  },
  data: () => ({
    newValue: true
  }),
  methods:{
    closeMyDialog(){
      this.newValue = false;
      EventBus.$emit('closeDeleteDialog',this.newValue);
    }
  }
}
</script>


