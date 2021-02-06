<template>
    <v-list-item>
        <v-list-item-action @click.stop class="mr-5">
            <v-checkbox
                    color="sidebar"
                    hide-details
                    v-model="item.selected"
            ></v-checkbox>
        </v-list-item-action>

        <v-list-item-avatar>
            <img v-bind:src="item.avatar" />
        </v-list-item-avatar>

        <v-list-item-content class="ml-5">
            <v-list-item-title
            >{{ item.name }} {{ item.surname }}</v-list-item-title
            >
        </v-list-item-content>

        <v-list-item-content @click="() => {}" class="hidden-sm-and-down">
            <v-list-item-title>{{ item.email }}</v-list-item-title>
        </v-list-item-content>

        <v-list-item-content @click="() => {}" class="hidden-md-and-down">
            <v-list-item-title>{{ item.phone_number }}</v-list-item-title>
        </v-list-item-content>

        <v-list-item-content class="hidden-md-and-down private-width">
            <v-list-item-title>
              <v-btn x-small v-show="item.status === 0" @click="userStatus(true, item)"  color="success" dark>{{ $t('UserManager.FormOpen') }}</v-btn>
              <v-btn x-small v-show="item.status === 1" @click="userStatus(false, item)"  color="error" dark>{{ $t('UserManager.FormClosed') }}</v-btn>
            </v-list-item-title>
        </v-list-item-content>
        <v-list-item-content class="hidden-md-and-down private-width-two">
            <v-list-item-title>
              <v-btn class="ml-1" x-small v-show="item.email_verified === 0" @click="userVerified(1, item)"  color="success" dark>{{ $t('UserManager.FormApproved') }}</v-btn>
              <v-btn class="ml-1" x-small v-show="item.email_verified === 1" @click="userVerified(0, item)"  color="error" dark>{{ $t('UserManager.FormUnauthorized') }}</v-btn>
            </v-list-item-title>
        </v-list-item-content>

<!--        <v-list-item-action @click.stop="item.status = !item.status" class="compact-action">-->
<!--            <v-icon :color="item.status ? 'amber' : ''">{{ item.status ? "star" : "star_border" }}</v-icon>-->
<!--        </v-list-item-action>-->

        <v-list-item-action class="compact-action" @click.prevent>
            <v-menu offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn icon small class="content-ma-0" v-on="on">
                        <v-icon small>more_vert</v-icon>
                    </v-btn>
                </template>
                <v-list class="with-radius neu-glow" dense>
                    <v-list-item v-if="this.can('user_switch')">
                        <v-list-item-title>{{ $t('UserManager.Switch') }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item  v-if="this.can('user_show')">
                        <v-list-item-title @click="onEdit(item)">{{ $t('UserManager.Update') }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-list-item-action>

    </v-list-item>
</template>

<script>
    export default {
        props: {
            item: Object,
            onEdit: Function,
            SendMessage: Function,
        },
        data() {
            return {
                isChecked: this.isCompleted,
            };
        },
        methods: {
          userStatus(type, data){
            let sendData  = {
              'selectedData': [{id: data.id}],
              'type': type
            }
            this.$store.dispatch("users_manager/userStatus", sendData).then(() => {
              location.reload()
            })
            .catch((e) => {
              console.log(e)
            })
          },
          userVerified(type, data){
            console.log(this.item.email_verified)
            let sendData  = {
              'id': data.id,
              'type': type
            }
            this.$store.dispatch("users_manager/userVerified", sendData).then((response) => {
              console.log(response)
              location.reload()
            })
            .catch((e) => {
              console.log(e)
            })
          }
        }
    };
</script>
<style scoped>
  .v-avatar.v-list-item__avatar {
    margin: 0 !important;
  }
  .v-list--two-line .v-list-item, .v-list-item--two-line {
    min-height: 55px;
  }
</style>