<template>
  <v-list-item class="private-item-area">
    <v-list-item-action class="mr-5">
    </v-list-item-action>

    <v-list-item-avatar>
    </v-list-item-avatar>

    <v-list-item-content class="ml-5">
      <v-list-item-title class="private-item-header">{{ $t('UserManager.NameSurname') }}</v-list-item-title>
    </v-list-item-content>

    <v-list-item-content @click="() => {}" class="hidden-sm-and-down">
      <v-list-item-title class="private-item-header">{{ $t('UserManager.Email') }}</v-list-item-title>
    </v-list-item-content>

    <v-list-item-content @click="() => {}" class="hidden-md-and-down">
      <v-list-item-title class="private-item-header">{{ $t('UserManager.Telephone') }}</v-list-item-title>
    </v-list-item-content>

    <v-list-item-content class="hidden-md-and-down private-width">
      <v-list-item-title class="private-item-header">{{ $t('UserManager.Status') }}</v-list-item-title>
    </v-list-item-content>
    <v-list-item-content class="hidden-md-and-down private-width-two">
      <v-list-item-title class="private-item-header">{{ $t('UserManager.EmailApproval') }}</v-list-item-title>
    </v-list-item-content>

    <!--        <v-list-item-action @click.stop="item.status = !item.status" class="compact-action">-->
    <!--            <v-icon :color="item.status ? 'amber' : ''">{{ item.status ? "star" : "star_border" }}</v-icon>-->
    <!--        </v-list-item-action>-->

    <v-list-item-action class="compact-action" @click.prevent>
    </v-list-item-action>

  </v-list-item>
</template>

<script>
export default {
name: "UserTablesHeader"
}
</script>

<style scoped>
  .private-item-header {
    font-weight: bolder;
    font-size: 14px !important;
  }
  .v-avatar.v-list-item__avatar {
    margin: 0 !important;
  }
  .v-list--two-line .v-list-item, .v-list-item--two-line {
    min-height: 40px;
  }
  .private-item-area {
    max-height: 27px !important;
    min-height: 27px !important;
  }
</style>