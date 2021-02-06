<template>
  <div class="vuse-content-wrapper">
    <vuse-section-definition
        :title="$t('PostBody.newPost')"
        icon="mdi-pencil-box-multiple"
    >
    </vuse-section-definition>
    <post-layout baseLayerClass="neu-glow-inset" innerContainerClass="transparent" style="padding-top: 0">
      <template v-slot:sidebar>
        <post-sidebar :items="listContact" :check-changed="checkChanged">
          <v-checkbox
              :value="selectionAll"
              v-model="selectionAll"
              hide-details
              @change="handleSelectAll($event)"
              class="flex-shrink-0 vuse-sidebar-scrollable"
          ></v-checkbox>
          <v-spacer></v-spacer>
          <v-text-field
              v-model="search"
              label="Search User"
              solo
              dense
              flat
              prepend-icon="search"
              hide-details
          ></v-text-field>
        </post-sidebar>
      </template>
      <template v-slot:post-body>
        <div>
          <post-body
              :active-social-media="activeSocialMedia"
              :file-manager-data="fileManagerData"
          />
        </div>
      </template>
      <template v-slot:post-preview>
        <post-preview
            :preview-tabs="previewTabs"
            :file-manager-data="fileManagerData"
        >
        </post-preview>
      </template>
    </post-layout>
  </div>
</template>
<script>
    import PostLayout from "@/layouts/Inner/PostLayout"
    import PostBody from "@/views/SocialMedia/Publish/Components/PostBody";
    import PostPreview from "@/views/SocialMedia/Publish/Components/PostPreview";
    import PostSidebar from "@/views/SocialMedia/Publish/Components/PostSidebar";
    import InstagramPreview from "@/views/SocialMedia/Publish/Components/SocialMediaPreviews/InstagramPreview";
    import FacebookPreview from "@/views/SocialMedia/Publish/Components/SocialMediaPreviews/FacebookPreview";
    import TwitterPreview from "@/views/SocialMedia/Publish/Components/SocialMediaPreviews/TwitterPreview";
    import LinkedInPreview from "@/views/SocialMedia/Publish/Components/SocialMediaPreviews/LinkedInPreview";
    import PinterestPreview from "@/views/SocialMedia/Publish/Components/SocialMediaPreviews/PinterestPreview";
    import TelegramPreview from "@/views/SocialMedia/Publish/Components/SocialMediaPreviews/TelegramPreview";
    import TumblrPreview from "@/views/SocialMedia/Publish/Components/SocialMediaPreviews/TumblrPreview";
    import RedditPreview from "@/views/SocialMedia/Publish/Components/SocialMediaPreviews/RedditPreview";
    import VkPreview from "@/views/SocialMedia/Publish/Components/SocialMediaPreviews/VkPreview";
    import OkPreview from "@/views/SocialMedia/Publish/Components/SocialMediaPreviews/OkPreview";
    import GooglePreview from "@/views/SocialMedia/Publish/Components/SocialMediaPreviews/GooglePreview";
    import YoutubePreview from "@/views/SocialMedia/Publish/Components/SocialMediaPreviews/YoutubePreview";
    import FoursquarePreview from "@/views/SocialMedia/Publish/Components/SocialMediaPreviews/FoursquarePreview";
    import WhatsappPreview from "@/views/SocialMedia/Publish/Components/SocialMediaPreviews/WhatsappPreview";
    import social_networks from "@/data/socialNetworks";
    import {fileManagerData} from "@/data/dummyFilesData";
    import {contacts} from "@/data/dummyData";
    import {filter} from "lodash";
    import EventBus from "@/plugins/event-bus";

    export default {
  components: {
    PostBody,
    PostPreview,
    PostSidebar,
    PostLayout
  },
  data: () => ({
    page: "Publish",
    search: '',
    contacts,
    breadcrumbs_items: [
      {
        text: 'Publish All',
        disabled: true,
      },
    ],
    previewTabs: social_networks,
    fileManagerData: fileManagerData,
    activeSocialMedia: 'general',
    selectionAll: false,
    accountGroup: [],
  }),
  computed: {
    socialGroupList:{
      get() {
        return this.$store.state.accounts.socialUsers
      },
      set(newValue) {
        this.$store.state.accounts.socialUsers = newValue
      }
    },
    listContact() {
      let list = this.socialGroupList;
      list = this.socialGroupList.filter((contact) => {
        return (
            contact.name
                .toLowerCase()
                .includes(this.search.toLowerCase())
        );
      });
      return list;
    },
    selectedContacts() {
        return filter(this.socialGroupList, (element) => element.selected);
    },
    unselectedContacts() {
      return filter(this.socialGroupList, (element) => !element.selected);
    },
  },
  methods:{
    checkChanged(){
      let myList = filter(this.socialGroupList, (element) => element.selected);
      EventBus.$emit('user-list-changed', myList);
    },
    selectAll() {
      if (this.unselectedContacts) {
        this.unselectedContacts.forEach((element) => {
          element.selected = true;
        });
      }
    },
    unselectAll() {
      if (this.selectedContacts) {
        this.selectedContacts.forEach((element) => {
          element.selected = false;
        });
      }
    },
    handleSelectAll () {
      if (this.selectionAll) {
        this.selectAll();
      } else {
        this.unselectAll();
      }
      let myList = filter(this.socialGroupList, (element) => element.selected);
      EventBus.$emit('user-list-changed', myList);
    },
  },
  created() {
    this.$store.dispatch('accounts/getAccountGroup')

    this.$store.dispatch("user/getFilesRequest").then((resp) => {
        this.fileManagerData = resp.data.files
    })
  },
  mounted() {
      this.previewTabs[0]['preview'] = FacebookPreview;
      this.previewTabs[1]['preview'] = InstagramPreview;
      this.previewTabs[2]['preview'] = TwitterPreview;
      this.previewTabs[3]['preview'] = LinkedInPreview;
      this.previewTabs[4]['preview'] = PinterestPreview;
      this.previewTabs[5]['preview'] = TelegramPreview;
      this.previewTabs[6]['preview'] = TumblrPreview;
      this.previewTabs[7]['preview'] = RedditPreview;
      this.previewTabs[8]['preview'] = VkPreview;
      this.previewTabs[9]['preview'] = OkPreview;
      this.previewTabs[10]['preview'] = FoursquarePreview;
      this.previewTabs[11]['preview'] = GooglePreview;
      this.previewTabs[12]['preview'] = YoutubePreview;
      this.previewTabs[13]['preview'] = WhatsappPreview;

  },

};

</script>
