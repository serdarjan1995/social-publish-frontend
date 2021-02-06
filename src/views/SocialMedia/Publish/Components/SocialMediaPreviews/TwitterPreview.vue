<template>
  <v-container class="card ">
    <div class="pa-0">

      <div class="preview-twitter">
        <div
              class="preview-content"
              v-if="postType==='media' || postType==='video' || postType==='photo'|| postType==='link'|| postType==='text'"
        >
          <div class="user-info">
            <v-row class="pl-3 pr-3">
              <img class="pa-0 mr-2" :src="avatarPreview" >
              <div class="text">
                <div class="name">{{$t('PostPreviews.anonymous')}}</div>
                <span>{{$t('PostPreviews.username')}}</span>
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

          <div
                v-if="postType==='photo' || postType==='media'"
                class="preview-media"
                v-bind:class="this.$parent.isDark?'--dark':''"
          >
            <swiper class="swiper fill-height fill-width" :options="swiperOption">
              <swiper-slide class="ma-0 pa-0" v-for="(item, index) in addedFiles" :key="index">
                <v-img
                      v-if="getFile(item).type === 'image' && index <5"
                      class="fill-width fill-height"
                      :src="getFile(item).url"
                      :lazy-src="getFile(item).lazy"
                      aspect-ratio="1"
                ></v-img>
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div>

          <div
                v-else-if="postType==='video'"
                class="preview-media"
                v-bind:class="this.$parent.isDark?'--dark':''"
          >
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

          <div
                v-if="postType==='link'"
                class="preview-link">
            <div class="image" v-if="!url_info.image" v-bind:class="this.$parent.isDark?'--dark':''"></div>
            <v-img v-else-if="url_info.image !== ''" height="100px" :src="url_info.image" ></v-img>
            <div class="twitter-link-info">
              <div class="linktitle">
                <div class="line-no-text" v-if="!url_info.title" v-bind:class="this.$parent.isDark?'--dark':''"></div>
                {{ url_info.title }}
              </div>
              <!-- Twitter does not use description -->
              <!--<div class="desc">
                <div v-if="!url_info.description">
                  <div class="line-no-text" v-bind:class="this.$parent.isDark?'--dark':''"></div>
                  <div class="line-no-text" v-bind:class="this.$parent.isDark?'--dark':''"></div>
                  <div class="line-no-text w50" v-bind:class="this.$parent.isDark?'--dark':''"></div>
                </div>
                <div v-else>{{url_info.description}}</div>
              </div>-->
              <div class="website">
                <div class="line-no-text" v-if="!url_info.host" v-bind:class="this.$parent.isDark?'--dark':''"></div>
                {{url_info.host}}
              </div>
            </div>
          </div>

          <div class="post-info">
            <div class="info-active">
              {{currentDate}}
            </div>
            <div class="clearfix"></div>
          </div>
          <div class="preview-comment">
            <div class="row">
              <div class="col-3 pa-2">
                <v-icon style="font-size: 18px" aria-hidden="true">mdi-comment-outline</v-icon>
              </div>
              <div class="col-3 pa-2">
                <v-icon style="font-size: 18px" aria-hidden="true">mdi-twitter-retweet</v-icon>
              </div>
              <div class="col-3 pa-2">
                <v-icon style="font-size: 18px" aria-hidden="true">mdi-heart-outline</v-icon>
              </div>
              <div class="col-3 pa-2">
                <v-icon style="font-size: 18px" aria-hidden="true">mdi-share-variant</v-icon>
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
            currentDate: '',
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
            setNewCurrentDate(){
                var date = new Date();
                var dateTimeFormat = new Intl.DateTimeFormat('en',
                    {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                        hour12: false,
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                var [{ value: month },,
                    { value: day },,
                    { value: year },,
                    { value: hour },,
                    { value: minute },,
                ] = dateTimeFormat.formatToParts(date);
                this.currentDate = `${hour}:${minute} · ${day} ${month} ${year}`;
            },
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
                this.setNewCurrentDate();
            });
            EventBus.$on('post-type-changed', post_type => {
                this.postType = post_type;
                this.setNewCurrentDate();
            });
            EventBus.$on('post-added-files-changed', addedFiles => {
                this.addedFiles = addedFiles;
            });
            EventBus.$on('post-type-link-update', url_info => {
              this.url_info = url_info;
            });
            EventBus.$emit('post-type-requested')
            EventBus.$emit('post-added-files-requested')
            this.setNewCurrentDate();
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

  /*Preview Twitter*/
  .preview-twitter{
    position: relative;
    border: 1px solid #f4f4f4;
    padding: 0 5px;
  }


  .preview-twitter .preview-content .user-info{
    padding: 5px;
    position: relative;
  }

  .preview-twitter .preview-content .user-info img{
    width: 25px;
    margin-right: 5px;
  }

  .preview-twitter .preview-content .user-info .text{
    line-height: 13px;
  }

  .preview-twitter .preview-content .user-info .text .name{
    font-weight: bold;
    font-size: 12px;
  }

  .preview-twitter .preview-content .user-info .text span{
    color: #657786;
    font-size: 10px;
  }

  .preview-twitter .preview-content .preview-media{
    height: 300px;
    background-size: cover;
    background-position: center center;
    background-color: #f4f4f4;
    overflow: hidden;
    position: relative;
  }

  .preview-twitter video{
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

  .preview-twitter .preview-content .post-info{
    padding: 5px;
    font-size: 12px;
    color: #7999c0;
  }

  .preview-twitter .preview-content .caption{
    padding: 5px;
    word-break: break-all;
  }

  .w50{
    width: 50%;
  }

  .preview-twitter .preview-content .line-no-text{
    margin-bottom: 3px;
    height: 13px;
    background: #f4f4f4;
  }

  .preview-twitter .preview-content .preview-comment{
    position: relative;
    border-top: 1px solid #eee;
    color: #999;
    text-align: center;
  }


  .preview-twitter .preview-content .preview-link{
    border: 1px solid gray;
    border-radius: 10px;
    margin: 0 10px;
    height: 100%;
    overflow: hidden;
  }

  .preview-twitter .preview-content .preview-link .image{
    height: 100px;
    width: 100%;
    background: #f4f4f4;
    background-size: cover;
  }

  .preview-twitter .preview-content .preview-link .twitter-link-info{
    padding: 10px;
    letter-spacing: normal;
  }

  .preview-twitter .preview-content .preview-link .twitter-link-info .linktitle{
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
    margin-bottom: 5px;
    max-height: 110px;
    overflow: hidden;
    word-wrap: break-word;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .preview-twitter .preview-content .preview-link .twitter-link-info .desc{
    font-size: 12px;
    font-family: inherit;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .preview-twitter .preview-content .preview-link .website{
    color: #90949c;
    font-size: 12px;
    text-transform: lowercase;
    font-family: inherit;
    margin-top: 0;
  }

</style>