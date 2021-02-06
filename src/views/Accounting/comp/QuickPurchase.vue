<template>
  <v-row justify="center">
    <v-dialog
        v-model="show"
        v-if="item"
        width="450"
        v-bind:contentClass="this.$parent.isDark?'shadowed-box-lightgray':'shadowed-box-black'"
    >
      <v-card>
        <v-toolbar dense>
          <v-toolbar-title class="text-center">Markanız için ek hizmet satın alın!</v-toolbar-title>
          <v-spacer/>
          <v-btn icon @click="$emit('add-caption-dialog-close')">
            <v-icon small>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-row class="ekhizmetler-row">
          <v-col cols="3"
                 class="ekhizmetler-link"
                 style="cursor: pointer;">
            <div class="ekhizmetler-wrapper">
              <v-row>
                <v-col cols="4" class="text-center">
                  <img :src="item.image" style="max-width:75px !important">
                </v-col>
                <v-col cols="8">
                  <h4 class="properties text-left-i display-inline">{{ item.title }}</h4>
                  <p>{{ item.description }}</p>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
        <div class="registration-container">
          <div class="container properties">
            Marka Adı
            <v-text-field backgroundColor="white" style="border-color:white" dense outlined></v-text-field>
          </div>
        </div>
        <v-container style="width:99%" class="mx-auto">
          <v-row>
            <v-col cols="6">
              <strong>Gerekli Belgeler</strong>
              <v-list>
                <v-list-item v-for="(listItem, index) in item.requiredDocuments" :key="index">
                  - {{listItem.name}}
                </v-list-item>
              </v-list>
            </v-col>
            <v-col cols="6">
              <div class="form-group row result-cart-textboxes mt-3">
                <div class="input-group">
                  <span class="brl-3 input-group-addon cart-result-form">Kurum Harcı</span>
                  <span id="harcTutari" class="brr-3 form-control text-right">
                            <span style="display:inline" class="pp-price pp-price-TRY" >
                              {{item.fee}},00
                            </span>
                            <span>
                              ₺
                            </span>
                          </span>
                </div>
                <div class="input-group">
                  <span class="brl-3 input-group-addon cart-result-form">Hizmet Bedeli</span>
                  <span id="hizmetBedeli" class="brr-3 form-control text-right">
                            <span style="display:inline" class="pp-price pp-price-TRY">
                              {{item.servicePrice}},00
                            </span>
                            <span>
                              ₺
                            </span>
                          </span>
                </div>
                <div class="input-group">
                  <span class="brl-3 input-group-addon cart-result-form-final">Toplam</span>
                  <span id="toplamBedel" class="brr-3 form-control text-right">
                    <span style="display:inline" class="pp-price pp-price-TRY">
                              {{ Number(item.fee) + Number(item.servicePrice) }},00
                            </span>
                            <span>
                              ₺
                            </span>
                          </span>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions class="cardActions">
          <v-spacer></v-spacer>
          <v-btn class="myCustomBtn" color="warning" @click="$emit('add-caption-dialog-close')">Başvuru Yap</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import EventBus from "@/plugins/event-bus";

export default {
  name: "QuickPurchase",
  data() {
    return {
      selectedDialog:1
    }
  },
  props: {
    model: Boolean,
    item: Object
  },
  computed: {
    textList:{
      get(){
        return this.$store.state.text_templates.textList
      },
      set(newValue) {
        this.$store.state.text_templates.textList = newValue
      }
    },
    show:{
      get() {
        return this.model
      },
      set() {
        this.$emit('add-caption-dialog-close')
      }
    },
    accountCategories(){
      return this.$store.state.accounts.categories
    },
  },
  methods: {
    changeTab(value){
      this.selectedDialog = value
    },
    chooseItem(value){
      EventBus.$emit('change-caption', value.description)
    }
  },
  created() {
    this.$store.dispatch("text_templates/getTextList")
  }
}
</script>

<style scoped>
.myCustomBtn {
  text-transform: none !important;
}
.cardActions{
  border-style: solid !important;
  border-color: #fff !important;
  background: #f6f7fa;
}
.myActive{
  background-color: #656d78 !important;
  color: #fff !important;
  -webkit-box-shadow: inset 0 -3px 0 0 rgba(34,34,34,0.1);
}
.myBtn{
  background-color: #f6f7fa;
  color: #333;
  font-size: 15px;
  -webkit-box-shadow: inset 0 -3px 0 0 rgba(34,34,34,0.1);
  text-transform: none;
  width:50%;
}
.v-input__slot{
  max-height:30px !important;
  min-height:30px !important;
}
.shadowed-box-lightgray {
  box-shadow: 0 0 10px rgb(153, 167, 175) !important;
}
.shadowed-box-black {
  box-shadow: 0 0 10px rgb(36, 41, 43) !important;
}
</style>