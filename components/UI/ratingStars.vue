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
        class="ms-2"
        color="warning"
        background-color="warning lighten-1"
        @input="rateMovie($event)"
      ></v-rating>
    </v-card-actions>
  </div>
</template>
<script>
import axios from "axios";

export default {
  props:["movieDbId","myRates"],
  data(){
    return{
      rate:'',
      baseURL: process.env.baseURL,
    }
  },
  methods: {
    rateMovie(rate) {
      let userId = this.$store.getters.getUserInfo.id;

      if(userId){
        axios
        .patch(this.baseURL + "/users/" + userId + "/" + this.movieDbId + "/" + rate)
        .then(async (response) => {
          await this.$store.commit("RATE_MOVIE", response.data);
          if(rate == 0){
            this.$toast.success(this.$t('rateDeleted'));
          }
          else{
            this.$toast.success(this.$t('rateDone'));
          }
        });
      }
      else{
        this.$toast.error(this.$t('pleaseLogoutLogin'));
      }
    },
  },
  created(){
    let found = false;

    if(this.myRates){
      for(let i = 0; i < this.myRates.length; i++){
        if (this.myRates[i].movieDbId === this.movieDbId){
          this.rate = this.myRates[i].rate / 2;
          found = true;
          break
        }
      }
      if(!found){
        this.rate = 0;
      }
    }
  }
}
</script>
<style lang="">

</style>
