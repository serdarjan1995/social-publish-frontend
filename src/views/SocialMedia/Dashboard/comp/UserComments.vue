<template>
  <flex-list v-bind="getMyData" v-if="getMyData"/>
</template>
<script>
import {users} from "@/data/dummyData";
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
      let componentProps = {
            title: this.getTextEn("Operational.userComments"),
            list: [
              {
                title: users[10].name,
                subtitle: users[10].email,
                body: "Culpa sint aliqua adipisicing officia aliquip excepteur occaecat dolor velit culpa ullamco.",
                avatar: {
                  src: users[10].avatar,
                },
              },
          {
            title: users[14].name,
            subtitle: users[10].email,
            body: "Culpa sint aliqua adipisicing officia aliquip excepteur occaecat dolor velit culpa ullamco.",
            avatar: {
              src: users[14].avatar,
            },
          },
          {
            title: users[9].name,
            subtitle: users[9].email,
            body: "Culpa sint aliqua adipisicing officia aliquip excepteur occaecat dolor velit culpa ullamco.",
            avatar: {
              src: users[9].avatar,
            },
          },
          {
            title: users[13].name,
            subtitle: users[13].email,
            body: "Culpa sint aliqua adipisicing officia aliquip excepteur occaecat dolor velit culpa ullamco.",
            avatar: {
              src: users[13].avatar,
            },
          },
          ],
          alignItems: "center",
          };
      return componentProps;
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
