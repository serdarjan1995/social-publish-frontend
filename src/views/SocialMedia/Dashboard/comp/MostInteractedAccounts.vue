<template>
  <flex-list v-bind="getMyData" v-if="getMyData"/>
</template>
<script>
import {users} from "@/data/dummyData";
import subDays from "date-fns/subDays";
import format from "date-fns/format";
import FlexList from "@/components/UI/List/FlexList/FlexList";

export default {
  components: {FlexList},
  methods: {
    getTextEn(myText) {
      return this.$i18n.t('' + myText + '')
    }
  },
  computed:{
    getMyData(){
      return {
        title: this.getTextEn("Analytical.mostInteractedAccount"),
        list: [
          {
            title: users[10].name,
            subtitle: 'Maker',
            body: format(subDays(new Date(), 5), "MMM dd, yyyy"),
            avatar: {
              src: users[10].avatar,
              icon: 'mdi-facebook',
            },
            action: {
              text: "+607",
              style: {
                class: "green--text",
                name: '@bestangelno1',
              },
            },
          },
          {
            title: users[14].name,
            subtitle: 'Actor',
            body: format(subDays(new Date(), 7), "MMM dd, yyyy"),
            avatar: {
              src: users[14].avatar,
              icon: 'mdi-instagram',
            },
            action: {
              text: "-106",
              style: {
                class: "red--text",
                name: '@fr1ster',
              },
            },
          },
          {
            title: users[9].name,
            subtitle: 'Engineer',
            body: format(subDays(new Date(), 8), "MMM dd, yyyy"),
            avatar: {
              src: users[9].avatar,
              icon: 'mdi-instagram',
            },
            action: {
              text: "+106",
              style: {
                class: "green--text",
                name: '@gulnaz86',
              },
            },
          },
          {
            title: users[13].name,
            subtitle: 'Model',
            body: format(subDays(new Date(), 9), "MMM dd, yyyy"),
            avatar: {
              src: users[13].avatar,
              icon: 'mdi-twitter',
            },
            action: {
              text: "+116",
              style: {
                class: "green--text",
                name: '@liversidge13'
              },
            },
          },
        ],
        alignItems: "center",
      };
    }
  },
  data() {
    return {
    };
  },
  beforeDestroy() {
    this.componentProps = null;
    delete this.componentProps;
  },
};
</script>
