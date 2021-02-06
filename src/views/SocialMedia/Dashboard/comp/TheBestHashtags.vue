<template>
  <flex-list v-bind="getMyData" v-if="getMyData"/>
</template>
<script>
import FlexList from "@/components/UI/List/FlexList/FlexList";
import {users} from "@/data/dummyData";
import format from "date-fns/format";
import subDays from "date-fns/subDays";

export default {
  components: {FlexList},
  methods: {
    getTextEn(myText) {
      return this.$i18n.t('' + myText + '')
    }
  },
  computed: {
    getMyData() {
      return {
        title: this.getTextEn("Analytical.bestHashtags"),
        list: [
          {
            title: users[1].name,
            subtitle: 'Engineer',
            body: format(subDays(new Date(), 5), "MMM dd, yyyy"),
            avatar: {
              icon: 'mdi-pound',
              src: users[1].avatar,
            },
            action: {
              text: "+607",
              style: {
                class: "green--text",
                name: 'TweetFromTheSeat',
              },
            },
          },
          {
            title: users[2].name,
            subtitle: 'Sales Operation',
            body: format(subDays(new Date(), 7), "MMM dd, yyyy"),
            avatar: {
              icon: 'mdi-pound',
              src: users[2].avatar,
            },
            action: {
              text: "-106",
              style: {
                class: "red--text",
                name: 'CollegeIn5Words',
              },
            },
          },
          {
            title: users[4].name,
            subtitle: 'Doctor',
            body: format(subDays(new Date(), 8), "MMM dd, yyyy"),
            avatar: {
              icon: 'mdi-pound',
              src: users[4].avatar,
            },
            action: {
              text: "+106",
              style: {
                class: "green--text",
                name: 'WantAnR8',
              },
            },
          },
          {
            title: users[5].name,
            subtitle: 'Barkeeper',
            body: format(subDays(new Date(), 9), "MMM dd, yyyy"),
            avatar: {
              icon: 'mdi-pound',
              src: users[5].avatar,
            },
            action: {
              text: "+116",
              style: {
                class: "green--text",
                name: 'PutACanOnIt',
              },
            },
          },
          {
            title: users[3].name,
            subtitle: 'Nurse',
            body: format(subDays(new Date(), 9), "MMM dd, yyyy"),
            avatar: {
              icon: 'mdi-pound',
              src: users[3].avatar,
            },
            action: {
              text: "+105",
              style: {
                class: "green--text",
                name: 'ShareaCoke',
              },
            },
          },
          {
            title: users[11].name,
            subtitle: 'Engineer',
            body: format(subDays(new Date(), 9), "MMM dd, yyyy"),
            avatar: {
              icon: 'mdi-pound',
              src: users[11].avatar,
            },
            action: {
              text: "+105",
              style: {
                class: "green--text",
                name: 'NationalFriedChickenDay',
              },
            },
          },
        ],
        alignItems: "center",
      };
    }
  },
  data() {
    return {};
  }
};
</script>
