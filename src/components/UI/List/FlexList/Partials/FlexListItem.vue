<template>
  <v-hover v-slot:default="{ hover }">

    <v-col
      class="d-flex with-radius pos-relative flex-wrap"
      cols="12"
      :class="{ ...classes, 'neu-glow-inset': hover, 'neu-glow': !hover }"
    >
      <v-img :src="img.src" :lazy-src="img.src" v-bind="img.style" v-if="img">
      </v-img>

      <!-- Content Area -->
      <div class="list-content child-flex flex-grow-1">
        <div class="text-subtitle-2 mt-1">
          <!-- Avatar -->
          <v-avatar
              v-if="avatar"
              v-bind="avatar.avatarStyle ? avatar.avatarStyle : {}"
          >
            <img :src="avatar.src"/>
          </v-avatar>
          {{ title }}</div>
        <div class="text-subtitle-2 mt-1">{{ message }}</div>
        <div class="text-body-2 mt-1">{{ subtitle }}</div>
      </div>
      <!-- Social Media -->
      <div class="list-content child-flex flex-grow-1 mt-2 private-notification-date">
        <span class="float-left private-social-media" :style="{ background: action.style.color, color: action.style.textColor }">
          <v-icon
              :style="{ color: action.style.textColor }">{{ avatar.icon }}</v-icon>{{ action.style.name }}</span>
        <small class="text-body-2" v-html="body"></small>
      </div>

      <!--   Message Send   -->
      <div class="private-send-message" v-if="messageType">
        <v-text-field v-model="notificationMessage" class="private-text-field" style="font-size: 14px !important;" :label="$t('Notification.WriteReply')"></v-text-field>
        <v-icon @click="sendUserMessage(sendUserId, action.style.id)" class="private-text-button" color="success">send</v-icon>
      </div>
    </v-col>
  </v-hover>
</template>
<script>
/**
 * Refer readme for schema
 */
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
    desc: {
      type: String,
      default: "",
    },
    body: {
      type: String,
      default: "",
    },
    img: {
      type: Object,
      default: null,
    },
    avatar: {
      type: Object,
      default: null,
    },
    action: {
      type: Object,
      default: null,
    },
    sendUserImage: {
      type: String,
      default: null,
    },
    sendUserName: {
      type: String,
      default: null,
    },
    sendUserId: {
      type: String,
      default: null,
    },
    messageType: {
      default: null,
    },
    items: {
      default: null,
    },
    alignItems: {
      type: String,
      default: "center",
    },
  },

  data() {
    return {
      menuItems: [
        { title: "Edit" },
        { title: "Move to Archive" },
        { title: "Delete" },
      ],
      notificationMessage: ""
    };
  },
  computed: {
    classes() {
      return {
        "align-center": this.alignItems === "center",
        "align-start": this.alignItems === "start",
      };
    },
  },
  methods:{
    sendUserMessage(send_id, type) {
      const data = {
        message: this.notificationMessage,
        send_id: send_id,
        type: type
      }
      this.$store.dispatch("notifications/sendMessage", data)
    }
  }
};
</script>
<style>
  .private-send-message {
    width: 100%;
  }
  .private-text-field {
    float: left;
    width: 90%;
  }
  .private-text-button {
    position: relative;
    padding-top: 15px;
    padding-left: 6px;
    font-size: 20px !important;
    cursor: pointer;
  }
  .private-send-message label.v-label.theme--dark {
    font-size: 14px !important;
  }
  .private-notification-date {
    width: 100%;
    display: block;
    text-align: right;
  }
  .private-social-media {
    font-size: 12px;
    padding: 2px;
    border-radius: 7px;
  }
  .private-social-media i {
    font-size: 19px !important;
    padding-right: 1px;
  }
</style>
