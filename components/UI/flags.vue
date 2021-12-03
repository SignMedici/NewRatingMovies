<template>
  <div class="flags">
    <nuxt-link
      v-for="locale in availableLocales"
      :key="locale.code"
      :to="switchLocalePath(locale.code)"
      class = "btn flag"
    >
    <img :src="require(`~/assets/flags/${locale.code}.png`)" />
    </nuxt-link>
  </div>
</template>

<script>
export default {
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale);
    },
  },
};
</script>

<style scoped>
.flags{
  display:flex;
  float:right;
  margin: 3px 20px 0 0;
}
img{
  height: 23px;
  width: auto;
}
</style>
