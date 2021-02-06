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
  computed: {
    getMyData() {
      let myVar = {
        list: [
          {
            title: users[4].name,
            subtitle: "VueJS, Laravel",
            avatar: {
              src: users[4].avatar,
            },
            action: {
              btn: {
                icon: "comment",
                style: {
                  small: true,
                  color: "red",
                },
              },
              style: {
                icon: true,
                xSmall: true,
              },
            },
          },
          {
            title: users[8].name,
            subtitle: "MySQL, MongoDB, Laravel",
            avatar: {
              src: users[8].avatar,
            },
            action: {
              btn: {
                icon: "share",
                style: {
                  small: true,
                  color: "red",
                },
              },
              style: {
                icon: true,
                xSmall: true,
              },
            },
          },
          {
            title: users[15].name,
            subtitle: "React, Redux, Redux-Saga",
            avatar: {
              src: users[15].avatar,
            },
            action: {
              btn: {
                icon: "favorite",
                style: {
                  small: true,
                  color: "red",
                },
              },
              style: {
                icon: true,
                xSmall: true,
              },
            },
          },
          {
            title: users[2].name,
            subtitle: "React, Redux, Redux-Saga",
            avatar: {
              src: users[2].avatar,
            },
            action: {
              btn: {
                icon: "favorite",
                style: {
                  small: true,
                  color: "red",
                },
              },
              style: {
                icon: true,
                xSmall: true,
              },
            },
          },
          {
            title: users[11].name,
            subtitle: "Atomic Design",
            avatar: {
              src: users[11].avatar,
            },
            action: {
              btn: {
                icon: "favorite",
                style: {
                  small: true,
                  color: "red",
                },
              },
              style: {
                icon: true,
                xSmall: true,
              },
            },
          },
          {
            title: users[14].name,
            subtitle: "GraphQL, Apollo, ReactJS",
            avatar: {
              src: users[14].avatar,
            },
            action: {
              btn: {
                icon: "favorite",
                style: {
                  small: true,
                  color: "red",
                },
              },
              style: {
                icon: true,
                xSmall: true,
              },
            },
          },
        ],
        title: this.getTextEn("Operational.latestInteractions"),
      };
      return myVar;
    }
  },
  data() {
    return {};
  },
  beforeDestroy() {
    this.componentProps = null;
    delete this.componentProps;
  },
};
</script>
