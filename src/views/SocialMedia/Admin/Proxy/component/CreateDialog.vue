<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Create Proxy</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-switch
                                  v-model="form.status"
                                  class="ma-2"
                                  value="1"
                                  label="Proxy status"
                              ></v-switch>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                  v-model="form.proxy_name"
                                  label="Proxy"
                                  required></v-text-field>
                            </v-col>

                            <v-col cols="12" >
                                <v-select
                                  v-model="form.proxy_location"
                                  :items="item"
                                  label="Location Seçiniz"
                                  item-text="name"
                                  item-value="code"
                                ></v-select>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field
                                  v-model="form.proxy_limit"
                                  label="Limit"
                                ></v-text-field>
                            </v-col>

                        </v-row>
                    </v-container>

                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="ma-2" tile outlined color="error" @click="$emit('close')">
                        <v-icon left>mdi</v-icon>close
                    </v-btn>

                    <v-btn class="ma-2" tile outlined color="success"  :loading="loading" text @click="save">
                        <v-icon left>mdi-pencil</v-icon>Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    import {country} from "./../country";

    export default {
        props: ['myProxyList'],
        data: () => ({
            dialog: true,
            loading:false,
            item: country,
            form:{
                proxy_name:'',
                proxy_location: null,
                proxy_limit: 0,
                status:false,
                selected: false,
                proxy_code: false,
            }
        }),
        methods:{
            save() {
                this.loading = true;
                if (typeof this.form.proxy_location !== 'object') {
                  country.find(item => {
                    if (item.code === this.form.proxy_location){
                      this.form.proxy_location = item
                    }
                  })
                }

                console.log("this form ", this.form)
                this.$store.dispatch("proxy_manager/proxyCreate", this.form,).then((response) => {
                  console.log(response)
                  this.myProxyList.push(this.form)
                })
                .catch((e) => {
                  console.log(e)
                })
                this.$emit('create');
            },
        }
    }
</script>

<style>

</style>

