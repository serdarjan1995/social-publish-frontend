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
    },
    allData: {
    }
  },
  data() {
    return {
      headers: [
        {text: "Type ", value: "type"},
        {text: "Email", value: "email", align: "right"},
        {text: "Id", value: "Id", align: "right"},
        {text: "Amount", value: "amount", align: "right"},
        {text: "Created", value: "created", align: "right"},
      ],
    }
  },
  created() {
    console.log("items report:", this.items);
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
