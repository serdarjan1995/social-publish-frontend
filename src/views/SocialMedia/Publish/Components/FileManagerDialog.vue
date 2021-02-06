<template>
  <v-row justify="center">
    <v-dialog
          v-model="show"
          width="60%"
          transition="dialog-bottom-transition"
          v-bind:contentClass="this.$parent.isDark?'shadowed-box-lightgray':'shadowed-box-black'"
    >
      <v-card>
        <v-toolbar dense>
          <v-icon class="mr-2">mdi-folder</v-icon>
          <v-toolbar-title>{{$t('PostBody.fileManager')}}</v-toolbar-title>
          <v-spacer/>
          <v-btn icon @click="show = false">
            <v-icon small>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-container
              v-if="availableFilesForSelection.length > 0"
              fluid
        >
          <div v-if="!isFullscreen">
            <v-row>
              <v-col cols="12" sm="2" v-for="(item, index) in availableFilesForSelection" :key="index">

                <v-hover v-slot:default="{ hover }">
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

                  </v-card>
                </v-hover>

              </v-col>
            </v-row>
          </div>

          <div class="py-3" v-else>
            <v-carousel v-model="carousel" hide-delimiters>
              <v-carousel-item v-for="(item, index) in availableFilesForSelection" :key="`${index}-carousel`">
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
                          v-bind:autoplay="!!hover"
                    >
                    </video>

                  </v-sheet>
                </v-hover>
              </v-carousel-item>
            </v-carousel>
          </div>

          <v-btn @click="addFiles()">
            Add
          </v-btn>
        </v-container>

        <v-container fluid v-else>
          <h3>{{$t('FileManager.noMoreToAdd')}}</h3>
        </v-container>

      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

    import EventBus from "@/plugins/event-bus";

    export default {
        name: "FileManagerDialog",
        data() {
            return {
                selectedFiles: [],
                cardHover: -1,
                isFullscreen: false,
                carousel: 0,
                loadingGif: require("@/assets/post-resources/loading.gif"),
            }
        },
        props: {
            value: Boolean,
            data: Array,
            addedFiles: Array,
        },
        computed: {
            show: {
                get() {
                    return this.value
                },
                set(value) {
                    this.$emit('input', value)
                }
            },
            availableFilesForSelection() {
                return this.data.filter((file) => {
                    if(!this.addedFiles.includes(file.id)) return file;
                })
            },

        },
        methods:{
            addFiles(){
                this.selectedFiles.forEach(id => {
                    this.addedFiles.push(id);
                });
                this.selectedFiles = [];
                this.addedFilesChanged();
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
            addedFilesChanged(){
                EventBus.$emit('post-added-files-changed', this.addedFiles );
            }
        },
        mounted() {

        }
    }
</script>


<style>
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
    height: 100%;
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
</style>
