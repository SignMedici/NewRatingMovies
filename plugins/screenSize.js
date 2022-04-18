import Vue from "vue";
import VueScreen from "vue-screen";

Vue.use(VueScreen, {
  phonePortrait: 0,
  phoneLandscape: 520,
  tabletPortrait: 768,
  tabletLandscape: 1024,
  desktop: 1200,
  breakpointsOrder: [
    "phonePortrait",
    "phoneLandscape",
    "tabletPortrait",
    "tabletLandscape",
    "desktop",
  ],
  extend: "bootstrap",
});
