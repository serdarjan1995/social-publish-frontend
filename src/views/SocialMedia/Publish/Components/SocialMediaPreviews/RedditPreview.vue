<template>
  <v-container class="card ">
    <div class="pa-0">

      <div class="preview-reddit" >
        <div
              v-if="postType==='photo' || postType==='video' || postType==='link' || postType==='text'"
        >

            <div class="preview-content">
              <div class="preview-user">
                <v-row class="pl-3 pr-3">
                <img class="pa-0 mr-2" :src="avatarPreview" >
                  <div class="text">
                    <div class="name">
                      <span class="pt-1">{{$t('PostPreviews.anonymous')}}</span>
                    </div>
                    <span style="font-weight: 400; font-size: 10px;">{{$t('PostPreviews.postedByAnonymous')}}</span>
                  </div>
                </v-row>
              </div>

              <div class="preview-title" v-bind:class="postType==='link' ? 'preview-left':''">
                <p v-if="hasTitle" style="margin: 0">
                  {{ textTitle }}
                </p>
                <div v-else>
                  <div class="line-no-text" v-bind:class="this.$parent.isDark?'--dark':''"></div>
                </div>
              </div>
              <div class="preview-media" v-if="postType==='photo' || postType==='video'"
                   v-bind:class="this.$parent.isDark?'--dark':''">
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

              <div class="caption" v-if="postType==='text'">
                <pre v-if="hasCaption" style="white-space: pre-line;">
                  {{ textCaption }}
                </pre>
                <div v-else>
                  <div class="line-no-text" v-bind:class="this.$parent.isDark?'--dark':''"></div>
                  <div class="line-no-text" v-bind:class="this.$parent.isDark?'--dark':''"></div>
                  <div class="line-no-text w50" v-bind:class="this.$parent.isDark?'--dark':''"></div>
                </div>
              </div>

              <div class="preview-link" v-if="postType==='link'" >
                <div class="preview-link-info" v-if="!url_info.image">
                  <v-icon class="fa fa-external-link open" aria-hidden="true">mdi-open-in-new</v-icon>
                </div>
                <div class="preview-link-info" v-else-if="url_info.image !== ''">
                  <v-img :src="url_info.image" height="107"></v-img>
                  <v-icon class="fa fa-external-link open" aria-hidden="true">mdi-open-in-new</v-icon>
                </div>

              </div>
            </div>
            <div class="preview-footer">
              <div>
                <div class="float-left">
                  <v-icon small aria-hidden="true">mdi-comment</v-icon><p>{{$t('PostPreviews.like')}}</p>
                </div>
                <div class="float-left">
                  <v-icon small aria-hidden="true">mdi-share</v-icon><p>{{$t('PostPreviews.do_comment')}}</p>
                </div>
                <div class="float-left">
                  <v-icon small aria-hidden="true">mdi-bookmark-plus-outline</v-icon><p>{{$t('PostPreviews.save')}}</p>
                </div>
                <div class="float-left">
                  <v-icon small aria-hidden="true">mdi-cancel</v-icon><p>{{$t('PostPreviews.hide')}}</p>
                </div>
                <div class="float-left">
                  <v-icon small aria-hidden="true">mdi-flag</v-icon><p>{{$t('PostPreviews.report')}}</p>
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
        name: "RedditPreview",
        props:{
            fileManagerData: Array,
        },
        components: {Swiper, SwiperSlide},
        data: () => ({
            avatarPreview: require("@/assets/post-resources/avatar-person.svg"),
            textCaption: "",
            textTitle: "",
            postType: 'photo',
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
            EventBus.$on('post-title-changed', post_title => {
                this.textTitle = post_title;
            });
            EventBus.$on('post-type-changed', post_type => {
                this.postType = post_type;
                this.textTitle = ""
            });
            EventBus.$on('post-added-files-changed', addedFiles => {
                this.addedFiles = addedFiles;
            });
            EventBus.$on('post-type-link-update', url_info => {
              this.url_info = url_info;
              this.textTitle = url_info.title;
            });
            EventBus.$emit('post-added-files-requested')
            EventBus.$emit('post-type-requested')
        },
        computed:{
            hasCaption(){
                return this.textCaption.length > 0;
            },
            hasTitle(){
                return this.textTitle.length > 0;
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

  /*GENERAL*/
  .preview-footer p{
    margin-bottom: 0;
    display: inline-block;
    margin-right: 6px;
    color: rgb(135, 138, 140);
    font-size: 12px;
    font-weight: 600;
  }

  .preview-left{
    width: calc(100% - 164px);
    min-height: 127px;
  }

  .preview-reddit{
    border: 1px solid #f4f4f4;
    padding: 0 5px;
  }

  .preview-content .preview-user{
    padding: 5px;
    position: relative;
  }
  .preview-content .preview-user img{
    width: 25px;
  }
  .preview-content .preview-user .text{
    font-size: 13px;
    line-height: 15px;
  }

  .preview-content .preview-user .text .name{
    font-weight: bold;
    color: #5e5e5e;
  }

  .preview-content .preview-user .text span{
    color: #939393;
    font-size: 12px;
    padding-top: 2px;
    display: inline-block;
  }

  .preview-content .preview-title{
    padding: 5px 5px;
    word-break: break-all;
    font-size: 18px;
    line-height: 18px;
  }
  .preview-content .caption{
    padding: 5px 5px;
    word-break: break-all;
  }

  .preview-content .line-no-text{ margin-bottom: 3px; height: 13px; background: #f5f5f5; }
  .preview-content .line-no-text.w50{ width: 50%; }

  /*PREVIEW IMAGE*/
  .preview-content .preview-media{
    height: 321px;
    width: 100%;
    background-color: #f4f4f4;
    background-size: cover;
  }

  /*PREVIEW LINK*/
  .preview-content{
    position: relative;
  }


  .preview-content .preview-link{
    padding: 0 10px;
    word-break: break-all;
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;
    color: rgb(63, 154, 222);
  }

  .preview-content .preview-link-info{
    border: 1px solid rgb(0, 121, 211);
    border-radius: 4px;
    width: 144px;
    height: 110px;
    position: absolute;
    right: 10px;
    top: 60px;
    text-align: center;
    color: rgb(0, 121, 211);
    font-size: 25px;
    line-height: 108px;
  }

  .preview-content .preview-link-info .open{
    position: absolute;
    right: 0;
    border-top-left-radius: 4px;
    bottom: 0;
    height: 18px;
    width: 18px;
    background: rgb(0, 121, 211);
    font-size: 10px;
    line-height: 20px;
    text-align: center;
    color: #fff;
  }


</style>