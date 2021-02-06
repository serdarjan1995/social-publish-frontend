<template>
  <v-container fluid>
    <v-col cols="12" sm="12" v-if="items.length">
      <v-row>
        <v-col cols="12" sm="3" v-for="(item, index) in items" :key="index">
          <v-card min-height="250">
            <v-img class="white--text align-end" height="200px"
                   :src="item.avatar_url">
              <v-card-title>{{ item.name }}</v-card-title>
              <v-card-subtitle class="custom-class">{{ item.category }}</v-card-subtitle>
            </v-img>
            <custom-container-actions
                :item="17"
                :account-item="item"
                :openEDialog="onEdit"
                :openDDialog="onDelete"
                :onGo="item.name"
            />
          </v-card>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" align="center" justify="center" v-else>

      <v-card max-width="250">
        <v-row style="min-height:240px" align="center" justify="center">
          <v-btn class="pa-5">
            <v-icon v-text="'mdi-plus'"></v-icon>
          </v-btn>
        </v-row>
      </v-card>
    </v-col>
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
      default: () => []
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
<style scoped>
.custom-class {
  text-transform:capitalize;
  position: absolute;
  top: 20px;
  right: 0;
  font-weight: 900;
  color: #fff;
}
</style>