<template>
  <v-container class="card ">
    <div class="pa-0">
      <div class="preview-google">

        <div v-if="postType==='photo' || postType==='text'">
          <div class="preview-media" v-bind:class="this.$parent.isDark?'--dark':''" v-if="postType==='photo'">
            <v-img
                  v-if="addedFiles.length >0 && getFile(addedFiles[0]).type === 'image'"
                  class="fill-width fill-height"
                  :src="getFile(addedFiles[0]).url"
                  :lazy-src="getFile(addedFiles[0]).lazy"
                  aspect-ratio="1"
            ></v-img>
          </div>
          <div class="caption">
            <pre v-if="hasCaption" style="white-space: pre-line;">
              {{ textCaption }}
            </pre>
            <div v-else>
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
        name: "GooglePreview",
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
            EventBus.$emit('post-added-files-requested');
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
  .preview-google{
    position: relative;
    border: 1px solid #f4f4f4;
    padding: 0 5px;
  }


  .preview-google .caption{
    margin-bottom: 5px;
  }


  .w50{
    width: 50%;
  }

  .preview-google .preview-media{
    height: 300px;
    background-size: cover;
    background-position: center center;
    background-color: #f4f4f4;
    overflow: hidden;
    position: relative;
  }

  .preview-google .line-no-text{
    margin-bottom: 3px;
    height: 13px;
    background: #f4f4f4;
  }


</style>