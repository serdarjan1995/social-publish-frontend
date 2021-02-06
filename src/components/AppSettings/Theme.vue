<template>
  <v-sheet class="transparent mx-3" max-width="200">
    <div>
      <v-switch v-model="isDarkMod" label="Dark Theme"></v-switch>
      <v-switch v-model="isSemiDarkMod" label="Semi Dark Theme"></v-switch>
      <v-switch v-model="isRtl" label="RTL"></v-switch>
    </div>
  </v-sheet>
</template>
<script>
import {mapGetters} from "vuex";
import EventBus from "@/plugins/event-bus";

export default {
  computed: {
    ...mapGetters("navigations", ["isClippedOver", "isInsetFooter"]),
    ...mapGetters("scheme", ["dark", "semidark", "header", "footer", "rtl"]),
    isDarkMod: {
      get() {
        return this.dark;
      },
      set(value) {
        this.$vuetify.theme.dark = value;
        EventBus.$emit('dark-mode-theme', value);
        this.$store.dispatch("scheme/setDarkTheme", value);
      },
    },
    isSemiDarkMod: {
      get() {
        return this.semidark;
      },
      set(value) {
        this.$store.dispatch("scheme/setSemiDarkTheme", value);
      },
    },
    isRtl: {
      get() {
        return this.rtl;
      },
      set(value) {
        this.$vuetify.rtl = value;
        this.$store.dispatch("scheme/setRtl", value);
        this.$store.dispatch("navigations/setSidenavPositionRight", value);
      },
    },
  },
  methods: {
    endStr(str) {
      return str[str.length - 1];
    },
    convertToClass(str) {
      const end = this.endStr(str);
      const sub = str.substr(0, str.length - 1);

      if (isNaN(parseInt(end))) return str;

      return `${sub}-${end}`;
    },

  },
};

</script>
