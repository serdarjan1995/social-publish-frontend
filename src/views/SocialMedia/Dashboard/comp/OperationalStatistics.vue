<template>
  <v-row>
    <v-col
        cols="12"
        sm="12"
        lg="6"
        class="pt-0 rounded_corner"
        v-for="(item, key) in getStatisticData"
        :key="key"
    >
      <operational-basic-statistic
          :heading="item.heading"
          :sub-text="item.subText"
          :avatar="item"
          :title="item.text"
      >
      </operational-basic-statistic>
    </v-col>
  </v-row>
</template>
<script>
import OperationalBasicStatistic from "@/components/UI/Widgets/Cards/Statistics/OperationalBasicStatistic";

export default {
  components: {OperationalBasicStatistic},
  computed:{
    getStatisticData(){
      let myStatisticData = [
        {
          icon: "mdi-briefcase",
          style: {},
          avatarStyle: {size: 50, xLarge: true},
          text: this.getTextEn("Operational.caseSum"),
          heading: "0",
          subText: ",00 ₺",
          title: null
        },
        {
          icon: "mdi-bank",
          style: {},
          avatarStyle: {size: 50},
          text: this.getTextEn("Operational.bankSum"),
          heading: "0",
          subText: ",00 ₺",
          title: null
        },
        {
          icon: "mdi-dropbox",
          style: {},
          avatarStyle: {size: 50},
          text: this.getTextEn("Operational.totalStock"),
          heading: "0",
          subText: ",00 ₺",
          title: null
        },
        {
          icon: "mdi-account-group",
          style: {},
          avatarStyle: {size: 50},
          text: this.getTextEn("Operational.customerBalance"),
          heading: "0",
          subText: ",00 ₺",
          title: null
        },
        {
          icon: "mdi-file-document",
          style: {},
          avatarStyle: {size: 50},
          text: this.getTextEn("Operational.getInvoiceSum"),
          heading: "0",
          subText: ",00 ₺",
          title: null
        },
        {
          icon: "mdi-file-document",
          style: {},
          avatarStyle: {size: 50},
          text: this.getTextEn("Operational.sellInvoiceSum"),
          heading: "0",
          subText: ",00 ₺",
          title: null
        },
      ];
      return myStatisticData;
    }
  },
  methods: {
    getTextEn(myText) {
      return this.$i18n.t('' + myText + '')
    }
  },
  data() {
    return {
    };
  }
};
</script>
<style scoped>
.rounded_corner {
  border-radius: 10px;
}
</style>