<template>
  <button @click="toggleFavorite" id="favIcon">
    <img
      v-if="favStatus"
      class="movieFavIcon"
      src="~/assets/favIcons/favMinus.png"
    />
    <img v-else class="movieFavIcon" src="~/assets/favIcons/favPlus.png" />
  </button>
</template>
<script>
import { mapState } from "vuex";

export default {
  props: ["movieDbId"],
  data() {
    return {
      favStatus: false,
      baseURL: process.env.baseURL,
    };
  },
  computed: {
    ...mapState(["auth"]),
  },
  methods: {
    toggleFavorite() {
      //Change value of the icon to make it full or empty
      this.favStatus = !this.favStatus;

      //Add & remove the favorite
      let userId = this.auth.user.id;
      if (userId) {
        console.log("movieDbId:", this.movieDbId);
        this.$store.dispatch("updateFavorite", [userId, this.movieDbId]);
      } else {
        this.$toast.error(this.$t("pleaseLogoutLogin"));
      }
    },
  },
  created() {
    this.favStatus = this.auth.user?.my_favorites?.includes(this.movieDbId)
      ? true
      : false;
  },
};
</script>
<style scoped>
#favIcon {
  margin: 0;
  padding: 0;
}

#favIcon:hover {
}
.movieFavIcon {
  position: absolute;
  top: 15px;
  right: 15px;
  height: 30px;
}
</style>
