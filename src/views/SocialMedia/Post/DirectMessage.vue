<template>
  <div class="vuse-content-wrapper">
    <vuse-section-definition
        :title="page"
        icon="dashboard"
    ></vuse-section-definition>
    <v-container fluid class="fill-height">
      <v-row justify="center" align="center">
        <v-sheet color="transparent">
          <h2>   Hello {{ slug }}</h2>
        </v-sheet>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  namespace: "share",
  name: 'DirectMessage',
  data() {
    return {
      slug:this.$route.params.any,
      page: "DirectMessage",
      breadcrumbs: [
        {
          text: "DirectMessage",
          disabled: true,
        },
      ],

    };
  },
};
</script>

