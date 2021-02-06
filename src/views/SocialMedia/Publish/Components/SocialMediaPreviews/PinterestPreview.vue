<template>
  <v-container class="card ">
    <div class="pa-0">

      <div class="preview-pinterest preview-pinterest-photo item-post-type" v-if="postType==='photo'">
        <div class="preview-content">
          <div class="preview-media" v-bind:class="this.$parent.isDark?'--dark':''">
            <v-img
                  v-if="addedFiles.length >0 && getFile(addedFiles[0]).type === 'image'"
                  class="fill-width fill-height"
                  :src="getFile(addedFiles[0]).url"
                  :lazy-src="getFile(addedFiles[0]).lazy"
                  aspect-ratio="1"
            ></v-img>
          </div>
          <div class="post-info">
            <div class="info-active pull-left">
              {{$t('PostPreviews.uploaded_by')}} <strong>{{$t('PostPreviews.anonymous')}}</strong>
            </div>
            <div class="clearfix"></div>
          </div>
          <div class="user-info">
            <div class="img">
              <img class="pa-0 mr-2" :src="avatarPreview">
            </div>
            <div class="desc">
              <span>
                <strong>{{$t('PostPreviews.anonymous')}} </strong>{{$t('PostPreviews.saved')}}<strong> {{$t('PostPreviews.board')}}</strong>{{$t('PostPreviews.uploaded')}}
              </span>
              <pre v-if="hasCaption" style="white-space: pre-line;font-size: 11px">
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
        </div>
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

    export default {
        name: "PinterestPreview",
        props:{
            fileManagerData: Array,
        },
        data: () => ({
            avatarPreview: require("@/assets/post-resources/avatar-person.svg"),
            textCaption: "",
            postType: 'photo',
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
            EventBus.$on('post-type-changed', post_type => {
                this.postType = post_type;
            });
            EventBus.$on('post-added-files-changed', addedFiles => {
                this.addedFiles = addedFiles;
            });
            EventBus.$emit('post-type-requested')
            EventBus.$emit('post-added-files-requested');
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
  .preview-pinterest-photo{
    position: relative;
    border: 1px solid #f4f4f4;
    padding: 0 5px;
  }

  .preview-pinterest-photo .preview-content strong{
    color: #6f6f6f;
  }

  .preview-pinterest-photo .preview-content .user-info{
    padding: 10px 20px;
    position: relative;
    border-top: 1px solid #f5f5f5;
  }

  .preview-pinterest-photo .preview-content .user-info .img{
    position: absolute;
  }

  .preview-pinterest-photo .preview-content .user-info img{
    width: 25px;
    margin-right: 5px;
  }

  .preview-pinterest-photo .preview-content .user-info .desc{
    margin-left:30px;
  }

  .w50{
    width: 50%;
  }

  .preview-pinterest-photo .preview-content .user-info span{
    font-size: 12px;
  }

  .preview-pinterest-photo .preview-content .preview-media{
    height: 300px;
    background-size: cover;
    background-position: center center;
    background-color: #f4f4f4;
    overflow: hidden;
    position: relative;
  }

  .preview-pinterest-photo .preview-content .post-info{
    padding: 5px;
    word-break: break-all;
    font-size: 13px;
  }


  .preview-pinterest-photo .preview-content .line-no-text{
    margin-bottom: 3px;
    height: 13px;
    background: #f4f4f4;
  }

</style>