<template>
    <v-card-actions>
        <v-btn @click="changeStatus" small :color="mutStatusColor">
          {{ mutStatus }}
        </v-btn>
        <v-btn small @click="openDDialog(accountItem)">
            <v-icon v-text="`mdi-delete`" :size="item"></v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn small>
            <v-icon :size="item">mdi-web</v-icon>
        </v-btn>
    </v-card-actions>
</template>
<script>
    export default {
        props: {
           openEDialog: {type: Function},
           openDDialog: {type: Function},
           item: Number,
           accountItem:Object,
           status: String,
           statusColor: String
        },
        data(){
          return {
            mutStatus : this.status,
            mutStatusColor : this.statusColor
          };
        },
        methods:{
          changeStatus(){
            if(this.mutStatus=="Active"){
              this.mutStatus = "Passive"
              this.mutStatusColor = "error"
            }
            else{
              this.mutStatus = "Active"
              this.mutStatusColor = "success"
            }
          }
        },
        computed:{
          getStatus(){
            return this.status
          },
          getStatusColor(){
            return this.statusColor
          }
        }
    }
</script>