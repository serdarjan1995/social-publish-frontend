<template>
  <!-- Storage Capacity -->
  <v-container fluid>
    <v-sheet class="neu-glow-inset rounded-lg">
      <v-toolbar flat color="transparent">
        <v-row>
          <v-toolbar-title class="pr-3 pl-3">
            {{title}}
          </v-toolbar-title>
        </v-row>
        <v-container>
          <v-progress-linear
                v-model="percentage"
                color="blue-grey"
                rounded
                striped
                height="25"
          >
            <template v-slot="{ value }">
              <strong>{{ Math.ceil(value) }}%</strong>
            </template>
          </v-progress-linear>
        </v-container>

      </v-toolbar>
    </v-sheet>
  </v-container>
  <!-- Storage Capacity /end-->
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                required: true,
            },
            percentage: {
                type: Number,
                required: true,
            }
        }
    }
</script>

<style scoped>

</style>