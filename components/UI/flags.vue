<template>
  <div class="flags">
    <nuxt-link
      v-for="locale in availableLocales"
      :key="locale.code"
      :to="switchLocalePath(locale.code)"
      class="btn flag"
    >
      <img
        :src="require(`~/assets/flags/${locale.code}.png`)"
        @click="selectLang(locale.code)"
      />
    </nuxt-link>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["auth"]),
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale);
    },
  },
  methods: {
    async selectLang(langCode) {
      // Save new site language
      this.$i18n.locale = langCode;
      this.$i18n.setLocale(langCode);

      // Set the value to the cookie 'siteLang'
      this.$cookiz.set("siteLang", langCode);

      // Update the language of the user in DB
      if (this.auth.user) {
        await this.$store.dispatch("usersStore/updateUser", {
          id: this.auth.user.id,
          language: langCode,
        });

        // and the profile in store
        this.$store.commit("UPDATE_LOGGED_USER", {
          id: this.auth.user.id,
          language: langCode,
        });
      }
    },
  },
};
</script>

<style scoped>
.flags {
  display: flex;
  float: right;
  margin: 3px 20px 0 0;
}
img {
  height: 23px;
  width: auto;
}
</style>
