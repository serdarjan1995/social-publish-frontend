<template>
  <v-container class="card">
    <div class="pa-0">
      <div class="preview-facebook">
        <div v-if="postType==='media' || postType==='video'
        || postType==='photo'|| postType==='link'|| postType==='text' || postType==='livestream'">

          <div class="user-info">
            <v-row class="pl-3 pr-3">
              <img class="pa-0 mr-2" :src="avatarPreview" >
              <div class="text">
                <div class="name"> {{$t('PostPreviews.anonymous')}}</div>
                <span> {{$t('PostPreviews.just_now')}} · <v-icon style="font-size:11px" aria-hidden="true">mdi-web</v-icon></span>
              </div>
            </v-row>
          </div>
          <div class="caption">
            <pre v-if="hasCaption" style="white-space: pre-line;">
              {{ textCaption }}
            </pre>
            <div
                  v-else
            >
              <div class="line-no-text" v-bind:class="this.$parent.isDark?'--dark':''"></div>
              <div class="line-no-text" v-bind:class="this.$parent.isDark?'--dark':''"></div>
              <div class="line-no-text w50" v-bind:class="this.$parent.isDark?'--dark':''"></div>
            </div>
          </div>

          <div class="preview-media" v-if="postType==='media' || postType==='video' || postType==='photo'"
               v-bind:class="this.$parent.isDark?'--dark':''"
          >
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

          <div class="preview-media" v-if="postType==='livestream'" v-bind:class="this.$parent.isDark?'--dark':''">
              <div
                    class="fill-width fill-height video-container"
                    v-if="(addedFiles.length)? getFile(addedFiles[0]).type === 'video' :false"
              >
                <video
                      :src="getFile(addedFiles[0]).url"
                      autoplay muted loop
                ></video>
              </div>
            <div class="preview-livestream-live text-uppercase">{{$t('PostPreviews.live')}}</div>
          </div>


          <div class="preview-link" v-else-if="postType==='link'">
            <div class="image" v-if="!url_info.image" v-bind:class="this.$parent.isDark?'--dark':''"></div>
            <v-img v-else-if="url_info.image !== ''" :src="url_info.image" contain></v-img>

            <div class="preview-link-info">
              <div class="website">
                <div class="line-no-text" v-if="!url_info.host" v-bind:class="this.$parent.isDark?'--dark':''"></div>
                {{url_info.host}}
              </div>
              <div class="linktitle">
                <div class="line-no-text" v-if="!url_info.title" v-bind:class="this.$parent.isDark?'--dark':''"></div>
                  {{ url_info.title }}
              </div>
              <div class="desc">
                <div v-if="!url_info.description">
                  <div class="line-no-text" v-bind:class="this.$parent.isDark?'--dark':''"></div>
                  <div class="line-no-text" v-bind:class="this.$parent.isDark?'--dark':''"></div>
                  <div class="line-no-text w50" v-bind:class="this.$parent.isDark?'--dark':''"></div>
                </div>
                <div v-else>{{url_info.description}}</div>
              </div>
            </div>
          </div>

          <div class="preview-comment">
            <div class="d-flex justify-space-around">
              <div class="action-button">
                <v-icon style="font-size: 20px" aria-hidden="true">mdi-thumb-up-outline</v-icon>{{$t('PostPreviews.like')}}
              </div>
              <div class="action-button">
                <v-icon style="font-size: 20px" aria-hidden="true">mdi-comment-text-outline</v-icon>{{$t('PostPreviews.do_comment')}}
              </div>
              <div class="action-button">
                <v-icon style="font-size: 20px" aria-hidden="true">mdi-facebook-messenger</v-icon>{{$t('PostPreviews.share')}}
              </div>
            </div>
          </div>
        </div>

        <div
              v-else
              style="text-align: center"
        >
          {{$t('PostPreviews.doesNotSupport')}}
        </div>

      </div>
    </div>

  </v-container>
  
</template>

<script>
    import EventBus from "@/plugins/event-bus";
    import {Swiper, SwiperSlide,directive} from "vue-awesome-swiper";

    export default {
        name: "FacebookPreview",
        props:{
            fileManagerData: Array,
        },
        components: {Swiper, SwiperSlide},
        data: () => ({
          avatarPreview: require("@/assets/post-resources/avatar-person.svg"),
            textCaption: "",
            postType: 'media',
            addedFiles: [],
            url_info: {
              title: null,
              description: null,
              image: null,
              host: null,
            },
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
            EventBus.$on('post-type-link-update', url_info => {
                this.url_info = url_info;
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
  .preview-facebook{
    position: relative;
    border: 1px solid #f4f4f4;
    padding: 0 5px;
  }

  .preview-facebook .preview-comment .action-button{
    font-size: 14px;
    margin: 5px;
  }

  .preview-facebook .caption{
    margin-bottom: 5px;
  }


  .preview-facebook .user-info{
    padding: 5px;
    position: relative;
  }

  .preview-facebook .user-info img{
    width: 25px;
    margin-right: 5px;
  }

  .preview-facebook .user-info .text{
    line-height: 13px;
  }

  .w50{
    width: 50%;
  }

  .preview-facebook .user-info .text .name{
    font-weight: bold;
    font-size: 12px;
    color: #486397;
  }

  .preview-facebook .user-info .text span{
    color: #90949c;
    font-size: 10px;
  }

  .preview-facebook .preview-media{
    height: 300px;
    background-size: cover;
    background-position: center center;
    background-color: #f4f4f4;
    overflow: hidden;
    position: relative;
  }

  .preview-facebook video{
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

  .preview-facebook .preview-livestream-live{
    position: absolute;
    top: 10px;
    left: 10px;
    background: red;
    color: #fff;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
  }

  .preview-facebook .line-no-text{
    margin-bottom: 3px;
    height: 13px;
    background: #f4f4f4;
  }


  .preview-facebook .preview-link{
    border: 1px solid rgba(0, 0, 0, 0.05);
    margin: 0 10px 10px;
  }

  .preview-facebook .preview-link .image{
    height: 203px;
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    background-color: #f4f4f4;
    background-position: center;
  }

  .preview-facebook .preview-link .preview-link-info{
    padding: 10px;
    letter-spacing: normal;
  }

  .preview-facebook .preview-link .preview-link-info .linktitle{
    font-size: 15px!important;
    font-weight: 500;
    line-height: 22px;
    margin-bottom: 5px;
    max-height: 110px;
    overflow: hidden;
    word-wrap: break-word;
  }

  .preview-facebook .preview-link .preview-link-info .desc{
    font-size: 12px;
    font-family: inherit;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .preview-facebook .preview-link .preview-link-info .website{
    color: #90949c;
    font-size: 12px;
    text-transform: uppercase;
    font-family: inherit;
    margin-top: 10px;
  }


</style>