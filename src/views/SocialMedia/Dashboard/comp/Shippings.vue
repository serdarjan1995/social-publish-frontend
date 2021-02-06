<template>
  <v-card class="neu-glow">
    <v-card-text>
      <v-data-table
          :headers="headers"
          :items="cargos"
          :items-per-page="5"
          class="elevation-1"
      >
        <template v-slot:item.location="{ item }">
          <a :hreF="item.location" target="_blank" class="text-decoration-none">
            <v-icon>mdi-map-marker</v-icon>
          </a>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import {cargos} from '@/data/dummyData';

export default {
  methods: {
    getTextEn(myText) {
      return this.$i18n.t('' + myText + '')
    }
  },
  data() {
    return {
      headers: [
        {text: this.getTextEn("Operational.cargoCompany"), value: 'factory'},
        {text: this.getTextEn("Operational.product"), value: 'product'},
        {text: this.getTextEn("Operational.date"), value: 'ship_date'},
        {text: this.getTextEn("Operational.estimatedDeliveryTime"), value: 'estimated_time'},
        {text: this.getTextEn("Operational.cargoFee"), value: 'price'},
        {text: this.getTextEn("Operational.personalName"), value: 'user'},
        {text: this.getTextEn("Operational.personalPhone"), value: 'phone'},
        {text: this.getTextEn("Operational.location"), value: 'location'},
        {text: this.getTextEn("Operational.status"), value: 'confirm'},
      ],
      cargos
    }
  },
}
</script>

<style scoped>

</style>