<template>
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide class="mx-2 pa-1" v-for="(i, index) in 8" :key="index">
      <blog-post v-bind="postData" v-if="postData"/>
    </swiper-slide>
  </swiper>
</template>
<script>
import {users} from "@/data/dummyData";
import BlogPost from "@/components/UI/Widgets/Cards/Posts/BlogPost";
import {Swiper, SwiperSlide, directive} from 'vue-awesome-swiper'
import subDays from "date-fns/subDays";

export default {
  components: {BlogPost, Swiper, SwiperSlide},
  directives: {
    swiper: directive
  },
  methods: {
    getTextEn(myText) {
      return this.$i18n.t('' + myText + '')
    }
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      postData: [{
        name: users[13].name,
        avatar: users[13].avatar,
        title: "Salad Recipes",
        thumbnail: "https://picsum.photos/500/300?image=292",
        thumbnailLazy: "https://picsum.photos/10/6?image=292",
        likesCount: 213,
        commentsCount: 123,
        publishedOn: subDays(new Date(), 5),
        showActions: false
      }],
    };
  }
};
</script>
<style lang="scss">
  @import '../../../../../node_modules/swiper/swiper';
</style>