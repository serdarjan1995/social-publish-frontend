<template>
    <div>
      <v-row justify="center">
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
          <v-card class="fill-height fill-width">

              <!--      Image Trans        -->
              <template>
                <v-row justify="center">
                  <v-dialog v-model="imageTrans" persistent max-width="390">

                    <v-card
                        class="mx-auto"
                    >
                      <v-img
                          class="white--text align-end"
                          :src="selection.url">
                        <v-card-title class="private-cart-title">{{ selection.created_at }}</v-card-title>
                      </v-img>

                      <v-card-subtitle @click="imageTransClose" class="private-dialog-subtitle">
                        <span color="green" class="p-2 text-center">OK</span>
                      </v-card-subtitle>

                    </v-card>

                  </v-dialog>
                </v-row>
              </template>

              <!--      Loading Save      -->
              <template>
                <div class="text-center">
                  <v-dialog
                      v-model="loadingSave"
                      hide-overlay
                      persistent
                      width="300"
                  >
                    <v-card
                        color="primary"
                        dark style="padding-top: 20px;"
                    >
                      <v-card-text>
                        <v-progress-linear
                            indeterminate
                            color="white"
                            class="mb-0"
                        ></v-progress-linear>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                </div>
              </template>

              <!--      MAIN DIALOG      -->
              <v-toolbar dense color="primary">
                <v-btn icon dark @click="areaClose">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Settings</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>

              <div class="fullData">

                <div style="height: 80%">
                  <!-- SAVE -->
                  <v-btn @click="save()"
                         :disabled="loadingSave"
                         :loading="loadingSave"
                         class="save_button" color="indigo" dark>
                    {{$t('Caption.save')}}
                  </v-btn>

                  <tui-image-editor
                      v-if="testIf"
                      ref="ImageEditor"
                      :include-ui="useDefaultUI"
                      :options="toastUiOptions"
                  >
                  </tui-image-editor>
                </div>
                <!--      History Image Area     -->
                <div class="fill-width">
                  <v-row justify="center" class="fill-height fill-width" >
                    <v-col v-for="(item, index) in fileHistoryData" :key="index" cols="auto">
                      <v-img
                          @click="imageToBase(item)"
                          class="private-history-image"
                          :src="item.url"></v-img>
                    </v-col>
                  </v-row>
                </div>
              </div>

          </v-card>
        </v-dialog>
      </v-row>
    </div>
</template>
<script>
import {ImageEditor} from '@toast-ui/vue-image-editor'
import 'tui-image-editor/dist/tui-image-editor.css';
import {enlang, trlang} from "@/lang/plugins/WaterMark";

export default {
  components: {
    'tui-image-editor': ImageEditor
  },
  props: {
    activeItem: Object,
    actionStatus: Boolean
  },
  data() {
    return {
      imageTrans: false,
      loadingSave: false,
      testIf: true,
      fileHistoryData: [],
      selection: {
        url: '',
        created_at: ''
      },
      page: "Watermark",
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      breadcrumbs: [
        {
          text: "Watermark",
          disabled: true,
        },
      ],
      useDefaultUI: true,
    };
  },
  methods: {
    imageTransClose() {
      this.testIf = true
      this.imageTrans = false
    },
    areaClose() {
      this.testIf = false
      this.dialog = false
    },
    imageToBase(item) {
      this.selection.url = item.url
      this.selection.created_at = item.created_at
      this.imageTrans = true
      this.testIf = false
    },
    save() {
      this.loadingSave = true
      let base64 = this.b64toBlob(this.$refs.ImageEditor.invoke("toDataURL"), new Date().getTime() + 'ET360'+".png")

      let body = new FormData();
      body.append("file", base64);
      body.append("sub", this.activeItem.sub);
      body.append("id", this.activeItem.id);

      this.$store.dispatch("user/fileUpload", body)
          .then(() => {
            this.$store.dispatch("user/getEndFiles")
            this.loadingSave = false
          })
          .catch(err => {
            console.log(err)
            this.loadingSave = false
          })
    },
    b64toBlob(dataurl, filename) {
      let arr = dataurl.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);

      while(n--){
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, {type:mime});
    },
  },
  computed:{
    toastUiOptions(){
        return {
          includeUI: {
            loadImage: {
              path: this.$store.state.general_storage.base64Image,
              name: 'sampleImage2'
            },
            locale: localStorage.getItem('et360_lang') === 'tr' ? trlang : enlang,//KEY FOR LANGUAGE
            initMenu: 'filter'
          },
          cssMaxWidth: 560,
          cssMaxHeight: 400
      }
    },
  },
  watch: {
    actionStatus() {
      let context = this
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        const reader = new FileReader();
        reader.onloadend = function() {
          context.$store.state.general_storage.base64Image = reader.result;
          context.testIf = true
          context.dialog = true
          context.$store.dispatch("user/getFileHistory", {id:context.activeItem.id})
              .then((resp) => {
                context.fileHistoryData = resp.data.history
              })
        }
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', context.activeItem.url);
      xhr.responseType = 'blob';
      xhr.setRequestHeader('cache-control','no-cache')
      xhr.send();
    }
  },


};
</script>

<style>

.tui-image-editor-header-logo {
  display: none !important;
}

.tui-image-editor-download-btn {
  display: none !important;
}

.v-btn:not(.v-btn--round).v-size--default {
  position: absolute;
  z-index: 9999;
  width: 120px;
  height: 40px;
  border-radius: 25px;
  font-size: 12px;
  margin-top: 8px;
  right:150px;

}
.fullData{
  height: calc(100% - 48px);
  width: 100%;
}
.private-history-image {
  width: 100px;
  height: 100px;
  padding: 3px;
  border: 1px solid #666666;
  border-radius: 4px;
  box-shadow: 5px 5px 4px 0 rgba(10, 10, 10, 0.37);
}
.private-dialog-subtitle {
  padding: 9px !important;
  display: block;
  margin: 0 !important;
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;
}
.private-dialog-subtitle {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: inherit;
}
.private-cart-title {
  margin-bottom: 25px;
}
</style>

