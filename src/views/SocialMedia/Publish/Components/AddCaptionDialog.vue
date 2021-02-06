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
          <v-toolbar-title>{{$t('Caption.addCaption')}}</v-toolbar-title>
          <v-spacer/>
          <v-btn icon @click="$emit('add-caption-dialog-close')">
            <v-icon small>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container
            v-if="textList.length > 0"
            fluid
        >
          <v-row>
            <v-col cols="12" sm="3" v-for="(item, index) in textList" :key="index">
              <v-card
                  @click="chooseItem(item)"
                  activeClass="neu-glow-inset"
              >
                <v-card-title>
                  {{item.title}}
                </v-card-title>
                <v-card-text>
                  {{item.description}}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

        </v-container>

      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import EventBus from "@/plugins/event-bus";

export default {
  name: "AddCaptionDialog",
  data() {
    return {
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
    chooseItem(value){
      EventBus.$emit('change-caption', value.description)
    }
  },
  created() {
    this.$store.dispatch("text_templates/getTextList")
  }
}
</script>

<style>
.shadowed-box-lightgray {
  box-shadow: 0 0 10px rgb(153, 167, 175) !important;
}
.shadowed-box-black {
  box-shadow: 0 0 10px rgb(36, 41, 43) !important;
}
</style>