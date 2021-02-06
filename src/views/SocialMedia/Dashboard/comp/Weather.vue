<template>
  <v-card class="neu-glow">
    <v-card-text>
      <foreign-currency/>
    </v-card-text>
  </v-card>
</template>
<script>
import ForeignCurrency from "@/views/SocialMedia/Dashboard/comp/ForeignCurrency";

export default {
  components: {ForeignCurrency},
  methods: {
    getTextEn(myText) {
      return this.$i18n.t('' + myText + '')
    }
  },
  data() {
    return {
      labels: ["SU", "MO", "TU", "WED", "TH", "FR", "SA"],
      time: 0,
      forecast: [
        {
          day: "Tuesday",
          icon: "mdi-white-balance-sunny",
          temp: "24\xB0/12\xB0",
        },
        {
          day: "Wednesday",
          icon: "mdi-white-balance-sunny",
          temp: "22\xB0/14\xB0",
        },
        {day: "Thursday", icon: "mdi-cloud", temp: "25\xB0/15\xB0"},
      ],
    };
  },
};
</script>