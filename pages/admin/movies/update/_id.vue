<template>
  <div v-if="isAdmin === true">
    <UIBigLogo />
    <v-container class="grey lighten-5 loginForm">
      <!-- Back button -->
      <UIBackBtn :path="'admin'" />
      <!-- Page logo and title -->
      <div class="pageLogoTitle">
        <svg style="width:65px;height:65px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M20.84 2.18L16.91 2.96L19.65 6.5L21.62 6.1L20.84 2.18M13.97 3.54L12 3.93L14.75 7.46L16.71 7.07L13.97 3.54M9.07 4.5L7.1 4.91L9.85 8.44L11.81 8.05L9.07 4.5M4.16 5.5L3.18 5.69A2 2 0 0 0 1.61 8.04L2 10L6.9 9.03L4.16 5.5M2 10V20C2 21.11 2.9 22 4 22H20C21.11 22 22 21.11 22 20V10H2Z" />
        </svg><br>
        {{ $t('modifyMovie') }}
      </div>
      <!-- Form -->
      <form method="post" @submit.prevent="updateMovie()">
        <div>
          <label>{{ $t('title') }}</label>
          <input type="text" class="form-control" v-model="title">
        </div>
        <div class="my-3">
          <label>{{ $t('releaseDate') }} <small>(Format: YYYY-MM-DD)</small></label>
          <input type="text" class="form-control" v-model="release_date">
        </div>
        <div>
          <label>Genre</label>
          <input type="text" class="form-control" v-model="strGenres">
        </div>
        <div class="my-3">
          <label>{{ $t('vote') }}</label>
          <input type="number" class="form-control" v-model="vote_average" step=0.1 min="0" max="10">
        </div>
        <div>
          <label>{{ $t('director') }}</label>
          <input type="text" class="form-control" v-model="director">
        </div>
        <div class="mt-3">
          <label>{{ $t('director') }}</label>
          <textarea class="form-control" v-model="overview" rows="4" />
        </div>
        <button type="submit" class="btn confirmButton mt-5">{{ $t('confirm') }}</button>
      </form>
    </v-container>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data: () => ({
    title: '',
    vote_average: '',
    release_date: '',
    strGenres: '',
    poster_path: '',
    overview: '',
    director: '',
    rules: [
        value => !!value || 'Required.',
    ],
    movie: [],
    baseURL: process.env.baseURL,
  }),
  methods:{
    getMovie(){
        axios
        .get(this.baseURL + this.$route.params.id)
        .then(async (response) => {
          this.movie = response.data;
        });
    },
    updateMovie(){
       axios
        .patch(this.baseURL + "/movies" + this.$route.params.id, {
          title: this.title,
          vote_average: this.vote_average,
          release_date: this.release_date,
          director: this.director,
          overview: this.overview,
          strGenres: this.strGenres,
        })
        .then(async (response) => {
          this.$store.commit('UPDATE_MOVIE', response.data);
          this.$router.push('/admin/movies');
        });
    }
  },
  computed:{
    isAdmin(){
      let user = this.$store.getters.getUserInfo;
      if(user){
        if(user.isAdmin)
          return this.$store.getters.getUserInfo.isAdmin;
        else{
          this.$router.push("/");
        }
      }
      else{
        this.$router.push("/");
      }
    }
  },
  created(){
    this.$i18n.setLocale(this.$cookiz.get('siteLang'));

    let movieToUpdate = this.$store.getters.getMovieById(this.$route.params.id);

    if(movieToUpdate){
      this.title = movieToUpdate.title;
      this.vote_average = movieToUpdate.vote_average;
      this.strGenres = movieToUpdate.strGenres;
      this.release_date = movieToUpdate.release_date;
      this.overview = movieToUpdate.overview;
      this.director = movieToUpdate.director;
    }
    else{
      this.$router.push("/");
    }

  }
}
</script>
<style scoped>
.backBtn{
  padding: 0;
  color: #A52199;

}
.loginForm{
  width: 700px;
  padding: 30px;
  background-color: #ffffff20;
  border-radius: 14px;
  margin-top: 20px;
}
.pageLogoTitle{
  color: #ffffff79;
  font-family: 'Ubuntu', sans-serif;
  text-align: center;
  font-weight: 500;
  font-size: 50px;
}
.form{
  display:block;
  margin-top: 20px;
}
.confirmButton{
  color: #fff;
  background-color: #A52199;
  font-family: 'Lato', sans-serif;
  margin-top: 10px;
  font-weight: 500;
  font-size: 17px;
  width: 100%
}
label{
  color:white;
}
</style>
