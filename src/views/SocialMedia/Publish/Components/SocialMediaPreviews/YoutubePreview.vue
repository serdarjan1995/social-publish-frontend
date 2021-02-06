<template>
  <v-container class="card ">
    <div class="pa-0">

      <div class="preview-youtube">
        <div v-if="postType==='video' || postType==='livestream'">


          <div class="preview-media" v-bind:class="this.$parent.isDark?'--dark':''">
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

          <div class="user-info">
            <v-row class="pl-3 pr-3">
              <img class="pa-0 mr-2" :src="avatarPreview" >
              <div class="text">
                <div class="name preview-title">
                  <p v-if="hasTitle" style="margin: 0">
                    {{ textTitle }}
                  </p>
                  <div v-else>
                    <div class="line-no-text" v-bind:class="this.$parent.isDark?'--dark':''"></div>
                  </div>
                </div>
                <span>{{$t('PostPreviews.anonymous')}} · {{$t('PostPreviews.views',{"count":0})}} · {{$t('PostPreviews.1s')}}</span>
                <div style="height: 15px">
                  <div class="youtube-live text-uppercase" v-if="postType==='livestream'">{{$t('PostPreviews.live_now')}}</div>
                </div>

              </div>
              <v-spacer/>
              <v-icon small>mdi-dots-vertical</v-icon>
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

    export default {
        name: "YoutubePreview",
        props:{
            fileManagerData: Array,
        },
        data: () => ({
          avatarPreview: require("@/assets/post-resources/avatar-person.svg"),
            textCaption: "",
            textTitle: "",
            postType: 'video',
            addedFiles: [],
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

  /*Preview*/
  .preview-youtube{
    position: relative;
    border: 1px solid #f4f4f4;
    padding: 0 5px;
  }

  .preview-youtube .user-info{
    padding: 5px;
    position: relative;
  }

  .preview-youtube .user-info img{
    width: 25px;
    margin-right: 5px!important;
  }

  .preview-youtube .user-info .text{
    line-height: 15px;
    width: calc(100% - 46px);
  }

  .preview-youtube .user-info .text .name{
    font-weight: bold;
    font-size: 12px;
  }

  .preview-youtube .user-info .text span{
    color: #90949c;
    font-size: 10px;
  }


  .preview-youtube .caption{
    margin-bottom: 5px;
  }

  .w50{
    width: 50%;
  }

  .preview-youtube .preview-title{
    overflow: hidden;
    display: -webkit-box;
    font-weight: bold;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 15px;
  }

  .preview-youtube .preview-media{
    height: 150px;
    background-size: cover;
    background-position: center center;
    background-color: #f4f4f4;
    overflow: hidden;
    position: relative;
  }

  .preview-youtube .preview-media video {
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

  .preview-youtube .line-no-text{
    margin-bottom: 3px;
    height: 13px;
    background: #f4f4f4;
  }

  .youtube-live{
    position: absolute;
    font-size: 12px;
    border: 1px solid #c00;
    color: #c00;
  }

</style>