<template>
  <v-container class="card ">
    <div class="pa-0">

      <div class="preview-instagram preview-instagram-photo"
           v-if="postType==='media' || postType==='photo' || postType==='video' || postType==='igtv' || postType==='carousel'"
      >
        <div class="preview-content">
          <div class="user-info">
            <v-row class="pl-3 pr-3">
              <img class="pa-0 mr-2" :src="avatarPreview" >
              <span class="pt-1">{{$t('PostPreviews.anonymous')}}</span>
              <v-spacer/>
              <v-icon small>mdi-dots-vertical</v-icon>
            </v-row>
          </div>
          <div
                class="preview-media" v-bind:class="this.$parent.isDark?'--dark':''">
            <swiper class="swiper fill-height fill-width" :options="swiperOption">
              <swiper-slide class="ma-0 pa-0" v-for="(item, index) in addedFiles" :key="index">
                <v-img
                      v-if="getFile(item).type === 'image'"
                      class="fill-width fill-height"
                      :src="getFile(item).url"
                      :lazy-src="getFile(item).lazy"
                      aspect-ratio="1"
                ></v-img>
                <div
                      class="fill-width fill-height video-container"
                      v-if="getFile(item).type === 'video'"
                >
                  <video
                        :src="getFile(item).url"
                        autoplay muted loop
                  ></video>
                </div>

              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div>
          <v-row  class="fill-width footer-icons" style="margin: 0">
            <v-icon style="padding: 2px 4px;font-size: 22px">mdi-heart-outline</v-icon>
            <v-icon style="padding: 2px 4px;font-size: 22px">mdi-message-outline</v-icon>
            <v-icon style="padding: 2px 4px;font-size: 22px">mdi-send-outline</v-icon>
            <v-spacer/>
            <v-icon style="padding: 2px 4px;font-size: 22px">mdi-bookmark-outline</v-icon>
          </v-row>
          <div class="caption pt0">
          <pre v-if="hasCaption" style="white-space: pre-line;">
            <b>{{$t('PostPreviews.username')}}</b> {{ textCaption }}
          </pre>
            <div
                  v-else
            >
              <v-row style="margin: 0">
                <div style="font-family: monospace, monospace"><b>{{$t('PostPreviews.username')}}</b></div>
                <v-spacer/>
                <div class="line-no-text w50" style="margin: 5px 0; margin-left: 5px" v-bind:class="this.$parent.isDark?'--dark':''"></div>
              </v-row>
              <div class="line-no-text" v-bind:class="this.$parent.isDark?'--dark':''"></div>
              <div class="line-no-text" v-bind:class="this.$parent.isDark?'--dark':''"></div>
            </div>
          </div>

          <div class="post-info">
            <div class="pull-right">{{$t('PostPreviews.1s')}}</div>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>

      <!-- Story -->
      <div class="preview-instagram preview-instagram-story" v-else-if="postType==='story'">
          <v-img
                v-if="addedFiles.length >0 && getFile(addedFiles[0]).type === 'image'"
                class="fill-width fill-height"
                :src="getFile(addedFiles[0]).url"
                :lazy-src="getFile(addedFiles[0]).lazy"
                aspect-ratio="1"
          ></v-img>
          <div
                class="fill-width fill-height video-container"
                v-else-if="addedFiles.length >0 && getFile(addedFiles[0]).type === 'video'"
          >
            <video
                  :src="getFile(addedFiles[0]).url"
                  autoplay muted loop
            ></video>
          </div>
          <v-row class="pl-3 pr-3">
            <v-row class="preview-instagram-avatar">
              <img class="pa-0 mr-2" :src="avatarPreview" >
              <span class="pt-1">{{$t('PostPreviews.anonymous')}}</span>
            </v-row>
          </v-row>
      </div>

      <!-- Livestream -->
      <div class="preview-instagram preview-instagram-live" v-else-if="postType==='livestream'">
        <div class="preview-instagram-story">
          <div
              class="fill-width fill-height video-container"
              v-if="addedFiles.length >0 && getFile(addedFiles[0]).type === 'video'"
          >
            <video
                :src="getFile(addedFiles[0]).url"
                autoplay muted loop
            ></video>
          </div>
        </div>

        <v-row class="pl-3 pr-3">
          <v-row class="preview-instagram-avatar">
            <img class="pa-0 mr-2" :src="avatarPreview" >
            <span class="pt-1">{{$t('PostPreviews.anonymous')}}</span>
          </v-row>
          <div class="preview-instagram-status">
            <div class="live text-uppercase">{{$t('PostPreviews.live')}}</div>
            <div class="view"><v-icon class="ml-2" style="color:white;font-size: 18px">mdi-eye-outline</v-icon> 1</div>
          </div>
        </v-row>
      </div>

      <div
            v-else
            style="text-align: center"
      >
        {{$t('PostPreviews.doesNotSupport')}}
      </div>


    </div>
  </v-container>
</template>

<script>
    import EventBus from "@/plugins/event-bus";
    import {directive, Swiper, SwiperSlide} from "vue-awesome-swiper";

    export default {
        name: "InstagramPreview",
        props:{
            fileManagerData: Array,
        },
        components: {Swiper, SwiperSlide},
        data: () => ({
          avatarPreview: require("@/assets/post-resources/avatar-person.svg"),
            textCaption: "",
            postType: 'media',
            addedFiles: [],
            swiper: directive,
            swiperOption: {
                slidesPerView: 1,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    type: "bullets",
                    dynamicBullets: true,
                }
            },
        }),
        methods:{
            getFile(id){
                let retFile;
                this.fileManagerData.forEach(
                    (file) => {
                        if(file.id === id)
                            retFile = file
                    })
                return retFile
            },
        },
        mounted() {
            EventBus.$on('post-caption-changed', post_caption => {
                this.textCaption = post_caption;
            });
            EventBus.$on('post-type-changed', post_type => {
                this.postType = post_type;
            });
            EventBus.$on('post-added-files-changed', addedFiles => {
                this.addedFiles = addedFiles;
            });
            EventBus.$emit('post-added-files-requested')
            EventBus.$emit('post-type-requested')
        },
        computed:{
            hasCaption(){
                return this.textCaption.length > 0;
            }
        },
    }
</script>

<style scoped>
  .card {
    display: flex;
    flex-direction: column;
    word-wrap: break-word;
    background-clip: border-box;
  }

  /*Preview*/
  .preview-instagram{
    position: relative;
    border: 1px solid #f4f4f4;
  }

  .preview-instagram .caption p{
    font-size: initial;
  }

  .preview-instagram .preview-content .user-info{
    padding: 8px;
  }

  .preview-instagram .preview-content span{
    font-size: small;
  }

  .preview-instagram .preview-content .user-info img{
    width: 25px;
    margin-right: 5px;
  }
  .w50{
    width: 60%;
  }

  .preview-instagram .preview-content .preview-media{
    height: 250px;
    background-size: cover;
    background-position: center center;
    background-color: #f4f4f4;
    overflow: hidden;
    position: relative;
  }

  .preview-instagram video{
    position: absolute;
    top: 50%;
    left: 50%;
    width: auto;
    height: 100%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .preview-instagram .preview-content .post-info{
    padding: 0 20px;
    word-break: break-all;
    font-family: Monospace,monospace;
    font-size: x-small;
    color: #5c5c5c;
  }

  .preview-instagram .preview-content .caption{
    padding: 10px 20px;
    word-break: break-all;
  }


  .preview-instagram .preview-content .line-no-text{
    margin-bottom: 3px;
    height: 13px;
    background: #f4f4f4;
  }

  .preview-instagram-story{
    background: #000 url('~@/assets/post-resources/instagram-logo.png') no-repeat center center;
    background-size: 65%;
    height: 400px;
    overflow: hidden;
    position: relative;
    z-index: 1;
    max-width: 350px;
    margin: auto;
  }

  .preview-instagram-story .preview-media{
    height: 100%;
    background-size: cover;
    background-position: center center;
    overflow: hidden;
    position: relative;
  }



  .preview-instagram-avatar{
    position: absolute;
    left: 22px;
    top: 12px;
    z-index: 1;
  }

  .preview-instagram-avatar img{
    width: 25px;
    margin-right: 5px;
  }

  .preview-instagram-avatar span{
    color: white;
    font-weight: 400;
  }

  .preview-instagram-status{
    position: absolute;
    right: 12px;
    top: 12px;
    z-index: 1;
  }

  .preview-instagram-status .live{
    color: #fff;
    padding: 3px 7px;
    border-radius: 4px;
    display: inline-block;
    font-weight: 600;
    font-size: 12px;
    background: linear-gradient(-45deg, #eb6200, #FF3D77)
  }

  .preview-instagram-status .view{
    color: #fff;
    display: inline-block;
    margin-left: 5px;
    z-index: 1;
  }

</style>