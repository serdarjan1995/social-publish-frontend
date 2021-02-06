<template>
  <searchable-list v-bind="getMyData" v-if="getMyData"/>
</template>

<script>
import {users} from "@/data/dummyData";
import SearchableList from "@/components/UI/Widgets/Lists/SearchableList";

export default {
  components: {SearchableList},
  methods: {
    getTextEn(myText) {
      return this.$i18n.t('' + myText + '')
    }
  },
  computed:{
    getMyData(){
      let myData = {
            list: [
              {
                title: users[3].name,
                subtitle: users[3].designation,
                avatar: {
                  src: users[3].avatar,
                  // icon: "add",
                  // style: {
                  //   color: "blue"
                  // }
                },
                action: {
                  btn: {
                    icon: "add",
                    style: {
                      small: true,
                      color: "teal accent-4",
                    },
                  },
                  style: {
                    fab: true,
                    xSmall: true,
                    class: "neu-glow",
                  },
                },
              },
          {
            title: users[5].name,
            subtitle: users[5].designation,
            avatar: {
              src: users[5].avatar,
            },
            action: {
              btn: {
                icon: "add",
                style: {
                  small: true,
                  color: "teal accent-4",
                },
              },
              style: {
                fab: true,
                xSmall: true,
                class: "neu-glow",
              },
            },
          },
          {
            title: users[7].name,
            subtitle: users[7].designation,
            avatar: {
              src: users[7].avatar,
            },
            action: {
              btn: {
                icon: "add",
                style: {
                  small: true,
                  color: "teal accent-4",
                },
              },
              style: {
                fab: true,
                xSmall: true,
                class: "neu-glow",
              },
            },
          },
          {
            title: users[15].name,
            subtitle: users[15].designation,
            avatar: {
              src: users[15].avatar,
            },
            action: {
              btn: {
                icon: "add",
                style: {
                  small: true,
                  color: "teal accent-4",
                },
              },
              style: {
                fab: true,
                xSmall: true,
                class: "neu-glow",
              },
            },
          },
          {
            title: users[13].name,
            subtitle: users[13].designation,
            avatar: {
              src: users[13].avatar,
            },
            action: {
              btn: {
                icon: "add",
                style: {
                  small: true,
                  color: "teal accent-4",
                },
              },
              style: {
                fab: true,
                xSmall: true,
                class: "neu-glow",
              },
            },
          },
          ],
          title: this.getTextEn("Operational.latestFollowers"),
    };
      return myData;
    }
  },
  data() {
    return {
    };
  }
};
</script>
