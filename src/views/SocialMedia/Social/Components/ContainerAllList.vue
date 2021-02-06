<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="3" v-for="(item, index) in items" :key="index">
        <v-card min-height="240">
          <v-card-title class="ma-0 pt-0 pb-0">
            <v-row class="align-center">
              <v-list-item-avatar class="mt-0 mb-0 ml-2 mr-2">
                <v-icon large>{{item.groupSocial.icon}}</v-icon>
              </v-list-item-avatar>
              <v-toolbar-title>
                <v-list-item-title>{{ item.groupSocial.name + " " + item.groupName.charAt(0).toUpperCase() + item.groupName.slice(1) }}</v-list-item-title>
              </v-toolbar-title>
            </v-row>
          </v-card-title>

          <v-expansion-panels hover focusable>
            <v-expansion-panel v-for="(itm,i) in item.groupItems" :key="i">
              <v-expansion-panel-header class="pt-0 pb-0">{{ itm.account_name }}</v-expansion-panel-header>
              <v-expansion-panel-content class="pa-0">
                <v-card min-height="250">
                  <v-img class="white--text align-end image-contain" height="200px"
                         :src="itm.avatar_url">
                    <v-card-title>{{ itm.account_name }}</v-card-title>
                    <v-card-subtitle class="custom-class">{{ itm.account_name }}</v-card-subtitle>
                  </v-img>
                  <custom-container-actions
                      :item="17"
                      :account-item="itm"
                      :status="'Active'"
                      :status-color="'success'"
                      :openEDialog="onEdit"
                      :openDDialog="onDelete"
                  />
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CustomContainerActions from "@/views/SocialMedia/Social/Components/CustomContainerActions"

export default {
  components: {
    CustomContainerActions
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    onEdit: {
      type: Function
    },
    onDelete: {
      type: Function
    }
  }
}
</script>

<style>
  .v-expansion-panel-content__wrap{
    padding: 0;
  }
  .image-contain .v-image__image{
    background-size:contain
  }
</style>
