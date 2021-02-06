<template>
 <v-toolbar flat color="transparent">
  <v-app-bar-nav-icon
          v-if="$vuetify.breakpoint.smAndDown && !drawer"
          @click="onToggleDrawer()">
  </v-app-bar-nav-icon>

  <v-list-item-avatar class="my-0">
   <v-icon large v-if="item">{{item.icon}}</v-icon>
  </v-list-item-avatar>

  <v-toolbar-title>
   <v-list-item-title v-if="item">{{ item.name }}</v-list-item-title>
  </v-toolbar-title>

  <v-spacer></v-spacer>

   <v-btn @click="$emit('account-manager-add-account')">
     <v-icon>mdi-plus</v-icon>
    {{$t('AccountManager.Add')}}
   </v-btn>
 </v-toolbar>
</template>

<script>
 export default {
  props: {
   drawer: Boolean,
   onToggleDrawer: Function,
   item: Object
  }
 };
</script>
