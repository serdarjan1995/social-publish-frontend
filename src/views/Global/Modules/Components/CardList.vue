<template>
  <div class="scrollable-content" ref="cards">
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="4" v-for="(item, index) in relativeCardList" :key="index">
          <v-card min-height="300" class="neu-glow">
            <v-img class="white--text align-start -align-right" height="200px"
                   :src="item.photo">
              <v-btn @click="toggleBookmark(item)"
                     icon
                     color="white"
                     elevation="24"
                     height="50px"
                     width="50px">
                <v-icon :color="changeColor(item)">mdi-heart</v-icon>
              </v-btn>
            </v-img>
            <v-card-title>{{ item.title }}</v-card-title>
            <v-card-subtitle class="custom-class">{{ item.desc }}</v-card-subtitle>
            <v-card-actions>
              <v-btn text color="primary" outlined @click="applyCardDialogHandler(item)">
                Apply
              </v-btn>
              <v-spacer></v-spacer>

              <h4>
                <v-icon x-small>remove_red_eye</v-icon>
                {{ item.count }}
              </h4>
            </v-card-actions>
          </v-card>
          <v-dialog v-model="confirmBox.model" max-width="420">
            <confirm-box
                :title="`Are you sure You want to apply to ${item.title}`"
                :subtitle="`${item.deepDesc}`"
                leftBtnTxt="Cancel"
                :leftBtnEvent="cancelDialog"
                rightBtnTxt="YES"
                :rightBtnEvent="applyItem"
                v-if="confirmBox.model"
            />
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ConfirmBox from "@/components/UI/Dialogs/ConfirmBox"

export default {
  components: {
    ConfirmBox
  },
  props: {
    relativeCardList: {
      type: Array,
      required: true
    },
    toggleBookmark: {
      type: Function,
      required: true
    },
    changeColor: {
      type: Function
    },
    applyCardDialogHandler: {
      type: Function
    },
    confirmBox: {
      type: Object
    }
  },
  methods:{
    cancelDialog() {
      this.confirmBox.model = false
      this.confirmBox.item = null
    },
    applyItem() {
      console.log("You APPLIED to this card!");
      this.cancelDialog();
    },
  }
};
</script>