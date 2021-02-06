<template>
  <v-row justify="center">
    <v-dialog v-model="addDialog" justify="center" persistent max-width="800">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{$t('Roles.addPermission')}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                    :label="$t('Roles.name')"
                    v-model="name"
                    type="text"
                    required
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="ma-2" tile outlined color="error" @click="closeMyDialog"
          >{{$t('Roles.close')}}
          </v-btn
          >
          <v-btn class="ma-2" tile outlined color="success" @click="sendForm">
            {{$t('Roles.add')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import EventBus from "@/plugins/event-bus";
export default {
  name: "AddDialog",
  props: {
    addDialog:Boolean
  },
  data: () => ({
    newValue: true,
    name: "",
    permissions: []
  }),
  methods:{
    sendForm(){
      const obj = {
        name: this.name
      }
      EventBus.$emit('addItem',obj);
    },
    closeMyDialog(){
      EventBus.$emit('closeAddDialog',false);
    }
  }
}
</script>


