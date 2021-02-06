<template>
  <v-container fluid class="post-body" style="min-width:300px">
    <!-- Post Type Buttons -->
    <v-sheet class="transparent">
      <v-row class="fill-width ma-0 transparent">
        <v-btn-toggle
            class="fill-width ma-0 transparent"
            dense
            mandatory
            v-model="activePostType"
            @change="postTypeChanged"
        >
          <v-row class="fill-width ma-0 transparent">
            <v-col
                v-for="post_type in activePostTypeButtons"
                :key="post_type.name"
                class="pa-0 ma-0"
            >
              <v-btn
                  class="postTypeItem"
                  small
              >
                <v-icon small class="mr-1">{{ post_type.icon }}</v-icon>
                {{ $t('PostBody.' + post_type.name) }}
              </v-btn>
            </v-col>
          </v-row>
        </v-btn-toggle>
      </v-row>
    </v-sheet>
    <!-- Title Field -->
    <v-sheet class="transparent mb-3 mt-3" v-if="titleFieldActivate()">
      <v-text-field
          @keyup="titleChanged"
          v-model="titleText"
          :label="$t('PostBody.title')"
          prepend-inner-icon="mdi-format-text-variant"
          dense
          outlined
          style="font-size: small"
          hide-details
      ></v-text-field>
    </v-sheet>

    <!-- File Manager Field -->
    <v-sheet class="transparent mb-3 mt-3" v-if="fileManagerActivate()">
      <v-sheet
          fluid
          class="transparent rounded-lg fill-width neu-glow-inset mb-2"
          style="min-heigth:150px"
      >
        <div
            v-if="addedFiles.length === 0"
            class="fill-height fill-width"
            style="text-align: center;padding: 10px"
        >
          <p>{{ $t('PostBody.selectFiles') }}</p>
          <v-icon>mdi-arrow-bottom-left-thick</v-icon>
        </div>

        <!-- ADDED Files -->
        <v-container fluid>
          <v-row>
            <v-col cols="6" sm="2" v-for="(item, index) in addedFiles" :key="index">
              <v-card
                  class="fill-width fill-height border1px"
                  style="width:75px"
              >
                <v-img
                    v-if="getFile(item).type === 'image'"
                    :src="getFile(item).url"
                    :lazy-src="getFile(item).lazy"
                    aspect-ratio="1"
                >
                  <v-btn x-small icon
                         @click="removeFile(item)"
                         class="background-color-white-transparent"
                  >
                    <v-icon>close</v-icon>
                  </v-btn>
                </v-img>

                <div
                    v-if="getFile(item).type === 'video'"
                    class="video-container"
                >
                  <v-icon
                      class="centered-item video-icon"
                  >
                    mdi-play-circle
                  </v-icon>
                  <v-btn x-small icon
                         @click="removeFile(item)"
                         class="background-color-white-transparent"
                         style="z-index: 1"
                  >
                    <v-icon>close</v-icon>
                  </v-btn>
                  <video
                      height="100%"
                      width="100%"
                      class="video-item"
                      :src="getFile(item).url"
                  >
                  </video>
                </div>

                <v-img style="opacity: 0" v-if="getFile(item).type === 'video'" :src="loadingGif"/>

              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <!-- Dialog -->
        <file-manager-dialog
            :data="activePostTypeButtons[activePostType].name=== 'photo'?getOnlyPhotos:
                             activePostTypeButtons[activePostType].name=== 'video' ||
                             activePostTypeButtons[activePostType].name=== 'igtv'?getOnlyVideos:fileManagerData"
            :addedFiles="addedFiles"
            v-model="showFileManagerDialog"
        />

      </v-sheet>
      <v-sheet
          fluid
          class="transparent rounded-lg fill-width neu-glow-inset"
      >
        <v-row class="fill-width ma-0">

          <v-btn
              x-small
              @click="showFileManagerDialog = true"
          >
            <v-icon small>mdi-folder</v-icon>
            {{ $t('PostBody.fileManager') }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
              x-small
              v-for="button in file_upload_buttons"
              :key="button.name"
          >
            <v-icon small>{{ button.icon }}</v-icon>
          </v-btn>
        </v-row>
      </v-sheet>
    </v-sheet>

    <!-- Link Field -->
    <v-sheet class="transparent mb-3 mt-3" v-if="linkFieldActivate()">
      <v-text-field
          v-model="linkUrl"
          :label="$t('PostBody.url')"
          :placeholder="$t('PostBody.linkPlaceholder')"
          prepend-inner-icon="mdi-link-variant"
          outlined
          :error="!urlValid"
          clearable
          @click:clear="clearUrl()"
          v-on:blur="fetchPage()"
          dense
          :rules="[function(value) {
                    if (value === ''){
                        setUrlValid(false);
                        return $t('PostBody.fillRequired')
                    }
                    const pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/
                    let res =  pattern.test(value) || $t('PostBody.invalidUrl');
                    if (res === true){
                        setUrlValid(true)
                    }
                    else{
                        setUrlValid(false)
                    }
                    return res
                  }]"
      ></v-text-field>
    </v-sheet>

    <!-- Caption Text -->
    <v-sheet class="transparent mb-3 mt-3" v-if="captionsActivate()">
      <v-sheet
          fluid
          class="transparent rounded-lg fill-width neu-glow-inset"
      >
        <v-row class="fill-width ma-0">
          <v-btn
              x-small
              class="ma-0"
              @click="showAddDialog(true)"
          >
            <v-icon small>mdi-format-text</v-icon>
            {{ $t('PostBody.openCaptions') }}
          </v-btn>

          <v-btn
              x-small
              class="ma-0"
          >
            <v-icon small>mdi-content-save</v-icon>
            {{ $t('PostBody.save') }}
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
              v-for="text_style in ['bold','italic','underline']"
              :key="text_style"
              x-small
              :value="text_style"
              class="ma-0"
              @click="makeStyleText(text_style)"
          >
            <v-icon small>mdi-format-{{ text_style }}</v-icon>
          </v-btn>
        </v-row>
      </v-sheet>

      <v-sheet
          class="transparent rounded-lg fill-width neu-glow-inset"
      >
        <v-textarea
            filled
            dense
            :label="$t('PostBody.postCaption')"
            style="font-size: 13px"
            append-icon="mdi-emoticon-outline"
            @click:append="toggleEmojiDialog"
            @keyup="captionChanged"
            v-model="captionText"
            no-resize
            :maxlength=captionTextMaxChars
            persistent-hint
            :counter=captionTextMaxChars
            :hint="$t('PostBody.maxCharsHint', { count: captionTextMaxChars })"
        >
        </v-textarea>

        <VEmojiPicker
            v-show="showEmojiDialog"
            :i18n="i18n"
            emojiSize=22
            emojisByRow=8
            limitFrequently=8
            @select="onSelectEmoji"
            style="width: 100%;"
        />
      </v-sheet>
    </v-sheet>

    <!-- Scheduling -->
    <v-sheet class="transparent mb-2 mt-2">
      <v-switch
          v-model="scheduleActive"
          :label="$t('PostBody.schedule')"
          dense
          hide-details
          class="ma-0 pa-0"
      >
      </v-switch>

      <v-sheet
          class="transparent rounded-lg fill-width neu-glow-inset"
          v-if="scheduleActive"
      >
        <v-row align="center" style="margin:0">

          <v-col class="d-flex" cols="12" sm="6">
            <date-time-picker
                v-model="postTime"
                :label="$t('PostBody.postTime')"
                :required-message="$t('PostBody.required')"
                :required=true
            ></date-time-picker>
          </v-col>

          <v-col class="d-flex" cols="12" sm="6">
            <date-time-picker
                v-model="repostUntil"
                :label="$t('PostBody.repostUntil')"
                :required-message="$t('PostBody.required')"
                :required=true
            ></date-time-picker>
          </v-col>

          <v-col class="d-flex" cols="12" sm="6">
            <v-text-field
                :label="$t('PostBody.repostFrequency')"
                :hint="$t('PostBody.repostFrequencyHint')"
                v-model="repostFrequency"
                dense
                type="number"
                min=1
                max=100
                style="font-size: small"
                :rules="[function(value) {
                                if (!value){
                                    return $t('PostBody.required')
                                }
                                else if (value < 1 || value > 100){
                                    return $t('PostBody.invalidValue')
                                }
                                return true
                              }]"
            ></v-text-field>
          </v-col>

          <v-col class="d-flex" cols="12" sm="6">
            <v-text-field
                :label="$t('PostBody.repostInterval')"
                :hint="$t('PostBody.repostIntervalHint')"
                v-model="repostInterval"
                dense
                type="number"
                min=1
                max=100
                style="font-size: small"
                :rules="[function(value) {
                                if (!value){
                                    return $t('PostBody.required')
                                }
                                else if (value < 1 || value > 100){
                                    return $t('PostBody.invalidValue')
                                }
                                return true
                              }]"
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-sheet>

    </v-sheet>

    <v-btn
        small
        color="primary"
        class="float-right"
        @click="sendPost()"
        :disabled="dialogSend"
        :loading="dialogSend"
    >
      {{ $t('PostBody.post') }}
    </v-btn>

    <v-snackbar
        v-model="snackbar"
        :timeout="snackbarTimeout"
        :color="snackbarColor"
    >
      <v-row v-html="snackbarText"></v-row>
      <template v-slot:action="{ attrs }">
        <v-btn
            color="blue"
            icon
            v-bind="attrs"
            @click="snackbar = false"
        >
          <v-icon small>close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-sheet class="transparent">
      <add-caption-dialog
          @add-caption-dialog-close="showAddDialog(false)"
          :model="addCaptionDialog"
      ></add-caption-dialog>
    </v-sheet>

  </v-container>
</template>

<script>
import { VEmojiPicker } from 'v-emoji-picker';
import DateTimePicker from "@/components/DateTimePicker";
import FileManagerDialog from "@/views/SocialMedia/Publish/Components/FileManagerDialog";
import AddCaptionDialog from "@/views/SocialMedia/Publish/Components/AddCaptionDialog";
import EventBus from "@/plugins/event-bus";

const i18n = {
  search: 'Search...',
  categories: {
    Activity: "Activity",
    Flags: "Flags",
    Foods: "Foods",
    Frequently: "Frequently",
    Objects: "Objects",
    Nature: "Nature",
    Peoples: "Peoples",
    Symbols: "Symbols",
    Places: "Places"
  }
}
export default {
  components: {
      VEmojiPicker,
      DateTimePicker,
      AddCaptionDialog,
      FileManagerDialog,
  },
  props: {
    activeSocialMedia: {
      type: String,
    },
    fileManagerData: {
      type: Array,
    },
  },
  created() {

  },
  computed: {
    getOnlyPhotos() {
      let filterPhotos = [];
      this.fileManagerData.forEach(file => {
        if (file.type === 'image') {
          filterPhotos.push(file)
        }
      });
      return filterPhotos;
    },
    getOnlyVideos() {
      let filterVideos = [];
      this.fileManagerData.forEach(file => {
        if (file.type === 'video') {
          filterVideos.push(file)
        }
      });
      return filterVideos;
    },
    activePostTypeButtons(){
        switch (this.activeSocialMedia) {
            case "general":
                return this.general_post_types;
            case "instagram":
                return this.instagram_post_types;
            case "reddit":
                return this.reddit_post_types;
            case "pinterest":
                return this.pinterest_post_types;
            case "google":
                return this.photoText_post_types;
            case "foursquare":
                return this.photoText_post_types;
            case "youtube":
                return this.youtube_post_types;
            default:
                return this.mediaLinkText_post_types;
        }
    }
  },
  data: () => ({
    loadingGif: require("@/assets/post-resources/loading.gif"),
    disappointedGif: require("@/assets/post-resources/emoji-disappointed.gif"),
    happyGif: require("@/assets/post-resources/emoji-happy.gif"),
    activePostType: 0,
    urlValid: false,
    addCaptionDialog:false,
    linkUrl: "",
    addedFiles: [],
    showFileManagerDialog: false,
    dialogSend: false,
    general_post_types: [
      {
        name: "photo",
        icon: "mdi-image"
      },
      {
        name: "video",
        icon: "mdi-video-image"
      },
      {
        name: "link",
        icon: "mdi-link-variant"
      },
      {
        name: "text",
        icon: "mdi-text-box-outline"
      },
      {
        name: "livestream",
        icon: "live_tv"
      },
    ],
    instagram_post_types: [
      {
        name: 'media',
        icon: "mdi-image"
      },
      {
        name: "carousel",
        icon: "mdi-image-multiple"
      },
      {
        name: "igtv",
        icon: "mdi-television-classic"
      },
      {
        name: "story",
        icon: "mdi-camera-front-variant"
      },
    ],
    mediaLinkText_post_types: [
      {
        name: "media",
        icon: "mdi-image"
      },
      {
        name: "link",
        icon: "mdi-link-variant"
      },
      {
        name: "text",
        icon: "mdi-text"
      },
      {
          name: "livestream",
          icon: "live_tv"
      },
    ],
    pinterest_post_types: [
      {
        name: "photo",
        icon: "mdi-image"
      }
    ],
    reddit_post_types: [
      {
        name: "photo",
        icon: "mdi-image"
      },
      {
        name: "link",
        icon: "mdi-link-variant"
      }, {
        name: "text",
        icon: "mdi-text"
      },
    ],
    photoText_post_types: [
      {
        name: "photo",
        icon: "mdi-image"
      },
      {
        name: "text",
        icon: "mdi-text"
      },
    ],
    youtube_post_types: [
      {
        name: "video",
        icon: "mdi-video-image"
      },
    ],
    file_upload_buttons: [
      {
        name: "upload",
        icon: "mdi-upload"
      },
      {
        name: "gdrive",
        icon: "mdi-google-drive"
      },
      {
        name: "dropbox",
        icon: "mdi-dropbox"
      },
      {
        name: "onedrive",
        icon: "mdi-microsoft-onedrive"
      },
      {
        name: "link",
        icon: "mdi-link-variant"
      },
    ],
    captionText: "",
    titleText: "",
    scheduleActive: false,
    showEmojiDialog: false,
    i18n: i18n,
    captionTextMaxChars: 250,
    postTime: "",
    repostUntil: "",
    repostInterval: 1,
    repostFrequency: 1,
    snackbar: false,
    snackbarText: "",
    account_ids: [],
    snackbarTimeout: 3000,
    snackbarColor: "info",
    pageType: "post",
  }),
  methods: {
    clearAll(){
        this.linkUrl = ""
        this.addedFiles = []
        this.captionText = ""
        this.addedFilesChanged()
        this.account_ids = []
        this.activePostType = 0
    },
    showAddDialog(value){
      this.addCaptionDialog = value
    },
    makeStyleText(val) {
      console.log(val);
      document.execCommand(val, true, null);
    },
    removeFile(item) {
      this.addedFiles = this.addedFiles.filter(
          (fileId) => {
            if (fileId !== item)
              return fileId;
          })
      this.addedFilesChanged();
    },
    getFile(id) {
      let retFile;
      this.fileManagerData.forEach(
          (file) => {
            if (file.id === id)
              retFile = file
          })
      return retFile
    },
    sendPost() {
      if (this.fileManagerActivate() && this.addedFiles.length === 0) {
        this.snackbarText = '<img width="30px" src=' + this.disappointedGif + '/> <div style="margin: auto;">'
            + this.$i18n.t('PostBody.selectFiles') + '</div>';
        this.snackBarActivate("error");
        return
      }
      if (this.account_ids.length === 0){
        this.snackbarText = '<img width="30px" src=' + this.disappointedGif+ '/> <div style="margin: auto;">'
            + this.$i18n.t('PostBody.selectAccount') + '</div>';
        this.snackBarActivate("error");
        return
      }
      if (this.scheduleActive && (this.repostUntil.length === 0 || this.postTime.length === 0)) {
        this.snackbarText = '<img width="30px" src=' + this.disappointedGif + '/> <div style="margin: auto;">'
            + this.$i18n.t('PostBody.fillRequired') + '</div>';
        this.snackBarActivate("error");
        return
      }
      if (this.linkFieldActivate() && this.linkUrl.length === 0) {
        this.snackbarText = '<img width="30px" src=' + this.disappointedGif + '/> <div style="margin: auto;">'
            + this.$i18n.t('PostBody.fillRequired') + '</div>';
        this.snackBarActivate("error");
        return
      }
      if (this.captionsActivate() && this.captionText.length === 0) {
        this.snackbarText = '<img width="30px" src=' + this.disappointedGif + '/> <div style="margin: auto;">'
            + this.$i18n.t('PostBody.fillRequired') + '</div>';
        this.snackBarActivate("error");
        return
      }

      this.dialogSend = false

      let myForm = {};
      let post_data;
      let post_type = this.activePostTypeButtons[this.activePostType].name;
      if (post_type === "photo" || post_type === "video" || post_type === "media" || post_type === "igtv" || post_type === "carousel" || post_type === "story" || post_type === "livestream") {
        post_data = {files: this.addedFiles};
      } else if (post_type === "link") {
        post_data = {link: this.linkUrl}
      } else {
        post_data = [];
      }

      if (this.scheduleActive){
        let scheduleObject = {}
        scheduleObject.post_time = this.postTime;
        scheduleObject.post_repostUntil = this.repostUntil;
        scheduleObject.post_repostInterval = this.repostInterval;
        scheduleObject.post_repostFrequency = this.repostFrequency;
        myForm.post_schedule = scheduleObject
      }
      else{
        myForm.post_schedule = false;
      }
      myForm.post_data = post_data;
      myForm.post_type = post_type;
      myForm.page_type = this.pageType;
      myForm.activeSocialMedia = this.activeSocialMedia;
      if(this.titleFieldActivate() && this.titleText !== ''){
          myForm.post_title = this.titleText;
      }
      myForm.post_caption = this.captionText;

      let account_ids = []
      this.account_ids.forEach((item) =>{
          account_ids.push(item.id)
      })
      myForm.account_ids = account_ids
      this.$store.dispatch("posts/createPost", myForm)
        .then((resp) => {
          console.log("resp",resp)
          //this.dialogSend = false
        })
        .catch((e) => {
          console.log("e",e)
          //this.dialogSend = false
        })
    },
    snackBarActivate(color) {
      this.snackbarColor = color;
      this.snackbar = true;
    },
    async fetchPage() {
      if (this.urlValid) {
        this.$store.dispatch("posts/getLinkInfo", {url: this.linkUrl})
            .then((resp) => {
                EventBus.$emit('post-type-link-update', resp.info);
            })
      }
    },
    setUrlValid(value) {
      this.urlValid = value;
    },
    captionsActivate() {
      if (this.activeSocialMedia === "reddit") {
        return this.activePostTypeButtons[this.activePostType].name === 'text'
      }
      if (this.activeSocialMedia === "foursquare") {
        return this.activePostTypeButtons[this.activePostType].name === 'text'
      } else if (this.activeSocialMedia === "instagram") {
        return !(this.activePostTypeButtons[this.activePostType].name === 'story')
      }
      return this.activePostTypeButtons[this.activePostType].name === 'photo'
          || this.activePostTypeButtons[this.activePostType].name === 'video'
          || this.activePostTypeButtons[this.activePostType].name === 'media'
          || this.activePostTypeButtons[this.activePostType].name === 'link'
          || this.activePostTypeButtons[this.activePostType].name === 'text'
          || (this.activePostTypeButtons[this.activePostType].name === 'livestream')
    },
    fileManagerActivate() {
      if (this.activeSocialMedia === "reddit") {
        return this.activePostTypeButtons[this.activePostType].name === 'photo'
      } else if (this.activeSocialMedia === "instagram") {
        return true
      }
      return this.activePostTypeButtons[this.activePostType].name === 'photo'
          || this.activePostTypeButtons[this.activePostType].name === 'video'
          || this.activePostTypeButtons[this.activePostType].name === 'media'
          || this.activePostTypeButtons[this.activePostType].name === 'livestream'
    },
    titleFieldActivate() {
      return this.activeSocialMedia === "reddit"
          || this.activeSocialMedia === "youtube"
          || this.activePostTypeButtons[this.activePostType].name === 'livestream';
      },
    linkFieldActivate() {
      return this.activePostTypeButtons[this.activePostType].name === 'link'
    },
    toggleEmojiDialog() {
      this.showEmojiDialog = !this.showEmojiDialog;
      this.overlay = !this.overlay
    },
    onSelectEmoji(emoji) {
      this.captionText += emoji.data;
      //this.toggleEmojiDialog();
      this.captionChanged();
    },
    captionChanged() {
      EventBus.$emit('post-caption-changed', this.captionText);
    },
    titleChanged() {
      EventBus.$emit('post-title-changed', this.titleText);
    },
    postTypeChanged() {
      this.addedFiles = [];
      this.addedFilesChanged();
      EventBus.$emit('post-type-changed', this.activePostTypeButtons[this.activePostType].name);
    },
    addedFilesChanged() {
      EventBus.$emit('post-added-files-changed', this.addedFiles);
    },
    clearUrl(){
      this.linkUrl = ""
      EventBus.$emit('post-type-link-update', {title: null,
        description: null,
        image: null,
        host: null})
    }
  },
  mounted() {
    EventBus.$on('post-added-files-requested', () => {
      this.addedFilesChanged();
    });
    EventBus.$on('post-type-requested', () => {
      this.postTypeChanged();
    });
    EventBus.$on('user-list-changed', user_ids => {
      this.account_ids = user_ids;
    });
    EventBus.$on('change-caption', my_value => {
      this.captionText = my_value
      this.captionChanged()
    });
  },
  watch: {
      'activeSocialMedia': function(){
          this.clearAll()
      }
  }
};
</script>
<style scoped>
.container-emoji {
  max-height: 200px;
}

.background-color-white-transparent {
  background-color: rgba(225, 219, 214, 0.60) !important;
}

.border1px {
  border: 1px solid #ddd;
}

@font-face {
  font-family: NotomojiColor;
  font-weight: 400;
  src: url(
  https://cdn.glitch.com/61908de1-dd0a-4359-a54b-6cb6d41bb5fd%2FNotoColorEmoji.ttf?1513108808150
  ) format("truetype");
}

.postTypeItem {
  border: 0 !important;
  min-height: 50px !important;
  width: 100% !important;
  text-align: left !important;
}
</style>
