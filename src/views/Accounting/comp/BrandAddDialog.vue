<template>
  <v-row justify="center">
    <v-dialog
        v-model="show"
        width="60%"
        v-bind:contentClass="this.$parent.isDark?'shadowed-box-lightgray':'shadowed-box-black'"
    >
      <v-card>
        <v-toolbar dense>
          <v-icon class="mr-2">mdi-account-group</v-icon>
          <v-toolbar-title class="text-center">Başvuru Yap</v-toolbar-title>
          <v-spacer/>
          <v-btn icon @click="$emit('add-caption-dialog-close')">
            <v-icon small>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container style="width:70%" class="mx-auto">
          <div style="width:70%" class="mx-auto">
            <v-btn class="myBtn" @click="changeTab(1)" v-bind:class="{ myActive: this.selectedDialog === 1 }">
              Bireysel Başvuru
            </v-btn>
            <v-btn class="myBtn" @click="changeTab(2)" v-bind:class="{ myActive: this.selectedDialog === 2 }">
              Kurumsal Başvuru
            </v-btn>
          </div>
          <v-row v-if="this.selectedDialog === 1">
            <v-col cols="6" sm="6" class="ma-0 pa-1">
              <strong>Ad Soyad</strong>
              <v-text-field hideDetails class="mt-1" dense outlined></v-text-field>
            </v-col>
            <v-col cols="6" sm="6" class="ma-0 pa-1">
              <strong>TC Kimlik No</strong>
              <v-text-field hideDetails class="mt-1" dense outlined></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" class="ma-0 pa-1">
              <strong>Adres</strong>
              <v-text-field hideDetails class="mt-1" dense outlined></v-text-field>
            </v-col>
            <v-col cols="6" sm="6" class="ma-0 pa-1">
              <strong>Şehir</strong>
              <v-text-field hideDetails class="mt-1" dense outlined></v-text-field>
            </v-col>
            <v-col cols="6" sm="6" class="ma-0 pa-1">
              <strong>İlçe</strong>
              <v-text-field hideDetails class="mt-1" dense outlined></v-text-field>
            </v-col>
            <v-col cols="6" sm="6" class="ma-0 pa-1">
              <strong>Telefon</strong>
              <v-text-field hideDetails class="mt-1" dense outlined></v-text-field>
            </v-col>
            <v-col cols="6" sm="6" class="ma-0 pa-1">
              <strong>Posta Kodu</strong>
              <v-text-field hideDetails class="mt-1" dense outlined></v-text-field>
            </v-col>
          </v-row>
          <v-row v-if="this.selectedDialog === 2">
            <v-col cols="12" sm="12" class="ma-0 pa-1">
              <strong>Şirket Ünvanı</strong>
              <v-text-field hideDetails class="mt-1" dense outlined></v-text-field>
            </v-col>
            <v-col cols="6" sm="6" class="ma-0 pa-1">
              <strong>Vergi Dairesi</strong>
              <v-text-field hideDetails class="mt-1" dense outlined></v-text-field>
            </v-col>
            <v-col cols="6" sm="6" class="ma-0 pa-1">
              <strong>Vergi No</strong>
              <v-text-field hideDetails class="mt-1" dense outlined></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" class="ma-0 pa-1">
              <strong>Adres</strong>
              <v-text-field hideDetails class="mt-1" dense outlined></v-text-field>
            </v-col>
            <v-col cols="6" sm="6" class="ma-0 pa-1">
              <strong>Şehir</strong>
              <v-text-field hideDetails class="mt-1" dense outlined></v-text-field>
            </v-col>
            <v-col cols="6" sm="6" class="ma-0 pa-1">
              <strong>İlçe</strong>
              <v-text-field hideDetails class="mt-1" dense outlined></v-text-field>
            </v-col>
            <v-col cols="6" sm="6" class="ma-0 pa-1">
              <strong>Telefon</strong>
              <v-text-field hideDetails class="mt-1" dense outlined></v-text-field>
            </v-col>
            <v-col cols="6" sm="6" class="ma-0 pa-1">
              <strong>Posta Kodu</strong>
              <v-text-field hideDetails class="mt-1" dense outlined></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions class="cardActions">
          <v-spacer></v-spacer>
          <v-btn class="myCustomBtn" color="black darken-1" text @click="$emit('add-caption-dialog-close')">İptal</v-btn>
          <v-btn class="myCustomBtn" color="warning" @click="$emit('add-caption-dialog-close')">Tamam</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import EventBus from "@/plugins/event-bus";

export default {
  name: "BrandAddDialog",
  data() {
    return {
      selectedDialog:1
    }
  },
  props: {
    model: Boolean,
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