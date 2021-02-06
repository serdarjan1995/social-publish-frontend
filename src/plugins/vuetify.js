// src/plugins/vuetify.js

import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/es5/util/colors";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "@mdi/font/css/materialdesignicons.css";
import FacebookIconRect from '@/components/SocialIcons/Rect/FacebookIconRect.vue';
import FacebookIconRound from '@/components/SocialIcons/Round/FacebookIconRound.vue';
import FoursquareIconRect from '@/components/SocialIcons/Rect/FoursquareIconRect';
import FoursquareIconRound from '@/components/SocialIcons/Round/FoursquareIconRound';
import InstagramIconRect from '@/components/SocialIcons/Rect/InstagramIconRect';
import InstagramIconRound from '@/components/SocialIcons/Round/InstagramIconRound';
import LinkedinIconRect from '@/components/SocialIcons/Rect/LinkedinIconRect';
import LinkedinIconRound from '@/components/SocialIcons/Round/LinkedinIconRound';
import OkIconRect from '@/components/SocialIcons/Rect/OkIconRect';
import OkIconRound from '@/components/SocialIcons/Round/OkIconRound';
import PinterestIconRect from '@/components/SocialIcons/Rect/PinterestIconRect';
import PinterestIconRound from '@/components/SocialIcons/Round/PinterestIconRound';
import RedditIconRect from '@/components/SocialIcons/Rect/RedditIconRect';
import RedditIconRound from '@/components/SocialIcons/Round/RedditIconRound';
import TelegramIconRect from '@/components/SocialIcons/Rect/TelegramIconRect';
import TelegramIconRound from '@/components/SocialIcons/Round/TelegramIconRound';
import TumblrIconRect from '@/components/SocialIcons/Rect/TumblrIconRect';
import TumblrIconRound from '@/components/SocialIcons/Round/TumblrIconRound';
import TwitterIconRect from '@/components/SocialIcons/Rect/TwitterIconRect';
import TwitterIconRound from '@/components/SocialIcons/Round/TwitterIconRound';
import VkIconRect from '@/components/SocialIcons/Rect/VkIconRect';
import VkIconRound from '@/components/SocialIcons/Round/VkIconRound';
import WhatsappIconRect from '@/components/SocialIcons/Rect/WhatsappIconRect';
import WhatsappIconRound from '@/components/SocialIcons/Round/WhatsappIconRound';
import GoogleIconRect from '@/components/SocialIcons/Rect/GoogleIconRect';
import GoogleIconRound from '@/components/SocialIcons/Round/GoogleIconRound';
import YoutubeIconRect from '@/components/SocialIcons/Rect/YoutubeIconRect';
import YoutubeIconRound from '@/components/SocialIcons/Round/YoutubeIconRound';

import store from "@/store";
import "./vuse";
Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    values: {
      facebook_icon_rect: {
        component: FacebookIconRect
      },
      facebook_icon_round: {
        component: FacebookIconRound
      },
      foursquare_icon_rect: {
        component: FoursquareIconRect
      },
      foursquare_icon_round: {
        component: FoursquareIconRound
      },
      instagram_icon_rect: {
        component: InstagramIconRect
      },
      instagram_icon_round: {
        component: InstagramIconRound
      },
      linkedin_icon_rect: {
        component: LinkedinIconRect
      },
      linkedin_icon_round: {
        component: LinkedinIconRound
      },
      ok_icon_rect: {
        component: OkIconRect
      },
      ok_icon_round: {
        component: OkIconRound
      },
      pinterest_icon_rect: {
        component: PinterestIconRect
      },
      pinterest_icon_round: {
        component: PinterestIconRound
      },
      reddit_icon_rect: {
        component: RedditIconRect
      },
      reddit_icon_round: {
        component: RedditIconRound
      },
      telegram_icon_rect: {
        component: TelegramIconRect
      },
      telegram_icon_round: {
        component: TelegramIconRound
      },
      tumblr_icon_rect: {
        component: TumblrIconRect
      },
      tumblr_icon_round: {
        component: TumblrIconRound
      },
      twitter_icon_rect: {
        component: TwitterIconRect
      },
      twitter_icon_round: {
        component: TwitterIconRound
      },
      vk_icon_rect: {
        component: VkIconRect
      },
      vk_icon_round: {
        component: VkIconRound
      },
      whatsapp_icon_rect: {
        component: WhatsappIconRect
      },
      whatsapp_icon_round: {
        component: WhatsappIconRound
      },
      google_icon_rect: {
        component: GoogleIconRect
      },
      google_icon_round: {
        component: GoogleIconRound
      },
      youtube_icon_rect: {
        component: YoutubeIconRect
      },
      youtube_icon_round: {
        component: YoutubeIconRound
      },
    },
  },
  lang: {
    current: store.state.translation.locale,
  },
  rtl: store.state.scheme.theme.rtl,
  theme: {
    dark: store.state.scheme.theme.dark,
    default: "light",
    disable: false,
    options: {
      cspNonce: undefined,
      customProperties: true,
      minifyTheme: undefined,
      themeCache: undefined,
    },
    themes: {
      light: {
        primary: store.state.scheme.theme.primary,
        secondary: store.state.scheme.theme.secondary.base,
        accent: colors.deepPurple.accent2,
        error: colors.red.accent4,
        info: colors.blue.lighten1,
        success: colors.green.accent4,
        warning: colors.amber.darken2,
        background: "#F2F3F7", // #ECF0F3
        neu: {
          darken1: "#DDE4EF", // rgba(210, 218, 230, 0.6)
          lighten1: "#FFFFFF", // rgba(255, 255, 255, 0.6)
        },
        primaryBgText: store.state.scheme.theme.primaryBgText,
        secondaryBgText: store.state.scheme.theme.secondaryBgText,
      },
      dark: {
        primary: store.state.scheme.theme.primary,
        secondary: store.state.scheme.theme.secondary.base,
        accent: colors.deepPurple.accent2,
        error: colors.red.accent4,
        info: colors.blue.lighten1,
        success: colors.green.accent4,
        warning: colors.amber.darken2,
        background: "#292D32",
        neu: {
          darken1: "#1d1f23", // rgba(210, 218, 230, 0.6)
          lighten1: "#3e4247", // rgba(255, 255, 255, 0.6)
        },
        primaryBgText: store.state.scheme.theme.primaryBgText,
        secondaryBgText: store.state.scheme.theme.secondaryBgText,
      },
    },
  },
});
