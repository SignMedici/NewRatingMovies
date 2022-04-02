export default ({ app }) => {
  app.nuxt.defaultTransition.beforeEnter = async () => {
    // set siteLanguage
    let siteLang = "";

    if (app.$cookiz.get("siteLang")) {
      console.log("plugins - cookie:", app.$cookiz.get("siteLang"));
      siteLang = app.$cookiz.get("siteLang");
    } else {
      console.log("plugins - default: fr");
      siteLang = "fr";
    }

    app.i18n.locale = siteLang;
    app.i18n.setLocale(siteLang);
    await app.i18n.finalizePendingLocaleChange();
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
