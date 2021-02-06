<template>
  <v-sheet class="neu-glow-inset">
    <v-toolbar flat class="transparent">
      <v-toolbar-title
          v-if="!(this.$vuetify.breakpoint.smAndDown && showSearch)"
      >All Posts
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-slide-y-transition>
        <v-btn
            class="box-glow mx-2"
            fab
            x-small
            dark
            @click="handleSearchVisibility()"
            v-if="!isSearchVisible"
        >
          <v-icon>search</v-icon>
        </v-btn>
        <v-text-field
            v-model="search"
            label="Search Post"
            solo
            clear-icon="clear_all"
            :append-icon="$vuetify.breakpoint.smAndDown ? 'close' : ''"
            prepend-inner-icon="search"
            class="input-width-3x mr-3"
            dense
            @click:append="handleSearchVisibility()"
            hide-details
            clearable
            v-else
        ></v-text-field>
      </v-slide-y-transition>
    </v-toolbar>
    <div v-if="posts.length > 0" class="ma-2">
      <v-fade-transition class="row pa-4" group tag="div">
        <template v-for="(post, i) in posts">
          <v-col :key="`${post.caption}-horizcardlist-${i}`" cols="12" md="3">
            <v-card
                class="neu-glow"
            >
              <v-list-item class="px-0 ma-0">
                <v-list-item-avatar>
                  <v-icon>
                    {{post.icon}}
                  </v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    <a :href="post.account_url" target="_blank" class="text-decoration-none">
                      {{post.account_name}}
                    </a>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-img
                  v-if="post.media!=null"
                  height="200"
                  :src="JSON.parse(post.media)[0].url"
              ></v-img>
              <v-img
                  v-else
                  src="https://static.thenounproject.com/png/340719-200.png"
                  height="200"
              ></v-img>
              <v-card-text>
                {{post.description}}
                <div class="mt-2">
                  <v-icon class="iconClass">mdi-thumb-up</v-icon>
                  <span class="ml-2">{{post.likeCount}}</span>
                  <v-icon class="ml-2 iconClass">mdi-comment</v-icon>
                  <span class="ml-2">{{post.commentCount}}</span>
                  <span class="ml-2 float-right">{{post.shareCount}}</span>
                  <v-icon class="ml-2 iconClass float-right" >mdi-eye</v-icon>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </template>
      </v-fade-transition>
    </div>
  </v-sheet>
</template>

<script>

export default {
  data() {
    return {
      search: null,
      showSearch: false,
    };
  },
  computed: {
    isSearchVisible: {
      get() {
        return !this.$vuetify.breakpoint.smAndDown || this.showSearch;
      },
      set(val) {
        this.showSearch = val;
      },
    },
    posts: {
      get() {
        let myStateVar = this.$store.state.posts.postList
        if(this.search!=null){
          let myNewVar = myStateVar.filter((item) => {
            return item.description.toLowerCase().includes(this.search.toLowerCase()) || item.account_name.toLowerCase().includes(this.search.toLowerCase())
          });
          return myNewVar
        }
        else{
          return myStateVar
        }
      },
      set(newValue) {
        this.$store.state.posts.postList = newValue
      }
    }
  },
  methods: {
    handleSearchVisibility() {
      this.showSearch = !this.showSearch;
    },
  },
  created() {
    this.$store.dispatch('posts/getPostList')
  }
};
</script>
<style scoped>
.iconClass{
  font-size:1rem !important;
  line-height: 22px !important;
}
</style>
