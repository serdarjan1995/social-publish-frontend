<template>
  <v-sheet class="neu-glow-inset mb-5 private-sheet">
    <v-toolbar flat color="transparent">
      <v-toolbar-title class="text-h6">{{ $t('UserProfile.Overview') }}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <div class="text-body-2">{{ $store.state.user.profile.name }} {{ $store.state.user.profile.surname }}</div>
    </v-card-text>
    <v-spacer></v-spacer>
    <v-card-text>
      <div class="text-body-2">{{ $store.state.user.profile.email }}</div>
    </v-card-text>
    <v-card-text>
      <div class="text-body-2">{{ $store.state.user.profile.phone_number }}</div>
    </v-card-text>
  </v-sheet>
</template>
<script>
export default {
  props: {
    items: {
      type: Object,
      default: null,
    },
    name: {
      default: '',
    },
    surname: {
      default: '',
    },
    phone_number: {
      default: '',
    },
    email: {
      default: '',
    },
  },
  data() {
    return {
      authUser: {
        name: "Alice Blue",
        firstname: "Alice",
        lastname: "Blue",
        email: "aliceblue@example.com",
        avatar: `/static/ali.jpg`,
        mood: "Vuse - Powerful VuejS admin template.",
        status: {
          color: "success",
          icon: "check_circle",
        },
      },
    };
  },
};
</script>
