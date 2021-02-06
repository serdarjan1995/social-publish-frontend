<!--
  <template>
    <v-container fluid>
        <v-list-item v-for="(item, index) in items" :key="index" @click="onEdit(item)">
            <v-list-item-action @click.stop class="mr-5">
                <v-checkbox
                        color="sidebar"
                        hide-details
                        v-model="item.selected"
                ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content class="ml-5">
                <v-list-item-title>{{ item.name }} </v-list-item-title>
            </v-list-item-content>

            <v-list-item-content class="hidden-sm-and-down">
                <v-list-item-title>{{ item.location }}</v-list-item-title>
            </v-list-item-content>


            <v-list-item-action @click.stop>
                <v-switch
                        color="info"
                        v-model="item.status"
                        hide-details
                ></v-switch>
            </v-list-item-action>

        </v-list-item>
    </v-container>
</template>

<script>
    export default {

        props: {
            items: Array,
            onDelete: Function,
            onEdit: Function,
        },
    };
</script>
-->
<template>
    <v-card-text class="pt-0">
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="items"
          class="neu-glow-inset"
        >
            <template v-slot:item="{item}">
                <tr @click="onEdit(item)">
                    <td @click.stop class="mr-5">
                        <v-checkbox
                          @click="selectedAction(true)"
                          color="sidebar"
                          hide-details
                          v-model="item.selected"
                        ></v-checkbox>
                    </td>
                    <td class="ml-5">
                        <v-list-item-title>{{ item.proxy_name }} </v-list-item-title>
                    </td>
                    <td class="hidden-sm-and-down">
                        <v-list-item-title>{{ item.proxy_location.name }}</v-list-item-title>
                    </td>
                    <td @click.stop>
                        <v-switch
                          @change="changeStatus(item.id, item.status)"
                          color="info"
                          v-model="item.status"
                          hide-details
                        ></v-switch>
                    </td>
                </tr>
            </template>
        </v-data-table>

    </v-card-text>
</template>

<script>
    export default {
        data() {
          return {
            selected: [],
          }
        },
        props: {
            items: {
                type: Array
            },
            headers: {
                type: Array
            },
            onEdit: Function,
            selectedAction: Function
        },
        methods: {
          changeStatus(id, status) {
            let data = {
              'id': id,
              'status': status
            }
            this.$store.dispatch("proxy_manager/proxyStatusChange", data).then((response) => {
              console.log(response)
            })
            .catch((e) => {
              console.log(e)
            })
            console.log("id : " + id)
            console.log("value : ", event)
          }
        },
        watch: {
          selected(data) {
            console.log("data selected: ", data)
          }
        }
    };
</script>


<style>
.btn-private {
  position: absolute;
  right: 55px;
}
</style>