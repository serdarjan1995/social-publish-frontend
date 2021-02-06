
<template>
    <v-container
          class="post-preview"
          style="max-width: 400px"
    >
        <div v-if="tabsActive">
            <v-tabs
                  v-model="tab"
                  center-active
                  show-arrows
                  height="35"
            >
                <v-tabs-slider></v-tabs-slider>

                <v-tab
                      v-for="(tab,i) in previewTabs"
                      :key='"tab"+i'
                      :href="'#tab-'+i"
                      style="padding:0; min-width:40px"
                >
                    <v-icon style="height: 20px; width: 20px">${{tab.icon_rect}}</v-icon>
                </v-tab>


            </v-tabs>

            <v-tabs-items v-model="tab">
                <v-tab-item
                      v-for="(preview,i) in previewTabs"
                      :key='"preview-"+i'
                      :value="'tab-'+i"
                >
                    <v-card flat>
                        <component
                              :is="preview.preview"
                              :fileManagerData="fileManagerData"
                        >
                        </component>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </div>

        <div v-else>
            <v-card
                  v-for="(preview,i) in previewTabs"
                  :key='"preview-"+i'
                  :value="'tab-'+i" flat>
                <component
                      :is="preview.preview"
                      :fileManagerData="fileManagerData"
                >
                </component>
            </v-card>
        </div>


    </v-container>

</template>
<script>

    export default {
        props: {
            previewTabs: Array,
            fileManagerData: Array,
            tabsActive: {
                type: Boolean,
                default: true
            }
        },
        components:{

        },
        data: () => ({
            tab: null,
        }),
        computed:{

        },
        methods:{

        },
        created() {

        }
    };


</script>

<style lang="scss">
    @import 'node_modules/swiper/swiper.scss';
</style>

<style src='swiper/swiper-bundle.css'>
</style>

<style>
    .v-slide-group__prev{
        min-width: 30px;
    }

    .v-slide-group__next{
        min-width: 30px;
    }

    .--dark{
      background: #5e5e5e!important;
    }
</style>