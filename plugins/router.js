export default ({ app }) => {
  app.nuxt.defaultTransition.beforeEnter = async (to, from, next) => {
    let siteLang = app.$cookiz.get("siteLang");
    window.history.replaceState("", "", app.switchLocalePath(siteLang));
  };

  //Optional: wait for locale before scrolling for a smoother transition
  app.router.options.scrollBehavior = async (to, from, savedPosition) => {
    // Make sure the route has changed
    if (to.name !== from.name) {
      await app.i18n.waitForPendingLocaleChange();
    }
    return savedPosition || { x: 0, y: 0 };
  };
};
