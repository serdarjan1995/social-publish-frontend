<template>
  <v-card>

    <!--    EDIT NAME    -->
    <template>
      <v-row justify="center">
        <v-dialog v-model="editNameDialog" persistent max-width="290">
          <v-card>
            <v-card-title>{{ $t('FileManager.fileNameChangeHeader') }}</v-card-title>

            <v-card-actions class="private-card-action-dialog">
              <v-spacer></v-spacer>
              <span color="green" class="pr-2 pb-3" @click="editNameDialog = false"
              >{{ $t('FileManager.fileNameChangeDisagree') }}</span>
              <span color="green" class="pr-2 pb-3" @click="userFileDelete"
              >{{ $t('FileManager.fileNameChangeAgree') }}</span>
            </v-card-actions>
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

    <toast-vue
        ref="myTable"
        v-if="renderActive"
        :actionStatus="actionStatus"
        :activeItem="activeItem"></toast-vue>

    <v-sheet class="neu-glow-inset px-3">
      <v-container
            v-if="fileManagerData.length > 0"
            fluid
      >
        <div v-if="!isFullscreen">
          <v-row>
            <v-col cols="12" sm="2" v-for="(item, index) in fileManagerData" :key="index">
              <v-hover
                    v-slot:default="{ hover }"
              >

                <v-card
                      rounded
                      @mouseover="cardHover = index"
                      @mouseleave="cardHover = -1"
                      style="height: 100%; width: 100%"
                      :class="{ 'shadowed-box-lightblue': cardHover===index || isSelected(item.id)}"
                >
                  <!-- if item is IMAGE -->
                  <v-img
                        v-if="item.type === 'image'"
                        class="white--text align-start border2px"
                        :src="item.url"
                        :lazy-src="item.lazy"
                        aspect-ratio="1"
                  >
                    <v-expand-transition>
                      <div
                            class="d-flex transition-fast-in-fast-out darken-2 v-card--reveal background-color-white-transparent"
                            v-if="hover || isSelected(item.id)"
                      >
                        <v-btn
                              fab
                              x-small
                              class="centered-item background-color-white-transparent"
                              @click="switchFullscreenMod(index)"
                              v-if="hover"
                        >
                          <v-icon>fullscreen</v-icon>
                        </v-btn>
                        <v-checkbox
                              v-model="selectedFiles"
                              :value="item.id"
                              class="ma-0 very-small"
                              style="position:absolute; right:3px; z-index: 1"
                              hide-details
                              :ripple=false
                              backgroundColor="rgba(225, 219, 214, 0.40)"
                        />
                        <v-btn fab
                               color="black"
                               class="shadowed-box-lightblue bottom-left-item very-small"
                               style="left:3px; z-index: 1"
                               v-if="hover">
                          <v-icon @click="selectionDeleteImage(item)" small color="white">delete</v-icon>
                        </v-btn>
                        <v-btn fab
                               color="black"
                               class="shadowed-box-lightblue bottom-left-item very-small"
                               style="right:3px; z-index: 1"
                               v-if="hover"
                        >
                          <v-icon @click="activeItemClick(item)" small color="white">palette</v-icon>
                        </v-btn>
                      </div>
                    </v-expand-transition>

                    <template v-slot:placeholder>
                      <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                      >
                        <v-progress-circular
                              indeterminate
                              color="grey lighten-5"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>

                  <!-- if item is VIDEO -->
                  <div
                        v-if="item.type === 'video'"
                        class="video-container border2px"
                  >
                    <v-icon
                          v-if="item.type === 'video'"
                          class="video-icon"
                    >
                      mdi-play-circle-outline
                    </v-icon>
                    <v-expand-transition>
                      <div
                            class="d-flex transition-fast-in-fast-out darken-2 v-card--reveal background-color-white-transparent"
                            v-if="hover || isSelected(item.id)"
                      >
                        <v-btn
                              fab
                              x-small
                              class="centered-item background-color-white-transparent"
                              @click="switchFullscreenMod(index)"
                              v-if="hover"
                              style="z-index: 1"
                        >
                          <v-icon medium>mdi-play-circle</v-icon>
                        </v-btn>
                        <v-checkbox
                              v-model="selectedFiles"
                              :value="item.id"
                              class="ma-0 very-small"
                              style="position:absolute;right: 3px; z-index: 1"
                              hide-details
                              :ripple=false
                              backgroundColor="rgba(225, 219, 214, 0.40)"
                        />
                        <v-btn fab
                               color="black"
                               class="shadowed-box-lightblue bottom-left-item very-small"
                               style="left: 3px; z-index: 1"
                               v-if="hover"
                        >
                          <v-icon small color="white">edit</v-icon>
                        </v-btn>
                        <v-btn fab
                               color="black"
                               class="shadowed-box-lightblue bottom-left-item very-small"
                               style="right: 3px; z-index: 1"
                               v-if="hover"
                        >
                          <v-icon small color="white">palette</v-icon>
                        </v-btn>
                      </div>
                    </v-expand-transition>
                    <video
                          :src="item.url"
                          class="video-item"
                    >
                    </video>

                  </div>
                  <v-img style="opacity: 0" v-if="item.type === 'video'" :src="loadingGif"/>
                  <div class="filename" @click="activeItemClick(item)">
                    {{item.name}}
                  </div>

                </v-card>
              </v-hover>

            </v-col>
          </v-row>
        </div>

        <div class="py-3" v-else>
          <v-carousel v-model="carousel" hide-delimiters>
            <v-carousel-item v-for="(item, index) in fileManagerData" :key="`${index}-carousel`">
              <v-hover v-slot:default="{ hover }">
                <v-sheet height="100%">

                  <!-- if item is image CAROUSEL -->
                  <v-img
                        v-if="item.type === 'image'"
                        :src="item.url"
                        :lazy-src="item.lazy"
                        class="grey lighten-2"
                        width="100%"
                        height="100%"
                  >
                    <v-fab-transition>
                      <v-btn
                            fab
                            absolute
                            color="red"
                            right
                            small
                            class="mt-2"
                            @click="switchFullscreenMod()"
                            v-if="hover"
                      >
                        <v-icon>fullscreen_exit</v-icon>
                      </v-btn>
                    </v-fab-transition>
                  </v-img>

                  <!-- if item is video CAROUSEL -->
                  <v-fab-transition>
                    <v-btn
                          fab
                          absolute
                          color="red"
                          right
                          small
                          class="mt-2"
                          @click="switchFullscreenMod()"
                          v-if="hover"
                          style="z-index: 1"
                    >
                      <v-icon>fullscreen_exit</v-icon>
                    </v-btn>
                  </v-fab-transition>
                  <video
                        v-if="item.type === 'video'"
                        :src="item.url"
                        class="grey lighten-2"
                        width="100%"
                        height="100%"
                        controls
                        v-bind:autoplay="hover ? true: false"
                  >
                  </video>

                </v-sheet>
              </v-hover>
            </v-carousel-item>
          </v-carousel>
        </div>
      </v-container>

      <v-container fluid v-else>
        <h3>{{$t('FileManager.empty')}}</h3>
      </v-container>

    </v-sheet>

  </v-card>
</template>

<script>
  import ToastVue from "@/views/SocialMedia/Postdetails/Components/ToastVue";

  export default {
    props:{
        fileManagerData: {
            type: Array,
            default: function () { return [] },
        },
    },
    components: {
      ToastVue,
    },
    data: () => ({
      editNameDialog: false,
      loadingSave: false,
      editNameInfo: {
        id: '',
        name: '',
      },
      actionStatus: false,
      activeItem: {},
      selectedFiles: [],
      cardHover: -1,
      isFullscreen: false,
      carousel: 0,
      loadingGif: require("@/assets/post-resources/loading.gif"),
      renderActive: true
    }),
    methods: {
       selectionDeleteImage(item) {
        this.editNameDialog = true
        this.editNameInfo.id = item.id
        this.editNameInfo.name = item.name
      },
      userFileDelete() {
        this.loadingSave = true
        this.editNameDialog = false

        this.$store.dispatch("user/userDeleteImage", this.editNameInfo)
            .then(() => {
              let i = this.$store.state.user.files.map(item => item.id).indexOf(this.editNameInfo.id) // find index of your object
              this.$store.state.user.files.splice(i, 1) // remove it from array
              this.loadingSave = false
            }).catch(() => {
              this.loadingSave = false
            })
      },
      forceRerender () {
        // remove the my-component component from the DOM
        this.renderActive = false;

        this.$nextTick (() => {
          // add my-component component in DOM
          this.renderActive = true;
        });
      },
      activeItemClick(item){
        this.activeItem = item
        this.actionStatus = !this.actionStatus
      },
      switchFullscreenMod(val = 0) {
        this.isFullscreen = !this.isFullscreen;
        this.carousel = val;
      },
      isSelected(selected_id){
          let isSelected = false;
          this.selectedFiles.forEach(id => {
              if (id === selected_id){
                  isSelected = true;
              }
          });
          return isSelected;
      },
      editImage(image) {
        console.log(image)
      },
      deleteImage(image) {
          console.log(image)
      },
      onRemove(file){
        console.log(file.name +' removed');
      },
    },
    mounted() {

    },
  }
</script>

<style scoped>
  .v-card--reveal {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .video-item{
    position: absolute;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .video-container{
    overflow: hidden;
    position: absolute;
    height: 85%;
    width: 100%;
  }
  .border2px{
    border: 2px solid #ddd;
  }
  .video-icon{
    position: absolute!important;
    text-shadow: 0 0 5px rgb(184, 196, 201);
    z-index: 1;
  }
  .filename{
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
  }
  .shadowed-box-lightgray {
    box-shadow: 0 0 10px rgb(153, 167, 175) !important;
  }
  .shadowed-box-black {
    box-shadow: 0 0 10px rgb(36, 41, 43) !important;
  }
  .shadowed-box-lightblue {
    box-shadow: 0 0 10px rgb(75, 151, 182) !important;
  }
  .centered-item {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .bottom-left-item {
    position: absolute;
    bottom: 3px;
  }
  .very-small{
    width: 25px!important;
    height: 25px!important;
  }
  .background-color-white-transparent{
    background-color: rgba(225, 219, 214, 0.60) !important;
  }
  .private-card-action-dialog {
    text-transform: uppercase;
    font-size: 13px;
  }
  .private-card-action-dialog span {
    cursor: pointer;
  }
  .private-card-text-dialog {
    padding-bottom: 0;
  }
</style>
