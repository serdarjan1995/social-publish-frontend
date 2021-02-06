<template>
  <form enctype="multipart/form-data">
<!--    <input type="file" class="form-control" v-on:change="onFileChange($event, 'file_cover')">-->
<!--    <input type="file" class="form-control" v-on:change="onFileChange($event, 'file_avatar')">-->

    <v-img
      min-height="240"
      src="https://picsum.photos/id/823/851/315"
      class="unset-overflow profile-cover"
      >
    <!-- User Profile Img -->
    <v-row align="end" class="mx-0">
      <v-col class="pl-12 user-avatar-col" cols="6">
        <input type="file" class="form-control profile-image-input" v-on:change="onFileChange($event, 'file_avatar')">
        <v-btn icon class="profile-image-icon">
          <v-icon class="">camera_enhance</v-icon>
        </v-btn>
        <vuse-neu-avatar :src="$store.state.user.profile.profile_image" class="testclass" glowClass="neu-glow-inset" />
      </v-col>

    </v-row>
    <!-- Other Features on Cover pic -->
    <v-row class="fill-height mx-0 with-radius">
      <!-- [Aligned-Start Item] Toolbar -->
      <div v-show="updateButton" class="update-container">

        <v-btn type="submit" small color="success" dark>Update</v-btn>
      </div>
      <v-col cols="12" class="align-self-start">
        <v-toolbar dense flat class="transparent" dark>

          <v-spacer></v-spacer>

          <v-btn icon v-show="false">
            <v-icon>camera_alt</v-icon>
            <input v-show="false" type="file" class="form-control cover-image-input" v-on:change="onFileChange($event, 'file_cover')">
          </v-btn>
        </v-toolbar>
      </v-col>

      <!-- [Aligned-End Item] Add Button -->
      <v-col align="end" cols="12" class="align-self-end">
        <v-btn fab small class="mx-3" :to="`/app/publish`">
          <v-icon small>add</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-img>

  </form>
</template>
<script>

export default {
  data(){
    return {
      updateButton: false,
      form: {
        avatar: '',
        cover: '',
      },
      list: this.$store.state.user.profile,
      name: '',
      file_cover: '',
      file_avatar: '',
      success: ''
    }
  },
  methods: {
    onFileChange(e, file){

      if (file === 'file_cover') {
        this.file_cover = e.target.files[0];
      } else {
        this.file_avatar = e.target.files[0];
        console.log("file_avatar", this.file_avatar)
      }

      e.preventDefault();
      let currentObj = this;

      let formData = new FormData();
      formData.append('file_avatar', this.file_avatar);

      this.$store.dispatch("user/updateImage", formData).then((response) => {
        console.log("response : ", response.data.avatar)
        this.$store.state.user.profile.profile_image = response.data.avatar;
        currentObj.success = response.data.success;
      })
      .catch((e) => {
        console.log("e", e)
        currentObj.output = e;
      })

    },
  },
  created() {
    let authInfo = this.$store.state.user.profile.profile_image
    console.log("authInfo ", authInfo)
  }
};
</script>
<style scoped>
  .profile-image-input {
    position: absolute;
    top: 14px;
    opacity: 0;
    z-index: 100;
    width: 50px;
    cursor: pointer;
    color: white;
  }
  .profile-image-icon {
    color: white !important;
    position: absolute;
    left: 8%;
    top: 8px;
  }
  .update-container {
    position: absolute;
    left: 46%;
    bottom: -33px;
  }
  .cover-image-input {
    position: absolute;
    width: 50px;
    opacity: 0;
  }
</style>
