<template>
    <v-dialog v-model="contactDialog" scrollable persistent max-width="500" max-height="600">
        <v-card max-width="600" class="mx-auto pa-3" v-if="contactDialog">
            <v-card-text class="px-3">
                <v-card-title>
                    <span class="headline">Edit Proxy</span>
                </v-card-title>
                <v-switch
                    v-model="item.status"
                    class="ma-2"
                    label="Proxy status"
                ></v-switch>
                <v-text-field class="mb-1" label="name" v-model="item.proxy_name"/>
                <v-select
                    v-model="item.proxy_location"
                    :items="country"
                    label="Location Seçiniz"
                    item-text="name"
                    item-value="code"
                ></v-select>
                <v-text-field class="mb-1" label="Location" v-model="item.proxy_limit"  item-text="limit" item-value="limit" :item="item.proxy_limit">
                </v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="ma-2" tile outlined color="error" @click="$emit('close')">
                    <v-icon left>mdi</v-icon>
                    close
                </v-btn>

                <v-btn @click="updateContact" class="ma-2" tile outlined color="success">
                    <v-icon left>mdi-pencil</v-icon>
                    Edit
                </v-btn>
            </v-card-actions>

        </v-card>
    </v-dialog>
</template>

<script>
    import {country} from "./../country";

    export default {
        name: "EditDialog",
        props: ['item'],
        data() {
          return {
            country: country,
            contactDialog: true,
            isEdit: false,
            selected_location: '',
            persistentHint: true
          }
        },
        methods: {
          updateContact(){
            console.log("item",this.item)

            if (typeof this.item.proxy_location !== 'object') {
              country.find(item => {
                if (item.code === this.item.proxy_location){
                  this.item.proxy_location = item
                }
              })
            }

            this.$store.dispatch("proxy_manager/proxyUpdate", this.item).then((response) => {
              console.log(response)
            })
            .catch((e) => {
              console.log(e)
            })
          }
        },
        created() {
          console.log(this.item)
        },
      watch: {
          item(data){
              console.log("item change ", data)
          }
      }
    }

</script>


