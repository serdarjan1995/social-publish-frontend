<template>
    <div class="vuse-content-wrapper">

        <v-breadcrumbs :items="breadcrumbs_items">
            <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
            </template>
        </v-breadcrumbs>

        <file-manager-storage-status
          :title="$t('FileManager.limit')"
          :percentage="dataStorageStatus"

        ></file-manager-storage-status>

        <search-filter-bar
                :filters="filters"
                @file-manager-search-text-changed="searchText = $event"
                @file-manager-filters-changed="filtersSelected = $event"
        ></search-filter-bar>

        <v-container fluid class="fill-width">
            <vue-dropzone
                  :options="getDropzoneOptions"
                  id="dropzone"
                  :useCustomSlot=true
                  :duplicateCheck=false
                  @vdropzone-files-added1="(...args)=>fileAdded(...args)"
                  @vdropzone-sending1="(...args)=>fileSending(...args)"
                  @vdropzone-duplicate-file1="(...args)=>fileDuplicate(...args)"
                  @vdropzone-success="(...args)=>fileUploadSuccess(...args)"
                  @vdropzone-error="(...args)=>fileUploadError(...args)"
            >
                <div class="dropzone-custom-content">
                    <h3 class="dropzone-custom-title">{{$t('FileManager.dragAndDrop')}}</h3>
                    <div class="subtitle">{{$t('FileManager.orClickToSelect')}}</div>
                    <div class="subtitle">{{$t('FileManager.acceptedFiles',{type:'jpeg/jpg,png,mp4'})}}</div>
                </div>
            </vue-dropzone>
        </v-container>

        <v-container fluid class="fill-width">
            <file-manager-list
                    :fileManagerData="getFileManagerData"
            ></file-manager-list>
        </v-container>

    </div>
</template>
<script>
    import FileManagerStorageStatus from "@/views/SocialMedia/Postdetails/Components/FileManagerStorageStatus";
    import FileManagerList from "@/views/SocialMedia/Postdetails/Components/FileManagerList";
    import SearchFilterBar from "@/views/SocialMedia/Postdetails/Components/SearchFilterBar";
    import vue2Dropzone from 'vue2-dropzone'

    export default {
        components:{
            FileManagerStorageStatus,
            FileManagerList,
            SearchFilterBar,
            vueDropzone: vue2Dropzone,
        },
        methods:{
            getUserFiles(){
                // this.$store.dispatch("user/getFilesRequest")
                //this.userFiles = this.$store.getters["user/getUserFiles"]
            },
            fileAdded(args){
                console.log(args)
            },
            fileSending(args){
                console.log(args)
            },
            fileDuplicate(args){
                console.log(args)
            },
            fileUploadSuccess(args){
                let resp = JSON.parse(args.xhr.response)
                if(!resp.errors){
                    this.$store.dispatch("user/getFilesRequest")
                        .then((resp) => {
                          this.$store.state.user.files = resp.data.files
                          this.fileManagerData = resp.data.files
                        })
                    this.$store.state.snackbar.snackbarMessage = resp.data.message
                    this.$store.state.snackbar.snackbarColor = 'success'
                    this.$store.state.snackbar.snackbar = true

                }
                else{
                    this.$store.state.snackbar.snackbarMessage = 'a'
                    this.$store.state.snackbar.snackbarColor = 'error'
                    this.$store.state.snackbar.snackbar = true
                }
            },
            fileUploadError(args){
              if(args.status ==='error' && !args.accepted){
                this.$store.state.snackbar.snackbarMessage = args.previewTemplate.childNodes[7].innerText
                this.$store.state.snackbar.snackbarColor = 'error'
                this.$store.state.snackbar.snackbar = true
              }
              else{
                let resp = JSON.parse(args.xhr.response)
                if(resp.errors){
                  args.previewTemplate.childNodes[7].innerText = resp.data.message
                  this.$store.state.snackbar.snackbarMessage = this.$i18n.t('FileManager.fileUploadError') +
                      ': ' + resp.data.message
                  this.$store.state.snackbar.snackbarColor = 'error'
                  this.$store.state.snackbar.snackbar = true
                }
              }
            }
        },
        mounted() {
            // this.getUserFiles()
        },
        computed:{

            getFileManagerData(){
                let fileData = [];
                if(this.filtersSelected.length === 0 && this.searchText.length === 0){
                    return this.fileManagerData
                }
                else if(this.filtersSelected.length === 0 && this.searchText.length > 0){
                    this.fileManagerData.forEach(
                          (file) => {
                              if(file.name.includes(this.searchText)){
                                  fileData.push(file)
                              }
                          }
                    )
                    return fileData;
                }
                else if(this.filtersSelected.length > 0 && this.searchText.length === 0){
                    this.filtersSelected.forEach(
                          (filter) => {
                              this.fileManagerData.forEach(
                                    (file) => {
                                        if (file.type === filter){
                                            fileData.push(file)
                                        }
                                    }
                              )
                          }
                    )
                    return fileData;
                }
                else{
                    this.filtersSelected.forEach(
                          (filter) => {
                              this.fileManagerData.forEach(
                                    (file) => {
                                        if (file.type === filter && file.name.includes(this.searchText)){
                                            fileData.push(file)
                                        }
                                    }
                              )
                          }
                    )
                    return fileData;
                }
            },
            getDropzoneOptions() {
                return {
                    url: process.env.VUE_APP_URL+'upload/file',
                    method: 'post',
                    acceptedFiles:"image/jpg,image/jpeg,image/png,video/mp4",
                    previewsContainer: null,
                    createImageThumbnails: true,
                    autoProcessQueue: true,
                    thumbnailWidth: 100,
                    thumbnailHeight: 100,
                    thumbnailMethod: 'crop',
                    addRemoveLinks:true,
                    maxFilesize: 2048,
                    timeout: 180000,
                    maxFiles:9,
                    uploadMultiple: false,
                    dictInvalidFileType: this.$i18n.t("FileManager.invalidFileType"),
                    dictFileTooBig: this.$i18n.t("FileManager.fileTooBig"),
                    dictRemoveFile:"X",
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('access-token'),
                        Locale: this.$store.getters.locale,
                    },
                }
            }
        },
        data: () => ({
            page: "FileManager",
            dataStorageStatus: 0,
            fileManagerData: [],
            breadcrumbs_items: [
                {
                    text: 'Post Details',
                    disabled: true,
                },
                {
                    text: 'File Manager',
                    disabled: true,
                }
            ],
            filters: [
                'video',
                'image'
            ],
            filtersSelected: [],
            searchText: "",
        }),
        created() {
          this.$store.dispatch("user/getFilesRequest").then((resp) => {
            this.fileManagerData = resp.data.files
          })
        }
    };
</script>

<style>
    .dz-image img{
        width: inherit!important;
    }
    .dz-preview{
        height: 100px!important;
        min-height: 100px!important;
        width: 100px!important;
        margin: 0 5px!important;
        padding: 5px;
        position: relative;
    }
    .dz-details{
        padding: 5px!important;
    }
    .dz-size{
        font-size: 12px!important;
    }
    .dz-filename{
        font-size: 12px!important;
        position: absolute;
        width: 90%;
        bottom: 8px;
        padding: 5px;
    }
    .dz-progress .dz-upload{
      background: #00b782!important;
    }
    .dz-success-mark svg{
        width: 30px!important;
        height: 30px!important;
    }
    .dz-error-mark svg{
        width: 30px!important;
        height: 30px!important;
    }
    .dz-error-message{
        top: 25%!important;
    }
    .dz-remove{
        position: absolute;
        right: 5%;
        top: 5%!important;
        bottom: auto!important;
        padding: 5px!important;
    }
</style>

<style scoped>
    .vue-dropzone {
        min-height: 120px;
        height: 120px;
        padding: 10px;
        position: relative;
    }

    .dropzone-custom-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
    }

    .dropzone-custom-title {
        margin-top: 0;
        color: #00b782;
    }

    .subtitle {
        color: #314b5f;
    }
</style>

<style src="vue2-dropzone/dist/vue2Dropzone.min.css">

</style>
