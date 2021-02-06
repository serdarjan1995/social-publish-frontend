<template>
  <v-container fluid class="fill-height">
    <v-row class="basic-stats">
      <v-col md="12">
        <to-do-list :items="items" :allData="allData"/>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import ToDoList from "@/views/SocialMedia/Admin/Payment/Component/ToDoList";

export default {
  components: {
    ToDoList,
  },
  props: {
    items: {
      type: Array
    },
    allData: {
    }
  },
  data() {
    return {}
  },
  created() {
    console.log("billing report created")
  }
};
</script>
<style scoped>

.payment-report-row {
  width: 100%;
  display: flex !important;
  justify-content: space-between !important;

}

</style>
