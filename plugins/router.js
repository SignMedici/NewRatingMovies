export default ({ app, context }, inject) => {
  app.nuxt.defaultTransition.beforeEnter = () => {
    let siteLang = "";

    if (app.$cookiz.get("siteLang")) {
      siteLang = app.$cookiz.get("siteLang");
    } else {
      siteLang = "fr";
    }
    app.i18n.locale = siteLang;
    app.i18n.finalizePendingLocaleChange();
  };

  // Optional: wait for locale before scrolling for a smoother transition
  app.router.options.scrollBehavior = async (to, from, savedPosition) => {
    // Make sure the route has changed
    if (to.name !== from.name) {
      await app.i18n.waitForPendingLocaleChange();
    }
    return savedPosition || { x: 0, y: 0 };
  };
};
