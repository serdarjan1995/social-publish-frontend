<template>
  <v-row>
    <v-col
        cols="12"
        sm="6"
        lg="3"
        v-for="(item, i) in basicStatisticArr"
        :key="`${item.title}-basicstats-${i}`"
    >
      <basic-statistic v-bind="item">
        <v-icon
            small
            v-bind="item.info.icon.style"
            v-text="item.info.icon.value"
        />
        <span
            class="ml-2"
            v-html="item.info.text.value"
            v-bind="item.info.text.style"
        ></span>
        <div v-if="item.info.text.subtext !== undefined">
          {{ item.info.text.subtext }}
        </div>
      </basic-statistic>
    </v-col>
  </v-row>
</template>
<script>
import BasicStatistic from "@/components/UI/Widgets/Cards/Statistics/BasicStatistic";
import EventBus from '@/plugins/event-bus.js';

export default {
  data: () => ({
      basicStatisticArr: [
          {
              title: "Takipçiler",
              heading: "60K",
              avatar: {
                  icon: "mdi-account-group",
                  style: {
                      color: "blue",
                  },
                  avatarStyle: { class: "neu-glow", size: 50 },
              },
              info: {
                  icon: {
                      value: "mdi-account-multiple-plus",
                      style: {
                          color: "teal accent-4",
                      },
                  },
                  text: {
                      value: ` 477`,
                      style: {
                          class: "teal--text text--accent-4",
                      },
                      subtext: "Son 1 hafta içinde",
                  },
              },
          },
          {
              title: "Gönderiler",
              heading: "314",
              avatar: {
                  icon: "mdi-post",
                  style: {
                      color: "amber darken-3",
                  },
                  avatarStyle: { class: "neu-glow", size: 50 },
              },
              info: {
                  icon: {
                      value: "mdi-plus",
                      style: {
                          color: "teal accent-4",
                      },
                  },
                  text: {
                      value: `23`,
                      style: {
                          class: "teal--text text--accent-4",
                      },
                      subtext: "Son 1 hafta içinde",
                  },
              },
          },
          {
              title: "Toplam beğenme",
              heading: "850K",
              avatar: {
                  icon: "mdi-thumbs-up-down",
                  style: {
                      color: "pink accent-3",
                  },
                  avatarStyle: { class: "neu-glow", size: 50 },
              },
              info: {
                  icon: {
                      value: "mdi-heart-plus",
                      style: {
                          color: "teal accent-4",
                      },
                  },
                  text: {
                      value: `45.4K`,
                      style: {
                          class: "teal--text text--accent-4",
                      },
                      subtext: "Son 1 hafta içinde",
                  },
              },
          },
          {
              title: "Toplam yorum",
              heading: "5.6K",
              avatar: {
                  icon: "mdi-comment-processing",
                  style: {
                      color: "cyan",
                  },
                  avatarStyle: { class: "neu-glow", size: 50 },
              },
              info: {
                  icon: {
                      value: "mdi-comment-plus",
                      style: {
                          color: "teal accent-4",
                      },
                  },
                  text: {
                      value: `475`,
                      style: {
                          class: "teal--text text--accent-4",
                      },
                      subtext: "Since last month",
                  },
              },
          },
      ],
  }),
  components: { BasicStatistic },
  beforeDestroy() {
      this.basicStatisticArr = null;
      delete this.basicStatisticArr;
  },
  methods: {
      fetch_data(social_network) {
          switch (social_network) {
              case 1:
                  this.basicStatisticArr[0].heading = '60K';
                  this.basicStatisticArr[0].info.icon.value = 'mdi-account-multiple-plus';
                  this.basicStatisticArr[0].info.icon.style.color = 'teal accent-4';
                  this.basicStatisticArr[0].info.text.value = '477';

                  this.basicStatisticArr[1].heading = '314';
                  this.basicStatisticArr[1].info.icon.value = 'mdi-plus';
                  this.basicStatisticArr[1].info.icon.style.color = 'teal accent-4';
                  this.basicStatisticArr[1].info.text.value = '23';

                  this.basicStatisticArr[2].heading = '850K';
                  this.basicStatisticArr[2].info.icon.value = 'mdi-heart-plus';
                  this.basicStatisticArr[2].info.icon.style.color = 'teal accent-4';
                  this.basicStatisticArr[2].info.text.value = '45.4K';

                  this.basicStatisticArr[3].heading = '850K';
                  this.basicStatisticArr[3].info.icon.value = 'mdi-comment-plus';
                  this.basicStatisticArr[3].info.icon.style.color = 'teal accent-4';
                  this.basicStatisticArr[3].info.text.value = '45.4K';
                  break;
              case 2:
                  this.basicStatisticArr[0].heading = '1.7M';
                  this.basicStatisticArr[0].info.icon.value = 'mdi-account-multiple-minus';
                  this.basicStatisticArr[0].info.icon.style.color = 'red accent-4';
                  this.basicStatisticArr[0].info.text.value = '311';

                  this.basicStatisticArr[1].heading = '68K';
                  this.basicStatisticArr[1].info.icon.value = 'mdi-equal';
                  this.basicStatisticArr[1].info.icon.style.color = 'orange accent-4';
                  this.basicStatisticArr[1].info.text.value = '0';

                  this.basicStatisticArr[2].heading = '2.5M';
                  this.basicStatisticArr[2].info.icon.value = 'mdi-heart-pulse';
                  this.basicStatisticArr[2].info.icon.style.color = 'teal accent-4';
                  this.basicStatisticArr[2].info.text.value = '0';

                  this.basicStatisticArr[3].heading = '1.2M';
                  this.basicStatisticArr[3].info.icon.value = 'mdi-comment-plus';
                  this.basicStatisticArr[3].info.icon.style.color = 'teal accent-4';
                  this.basicStatisticArr[3].info.text.value = '41';
                  break;
              case 3:
                  this.basicStatisticArr[0].heading = '56';
                  this.basicStatisticArr[0].info.icon.value = 'mdi-account-multiple-plus';
                  this.basicStatisticArr[0].info.icon.style.color = 'teal accent-4';
                  this.basicStatisticArr[0].info.text.value = '11';

                  this.basicStatisticArr[1].heading = '7';
                  this.basicStatisticArr[1].info.icon.value = 'mdi-plus';
                  this.basicStatisticArr[1].info.icon.style.color = 'teal accent-4';
                  this.basicStatisticArr[1].info.text.value = '2';

                  this.basicStatisticArr[2].heading = '256';
                  this.basicStatisticArr[2].info.icon.value = 'mdi-heart-pulse';
                  this.basicStatisticArr[2].info.icon.style.color = 'teal accent-4';
                  this.basicStatisticArr[2].info.text.value = '41';

                  this.basicStatisticArr[3].heading = '78';
                  this.basicStatisticArr[3].info.icon.value = 'mdi-comment-plus';
                  this.basicStatisticArr[3].info.icon.style.color = 'teal accent-4';
                  this.basicStatisticArr[3].info.text.value = '41';
                  break;
              case 4:
                  this.basicStatisticArr[0].heading = '1.7M';
                  this.basicStatisticArr[0].info.icon.value = 'mdi-account-multiple-minus';
                  this.basicStatisticArr[0].info.icon.style.color = 'red accent-4';
                  this.basicStatisticArr[0].info.text.value = '311';

                  this.basicStatisticArr[1].heading = '68K';
                  this.basicStatisticArr[1].info.icon.value = 'mdi-equal';
                  this.basicStatisticArr[1].info.icon.style.color = 'orange accent-4';
                  this.basicStatisticArr[1].info.text.value = '0';

                  this.basicStatisticArr[2].heading = '2.5M';
                  this.basicStatisticArr[2].info.icon.value = 'mdi-heart-pulse';
                  this.basicStatisticArr[2].info.icon.style.color = 'teal accent-4';
                  this.basicStatisticArr[2].info.text.value = '0';

                  this.basicStatisticArr[3].heading = '1.2M';
                  this.basicStatisticArr[3].info.icon.value = 'mdi-comment-plus';
                  this.basicStatisticArr[3].info.icon.style.color = 'teal accent-4';
                  this.basicStatisticArr[3].info.text.value = '41';
                  break;
          }
      },
  },
  mounted(){
      EventBus.$on('basic-stat-change-social-network', social_network => {
          this.fetch_data(social_network);
      });
  }
};


</script>