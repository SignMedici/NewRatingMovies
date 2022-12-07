<template lang="">
  <div>
    <v-card-actions>
      <v-rating
        dense
        clearable
        half-increments
        :value="rate"
        hover
        size="18"
        @input="rateMovie($event)"
      ></v-rating>
    </v-card-actions>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  props: ["movieDbId"],
  data() {
    return {
      rate: 0,
      baseURL: process.env.baseURL,
    };
  },
  computed: {
    ...mapState(["auth"]),
  },
  methods: {
    async rateMovie(rate) {
      if (this.auth) {
        await this.$store.dispatch("rateMovie", [this.movieDbId, rate]);
      } else {
        this.$toast.error(this.$t("pleaseLogoutLogin"));
      }
    },
  },
  created() {
    let found = false;

    if (this.auth.user.my_rates) {
      for (let i = 0; i < this.auth.user.my_rates.length; i++) {
        if (this.auth.user.my_rates[i].movieDbId === this.movieDbId) {
          this.rate = this.auth.user.my_rates[i].rate / 2;
          found = true;
          break;
        }
      }
      if (!found) {
        this.rate = 0;
      }
    }
  },
};
</script>
<style scoped>
.v-card__actions {
  padding: 0 0 5px 0;
  margin-left: 5px;
}
</style>
