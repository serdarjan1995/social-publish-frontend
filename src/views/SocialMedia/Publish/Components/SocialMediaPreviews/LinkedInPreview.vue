<template>
  <v-container class="card ">
    <div class="pa-0">

      <div class="preview-linkedin">
        <div
              v-if="postType==='media' || postType==='photo'|| postType==='link'|| postType==='text'"
        >
          <div class="preview-content">
            <div class="preview-user">
              <v-row class="pl-3 pr-3">
                <img class="pa-0 mr-2" :src="avatarPreview" >
                <div class="text">
                  <div class="name">{{$t('PostPreviews.anonymous')}}</div>
                  <span>{{$t('PostPreviews.sales_manager')}}</span><br/>
                  <span> {{$t('PostPreviews.just_now')}} · <v-icon style="font-size: 12px" aria-hidden="true">mdi-earth</v-icon></span>
                </div>
              </v-row>
            </div>
            <div class="preview-caption caption">
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

            <div v-if="postType==='media' || postType==='photo'"
                 class="preview-media"
                 v-bind:class="this.$parent.isDark?'--dark':''"
            >
              <swiper class="swiper fill-height fill-width" :options="swiperOption">
                <swiper-slide class="ma-0 pa-0" v-for="(item, index) in getOnlyPhotos" :key="index">
                  <v-img
                        v-if="item.type === 'image'"
                        class="fill-width fill-height"
                        :src="item.url"
                        :lazy-src="item.lazy"
                        aspect-ratio="1"
                  ></v-img>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
              </swiper>
            </div>

            <div class="preview-link" v-if="postType==='link'">
              <div class="image" v-if="!url_info.image" v-bind:class="this.$parent.isDark?'--dark':''"></div>
              <v-img v-else-if="url_info.image !== ''" :src="url_info.image" contain></v-img>
              <div class="link-info">
                <div class="linktitle">
                  <div class="line-no-text" v-if="!url_info.title"></div>
                  {{ url_info.title }}
                </div>
                <!-- LinkedIn does not use description -->
                <!--<div class="desc">
                  <div v-if="!url_info.description">
                    <div class="line-no-text" v-bind:class="this.$parent.isDark?'--dark':''"></div>
                    <div class="line-no-text" v-bind:class="this.$parent.isDark?'--dark':''"></div>
                    <div class="line-no-text w50" v-bind:class="this.$parent.isDark?'--dark':''"></div>
                  </div>
                  <div v-else>{{url_info.description}}</div>
                </div>-->
                <div class="website">
                  <div class="line-no-text w50" v-if="!url_info.host" ></div>
                  {{url_info.host}}
                </div>
              </div>
            </div>

          </div>
          <div class="preview-footer">
            <div class="d-flex justify-space-around">
              <div class="action-button">
                <v-icon style="font-size: 20px" aria-hidden="true">mdi-thumb-up-outline</v-icon>{{$t('PostPreviews.like')}}
              </div>
              <div class="action-button">
                <v-icon style="font-size: 20px" aria-hidden="true">mdi-message-text-outline</v-icon>{{$t('PostPreviews.do_comment')}}
              </div>
              <div class="action-button">
                <v-icon style="font-size: 20px" aria-hidden="true">mdi-share-variant</v-icon>{{$t('PostPreviews.share')}}
              </div>
            </div>
            <div class="clearfix"></div>
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
        name: "LinkedInPreview",
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
            },
            getOnlyPhotos() {
                let filterPhotos = [];
                this.addedFiles.forEach((fileId) => {
                    this.fileManagerData.forEach(file => {
                        if (file.id === fileId && file.type === 'image'){
                            filterPhotos.push(file)
                        }
                    });
                });
                return filterPhotos;
            },
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

  .preview-linkedin{
    border: 1px solid #f4f4f4;
    padding: 0 5px;
  }

  .preview-linkedin .preview-footer .action-button{
    font-size: 14px;
    margin: 5px;
  }

  .preview-linkedin .preview-content .preview-user{
    padding: 5px;
    position: relative;
  }

  .preview-linkedin .preview-content .preview-user img{
    width: 30px;
    margin-right: 5px;
  }
  .preview-linkedin .preview-content .preview-user .text{
    line-height: 13px;
  }

  .preview-linkedin .preview-content .preview-user .text .name{
    font-weight: bold;
    font-size: 12px;
  }

  .preview-linkedin .preview-content .preview-user .text span{
    color: #939393;
    font-size: 10px;
    display: inline-block;
  }

  .preview-linkedin .preview-content .preview-caption{
    padding: 5px;
    word-break: break-all;
  }

  .preview-linkedin .preview-content .line-no-text{
    margin-bottom: 3px;
    height: 13px;
    background: #f4f4f4;
  }
  .w50{
    width: 50%;
  }

  /*PREVIEW IMAGE*/
  .preview-linkedin  .preview-content .preview-media{
    height: 300px;
    width: 100%;
    background-size: cover;
    background-color: #f4f4f4;
  }

  /*PREVIEW LINK*/
  .preview-linkedin .preview-content .image{
    height: 265px;
    width: 100%;
    background-size: cover;
    background-color: #f4f4f4;
  }

  .preview-linkedin .preview-content .preview-link .link-info{
    padding: 10px;
    letter-spacing: normal;
    background-color: #e0e0e0;
  }

  .preview-linkedin .preview-content .preview-link .link-info .linktitle{
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
    margin-bottom: 5px;
    max-height: 110px;
    overflow: hidden;
    word-wrap: break-word;
    color: black;
  }

  .preview-linkedin .preview-content .preview-link .link-info .desc{
    font-size: 12px;
    font-family: inherit;
  }

  .preview-linkedin .preview-content .preview-link .link-info .website{
    color: #90949c;
    font-size: 12px;
    text-transform: lowercase;
    font-family: inherit;
    margin-top: 0;
  }

</style>