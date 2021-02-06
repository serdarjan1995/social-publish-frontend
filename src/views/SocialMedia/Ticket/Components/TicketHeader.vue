<template>
  <v-toolbar flat color="transparent" v-if="check(message_user)">
    <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.smAndDown && !drawer"
        @click="onToggleDrawer()"
    ></v-app-bar-nav-icon>
    <v-avatar
        size="35px"
        color="grey lighten-4"
        :class="$vuetify.breakpoint.smAndDown ? 'mx-3' : 'mr-3'"
    >
      <img :src="message_user[0].profile_pic_url" alt="avatar"/>
    </v-avatar>
    <v-toolbar-title>{{ message_user[0].full_name }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-menu
        v-model="userDetailMenu"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
    >
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
    </v-menu>
  </v-toolbar>
  <v-toolbar flat color="transparent" v-else>

  </v-toolbar>
</template>

<script>
export default {
  props: {
    drawer: Boolean,
    message_user: Array,
    onToggleDrawer: Function,
  },
  data() {
    return {
      userDetailMenu: false,
    };
  },
  methods:{
    check(message_user){
      if (message_user.length > 0){
        if (typeof message_user[0].profile_pic_url !== "undefined"){
          return true
        }
        else {
          return false
        }
      }
      else{
        return false
      }
    }
  }
};
</script>