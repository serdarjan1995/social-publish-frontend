<template>
  <v-container class="card ">
    <div class="pa-0">

      <div class="preview-telegram item-post-type" >
        <div class="preview-content"
             v-if="postType==='media' || postType==='video' || postType==='photo'|| postType==='link'|| postType==='text'"
        >
          <div class="preview-media"
               v-bind:class="this.$parent.isDark?'--dark':''"
               v-if="postType==='media' || postType==='video' || postType==='photo'">
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

          <div class="preview-link" v-if="postType==='link'">
            <div class="image" v-if="!url_info.image" v-bind:class="this.$parent.isDark?'--dark':''"></div>
            <v-img v-else-if="url_info.image !== ''" :src="url_info.image" contain></v-img>
            <div class="link-info">
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
              <!-- Telegram does not use host -->
              <!--
              <div class="website">
                <div class="line-no-text" v-if="!url_info.host" v-bind:class="this.$parent.isDark?'--dark':''"></div>
                {{url_info.host}}
              </div>-->
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
    import {directive, Swiper, SwiperSlide} from "vue-awesome-swiper";

    export default {
        name: "TwitterPreview",
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
            url_info: {
              title: null,
              description: null,
              image: null,
              host: null,
            },
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
            EventBus.$emit('post-type-requested')
            EventBus.$emit('post-added-files-requested')
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

  .preview-telegram{
    border: 1px solid #f4f4f4;
    padding: 0 5px;
  }



  .preview-content .caption{
    padding: 5px;
    word-break: break-all;
  }

  .preview-content .line-no-text{
    margin-bottom: 3px;
    height: 13px;
    background: #f4f4f4;
  }

  .w50{
    width: 50%;
  }

  .preview-telegram .preview-content .preview-media{
    height: 300px;
    width: 100%;
    background-color: #f4f4f4;
    background-size: cover;
    position: relative;
  }


  .preview-telegram .preview-content .preview-media video{
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

  /*PREVIEW LINK*/
  .preview-telegram .preview-content .image{
    width: 100%;
    background-color: #f4f4f4;
    background-size: cover;
    height: 265px;
  }

  .preview-content .preview-link .link-info{
    padding: 10px;
    letter-spacing: normal;
  }

  .preview-content .preview-link .link-info .line-no-text{ background: #e2e2e2; }

  .preview-content .preview-link .link-info .linktitle{
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
    margin-bottom: 5px;
    max-height: 110px;
    overflow: hidden;
    word-wrap: break-word;
  }

  .preview-content .preview-link .link-info .desc{
    font-size: 12px;
    font-family: inherit;
  }

  .preview-content .preview-link .link-info .website{
    color: #90949c;
    font-size: 12px;
    text-transform: lowercase;
    font-family: inherit;
    margin-top: 0;
  }

</style>