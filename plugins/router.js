export default ({ app }) => {
  app.nuxt.defaultTransition.beforeEnter = async (to, from, next) => {
    let siteLang = app.$cookiz.get("siteLang");
    window.history.replaceState("", "", app.switchLocalePath(siteLang));
  };

  //Optional: wait for locale before scrolling for a smoother transition
  app.router.options.scrollBehaviour = async (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }

    // Make sure the route has changed
    if (to.name !== from.name) {
      await app.i18n.waitForPendingLocaleChange();
    }

    const findEl = async (hash, x) => {
      return (
        document.querySelector(hash) ||
        new Promise((resolve, reject) => {
          if (x > 50) {
            return resolve();
          }
          setTimeout(() => {
            resolve(findEl(hash, ++x || 1));
          }, 100);
        })
      );
    };

    if (to.hash) {
      let el = await findEl(to.hash);
      if ("scrollBehaviour" in document.documentElement.style) {
        return window.scrollTo({ top: el.offsetTop, behaviour: "smooth" });
      } else {
        return window.scrollTo(0, el.offsetTop);
      }
    }

    return savedPosition || { x: 0, y: 0 };
  };
};
