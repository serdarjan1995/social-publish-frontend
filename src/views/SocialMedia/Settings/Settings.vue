<template>
  <div class="vuse-content-wrapper">
    <vuse-section-definition
      :title="page"
      icon="dashboard"
    ></vuse-section-definition>
    <v-container fluid class="fill-height">
      <v-row justify="center" align="center">
        <v-sheet color="transparent">
          <h2 class="display-1">Settings Page!</h2>
        </v-sheet>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      page: "Settings",
      breadcrumbs: [
        {
          text: "Settings",
          disabled: true,
        },
      ],
    };
  },
};
</script>
