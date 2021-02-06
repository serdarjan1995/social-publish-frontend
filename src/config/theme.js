import colors from "vuetify/es5/util/colors";

export default {

    primary: {
        base: colors.cyan.darken2,
        darken1: colors.cyan.darken3,
        lighten1: colors.cyan.lighten3,
    },
    secondary: {
        base: colors.orange.lighten1,
        darken1: colors.orange.darken3,
        lighten1: colors.orange.lighten3,
    },
    header: {
        color: "",
        classes: "neu-glow",
    },
    footer: {
        color: "",
        classes: "neu-glow",
    },


    primaryBgText: colors.shades.white,
    secondaryBgText: colors.shades.white,
    dark: JSON.parse(localStorage.getItem('dark-theme')),
    semidark: JSON.parse(localStorage.getItem('semidark-theme')),
    rtl: JSON.parse(localStorage.getItem('rtl-theme')),
};
