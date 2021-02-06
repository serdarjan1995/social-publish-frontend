<template>
  <v-sheet class="transparent">
    <v-list-item>
      <v-slider
            color="success"
            label="Size"
            min="1"
            max="3"
            thumb-label
            v-model="font_size"
      />
    </v-list-item>
  </v-sheet>
</template>
<script>
export default {
  data(){
    return{
      font_size:2
    }
  }
}
</script>