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
              class="flex-shrink-0 vuse-sidebar-scrollable mr-3 ml-2"
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
            :preview-tabs="getPreviewTabs"
            :file-manager-data="fileManagerData"
            :tabsActive="false"
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
  data() {
    return {
      page: "Post",
      slug: this.$route.params.any,
      search: '',
      contacts,
      previewTabs: social_networks,
      fileManagerData: fileManagerData,
      activeSocialMediaItem: 'general',
      selectionAll: false,
      accountGroup: [],
    }
  },
  props: ["any"],
  computed: {
    socialGroupList: {
      get() {
        return this.$store.state.accounts.socialUsers.filter((items) => {
          if (items.social_name.toLowerCase() === this.slug.toLowerCase()) {
            return items
          }
        })
      },
      set(newValue) {
        this.$store.state.accounts.socialUsers = newValue
      }
    },
    activeSocialMedia() {
      return this.activeSocialMediaItem
    },
    getPreviewTabs() {
      return this.previewTabs
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
  watch: {
    '$route.path': function () {
      this.slug = this.$route.params.any
      this.activeSocialMediaItem = this.$route.params.any
      this.changePreview()
      this.$store.dispatch('accounts/getAccountGroup')
      EventBus.$emit('social-changed', this.$route.params.any);
    }
  },
  methods: {
    changePreview(){
      switch (this.slug) {
        case 'facebook':
          this.previewTabs[0]['preview'] = FacebookPreview;
          break;
        case 'instagram':
          this.previewTabs[0]['preview'] = InstagramPreview;
          break;
        case 'twitter':
          this.previewTabs[0]['preview'] = TwitterPreview;
          break;
        case 'linkedin':
          this.previewTabs[0]['preview'] = LinkedInPreview;
          break;
        case 'pinterest':
          this.previewTabs[0]['preview'] = PinterestPreview;
          break;
        case 'telegram':
          this.previewTabs[0]['preview'] = TelegramPreview;
          break;
        case 'tumblr':
          this.previewTabs[0]['preview'] = TumblrPreview;
          break;
        case 'reddit':
          this.previewTabs[0]['preview'] = RedditPreview;
          break;
        case 'vk':
          this.previewTabs[0]['preview'] = VkPreview;
          break;
        case 'ok':
          this.previewTabs[0]['preview'] = OkPreview;
          break;
        case 'foursquare':
          this.previewTabs[0]['preview'] = FoursquarePreview;
          break;
        case 'google':
          this.previewTabs[0]['preview'] = GooglePreview;
          break;
        case 'youtube':
          this.previewTabs[0]['preview'] = YoutubePreview;
          break;
        case 'whatsapp':
          this.previewTabs[0]['preview'] = WhatsappPreview;
          break;
      }
      let newItem = this.previewTabs[0]
      this.previewTabs = []
      this.previewTabs.push(newItem)
    },
    checkChanged() {
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
    handleSelectAll() {
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

    this.$store.dispatch("user/getFilesRequest").then((resp) => {
      this.fileManagerData = resp.data.files
    })

    this.activeSocialMediaItem = this.slug
    this.changePreview()
    this.$store.dispatch('accounts/getAccountGroup')
  },
};
</script>
