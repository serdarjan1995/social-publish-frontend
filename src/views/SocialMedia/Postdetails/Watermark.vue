<template>
  <div class="vuse-content-wrapper chat-app">
    <v-breadcrumbs :items="breadcrumbs_items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <inner-base-layout baseLayerClass="neu-glow-inset" innerContainerClass="transparent">

      <template v-slot:sidebar>
        <v-navigation-drawer hide-overlay :value="drawer" :permanent="$vuetify.breakpoint.mdAndUp" enable-resize-watcher
                             class="flex-shrink-0 vuse-sidebar-scrollable"
                             width="280" :stateless="$vuetify.breakpoint.smAndDown" v-show="drawer"
                             :floating="$vuetify.breakpoint.smAndDown"
                             :color="$vuetify.breakpoint.mdAndUp ? 'transparent' : ''"
                             :absolute="$vuetify.breakpoint.smAndDown" mobile-breakpoint>
          <div class="vuse-sidenav-wrapper">
            <v-list class="scrollable-content privatescrol" rounded style="overflow: hidden !important;">
              <v-slide-y-transition group>
                <v-list-item :key="`member-0`" @click="switchDefaultLogo()"
                             :class="[0 === activeLogoId ? 'neu-glow-inset-primary' : '']">
                  <v-list-item-avatar class="my-0">
                    <v-icon size="40">group_work</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      Example
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <template v-for="(logo, index) in logoList">
                  <v-list-item :key="`member-${index}-${logo.id}`" @click="switchLogo(logo)"
                               :class="[logo.social_network_id === activeLogoId ? 'neu-glow-inset-primary' : '']">
                    <v-list-item-content>
                      <v-list-item-title>
                        <v-icon>{{ logo.icon }}</v-icon>
                        {{ logo.name }}'s Watermark
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-slide-y-transition>
            </v-list>
          </div>
        </v-navigation-drawer>
      </template>

      <template v-slot:content>
        <form @submit.prevent="saveWatermark()" ref="form">
          <div style="overflow: hidden !important;">
            <v-row>
              <v-col cols="4">
                <v-sheet style="width: 100%; height: 100%; position:relative">
                  <v-img src="https://picsum.photos/300/400" style="position: absolute; width: 100%; height: 100%"></v-img>
                  <v-img :src="'/static/pngegg.png'" :width="scale" :height="scale" id="watermarkImage"
                         style="position: absolute;"></v-img>
                </v-sheet>
              </v-col>
              <v-col cols="5">
                <p>Position</p>
                <v-row>
                  <v-btn icon @click="topleft">
                    <v-icon>mdi-arrow-top-left-thick</v-icon>
                  </v-btn>
                  <v-btn @click="top" icon>
                    <v-icon>mdi-arrow-up-thick</v-icon>
                  </v-btn>
                  <v-btn @click="topright" icon>
                    <v-icon>mdi-arrow-top-right-thick</v-icon>
                  </v-btn>
                </v-row>
                <v-row>
                  <v-btn @click="centerleft" icon>
                    <v-icon>mdi-arrow-left-thick</v-icon>
                  </v-btn>
                  <v-btn @click="centercenter" icon>
                    <v-icon>mdi-checkbox-blank-circle</v-icon>
                  </v-btn>
                  <v-btn @click="centerright" icon>
                    <v-icon>mdi-arrow-right-thick</v-icon>
                  </v-btn>
                </v-row>
                <v-row>
                  <v-btn @click="bottomleft" icon>
                    <v-icon>mdi-arrow-bottom-left-thick</v-icon>
                  </v-btn>
                  <v-btn @click="bottombottom" icon>
                    <v-icon>mdi-arrow-down-thick</v-icon>
                  </v-btn>
                  <v-btn @click="bottomright" icon>
                    <v-icon>mdi-arrow-bottom-right-thick</v-icon>
                  </v-btn>
                </v-row>
                <v-row>
                  <v-label>Size</v-label>
                </v-row>
                <v-row>
                  <v-slider @change="val($event)" min="0" :value="sizeSliderValue" max="100" thumb-label
                            thumb-size="36"></v-slider>
                </v-row>
                <v-row>
                  <v-label>Opacity</v-label>
                </v-row>
                <v-row>
                  <v-slider @change="opac($event)" :value="opacitySliderValue" min="0" max="100" thumb-label
                            thumb-size="36"></v-slider>
                </v-row>
                <v-row>
                  <v-col cols="4">
                    <v-label>Watermark</v-label>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4">
                    <input type="file" accept="image/png" @change="uploadImage">
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-btn type="submit" color="primary">Save</v-btn>
                  </v-col>
                  <v-col cols="6">
                    <v-btn @click="deleteWatermark" color="error">Delete</v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </div>
        </form>
        <v-dialog v-model="exampleTab" max-width="380">
          <v-card>
            <v-card-title class="text-h5">This is an example template</v-card-title>
            <v-card-text>
              You cannot save this watermark as it is an example only,
              please add an account in order to apply watermarks on them.
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="exampleTab = false">
                OK
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="noPreviewImage" max-width="290">
          <v-card>
            <v-card-title class="text-h5">No Watermark</v-card-title>
            <v-card-text>
              You have to add a watermark image before saving.
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="noPreviewImage = false">
                OK
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </template>
    </inner-base-layout>
  </div>
</template>
<script>
import InnerBaseLayout from "@/layouts/Inner/Layout"
export default {
  components: {
    InnerBaseLayout,
  },
  data() {
    return {
      drawer: true,
      breadcrumbs_items: [
        {
          text: "Watermark",
          disabled: true,
        },
      ],
      activeLogoId: 0,
      sizeSliderValue: 50,
      opacitySliderValue: 100,
      scale: 100,
      opacity: 1,
      position: "lt",
      page: "Watermark",
      myFormData: new FormData(),
      previewImage: null,
      imageFile: null,
      watchList: null,
      noPreviewImage: false,
      exampleTab: false
    };
  },
  created() {
    this.$store.dispatch("watermark/getWatermarks");
  },

  computed: {
    watermarkList: {
      get() {
        return this.$store.state.watermark.watermarkList
      },
      set(newValue) {
        this.$store.state.watermark.watermarkList = newValue
      }
    },
    logoList() {
      return this.watermarkList;
    }
  },
  watch:{
    watermarkList(){
    },
    logoList(){
    }
  },
  methods: {
    drawerHandler() {
      this.drawer = !this.drawer
    },
    switchDefaultLogo() {
      this.activeLogoId = 0
      this.previewImage = null
      this.opacity = 1
      this.opacitySliderValue = 100
      this.scale = 100
      this.sizeSliderValue = 50
      this.val(100)
      this.opac(100)
    },
    switchLogo(list) {
      this.activeLogoId = list.social_network_id
      if (list.watermark_details !== null) {
        const image = list.watermark_details
        this.previewImage = image.watermark_mask
        this.opacity = image.watermark_opacity
        this.opacitySliderValue = image.watermark_opacity
        this.scale = image.watermark_size
        this.sizeSliderValue = image.watermark_size / 2
        this.val(image.watermark_size/2)
        this.opac(image.watermark_opacity)
        switch (image.watermark_position){
          case 'lt':
            this.topleft()
            break;
          case 't':
            this.top()
            break;
          case 'rt':
            this.topright()
            break;
          case 'lc':
            this.centerleft()
            break;
          case 'c':
            this.centercenter()
            break;
          case 'rc':
            this.centerright()
            break;
          case 'lb':
            this.bottomleft()
            break;
          case 'b':
            this.bottombottom()
            break;
          case 'rb':
            this.bottomright()
            break;


        }
      }else{
        this.previewImage = null
        this.opacity = 1
        this.opacitySliderValue = 100
        this.scale = 100
        this.sizeSliderValue = 50
        this.val(100)
        this.opac(100)
        this.myFormData.delete('watermark_mask')
      }
    },
    uploadImage(e) {
      this.previewImage = null
      this.opacity = 1
      this.opacitySliderValue = 100
      this.scale = 50
      this.sizeSliderValue = 50
      this.val(50)
      this.opac(100)

      this.imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.imageFile);
      reader.onload = e => {
        this.previewImage = e.target.result;
      }
      this.centercenter()
      this.myFormData.append('watermark_mask',this.imageFile)
    },
    val(e) {
      this.scale = e * 2;
    },
    opac(e) {
      document.getElementById("watermarkImage").style.opacity = e / 100
      this.opacity = e
    },
    topleft() {
      const water = document.getElementById("watermarkImage")
      water.style.position = "absolute"
      water.style.top = 0
      water.style.left = 0
      water.style.right = null
      water.style.bottom = null
      water.style.marginLeft = null
      water.style.marginRight = null
      water.style.marginTop = null
      water.style.marginBottom = null
      this.position = "lt"
    },
    top() {
      const water = document.getElementById("watermarkImage")
      water.style.position = "absolute"
      water.style.left = 0
      water.style.right = 0
      water.style.top = 0
      water.style.bottom = 0
      water.style.marginLeft = "auto"
      water.style.marginRight = "auto"
      water.style.marginTop = null
      water.style.marginBottom = null
      this.position = "t"
    },
    topright() {
      const water = document.getElementById("watermarkImage")
      water.style.position = "absolute"
      water.style.top = 0
      water.style.left = null
      water.style.right = 0
      water.style.bottom = null
      water.style.marginLeft = null
      water.style.marginRight = null
      water.style.marginTop = null
      water.style.marginBottom = null
      this.position = "rt"
    },
    centerleft() {
      const water = document.getElementById("watermarkImage")
      water.style.position = "absolute"
      water.style.top = 0
      water.style.left = 0
      water.style.right = null
      water.style.bottom = 0
      water.style.marginLeft = null
      water.style.marginRight = null
      water.style.marginTop = "auto"
      water.style.marginBottom = "auto"
      this.position = "lc"
    },
    centercenter() {
      const water = document.getElementById("watermarkImage")
      water.style.position = "absolute"
      water.style.top = 0
      water.style.left = 0
      water.style.right = 0
      water.style.bottom = 0
      water.style.marginLeft = "auto"
      water.style.marginRight = "auto"
      water.style.marginTop = "auto"
      water.style.marginBottom = "auto"
      this.position = "c"
    },
    centerright() {
      const water = document.getElementById("watermarkImage")
      water.style.position = "absolute"
      water.style.top = 0
      water.style.left = null
      water.style.right = 0
      water.style.bottom = 0
      water.style.marginLeft = null
      water.style.marginRight = null
      water.style.marginTop = "auto"
      water.style.marginBottom = "auto"
      this.position = "rc"
    },
    bottomleft() {
      const water = document.getElementById("watermarkImage")
      water.style.position = "absolute"
      water.style.top = null
      water.style.left = 0
      water.style.right = null
      water.style.bottom = 0
      water.style.marginLeft = null
      water.style.marginRight = null
      water.style.marginTop = null
      water.style.marginBottom = null
      this.position = "lb"
    },
    bottombottom() {
      const water = document.getElementById("watermarkImage")
      water.style.position = "absolute"
      water.style.left = 0
      water.style.right = 0
      water.style.top = null
      water.style.bottom = 0
      water.style.marginLeft = "auto"
      water.style.marginRight = "auto"
      water.style.marginTop = null
      water.style.marginBottom = null
      this.position = "b"
    },
    bottomright() {
      const water = document.getElementById("watermarkImage")
      water.style.position = "absolute"
      water.style.top = null
      water.style.left = null
      water.style.right = 0
      water.style.bottom = 0
      water.style.marginLeft = null
      water.style.marginRight = null
      water.style.marginTop = null
      water.style.marginBottom = null
      this.position = "rb"
    },
    deleteWatermark() {
      const water = document.getElementById("watermarkImage")
      water.removeAttribute("style")
      this.previewImage = null
      this.opacity = 1
      this.scale = 100
      this.sizeSliderValue = 50
      this.opacitySliderValue = 1
      this.imageFile = Object.assign({}, this.imageFile);
      this.$refs.form.reset();
    },
    saveWatermark() {
      if(this.activeLogoId === 0){
        this.exampleTab = true;
        const water = document.getElementById("watermarkImage")
        water.removeAttribute("style")
        this.previewImage = null
        this.opacity = 1
        this.scale = 100
        this.sizeSliderValue = 50
        this.opacitySliderValue = 100
        this.imageFile = Object.assign({}, this.imageFile);
        this.$refs.form.reset();
      }else{
        if(!this.previewImage){
          this.noPreviewImage = true;
        }else{
          this.myFormData.append('social_network_id', this.activeLogoId)
          this.myFormData.append('watermark_size', this.scale.toString())
          this.myFormData.append('watermark_opacity', this.opacity.toString())
          this.myFormData.append('watermark_position', this.position)

          this.$store.dispatch('watermark/saveWatermark', this.myFormData)

          this.imageFile = Object.assign({}, this.imageFile);
          this.$refs.form.reset();
        }
      }
    },
  }
}
</script>
