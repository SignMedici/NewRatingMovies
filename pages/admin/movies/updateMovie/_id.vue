<template>
  <div>
    <v-container class="grey lighten-5 mainLogo" id="logo">
      <img src="../../../../assets/logo_big.png">
    </v-container>
    <v-container class="grey lighten-5 loginForm">
      <!-- Back button -->
      <UIBackBtn :path="'admin'" />
      <!-- Page logo and title -->
      <div class="pageLogoTitle">
        <svg style="width:65px;height:65px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M20.84 2.18L16.91 2.96L19.65 6.5L21.62 6.1L20.84 2.18M13.97 3.54L12 3.93L14.75 7.46L16.71 7.07L13.97 3.54M9.07 4.5L7.1 4.91L9.85 8.44L11.81 8.05L9.07 4.5M4.16 5.5L3.18 5.69A2 2 0 0 0 1.61 8.04L2 10L6.9 9.03L4.16 5.5M2 10V20C2 21.11 2.9 22 4 22H20C21.11 22 22 21.11 22 20V10H2Z" />
        </svg><br>
        Modifier mon profil
      </div>
      <!-- Form -->
      <form method="post" @submit.prevent="updateMovie()">
        <div>
          <label>Titre</label>
          <input type="text" class="form-control" v-model="title">
        </div>
        <div class="my-3">
          <label>Date de sortie</label>
          <input type="text" class="form-control" v-model="release_date">
        </div>
        <div>
          <label>Vote</label>
          <input type="number" class="form-control" v-model="vote_average" step=0.1 min="0" max="10">
        </div>
        <div class="my-3">
          <label>Producteur</label>
          <input type="text" class="form-control" v-model="director">
        </div>
        <div>
          <label>Résumé</label>
          <textarea class="form-control" v-model="overview" rows="4" />
        </div>
        <button type="submit" class="btn confirmButton mt-5">Valider</button>
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
          overview: this.overview
        })
        .then(async (response) => {
          this.$store.commit('UPDATE_MOVIE', response.data);
        });
    }
  },
  created(){
      let movieToUpdate = this.$store.getters.getMovieById(this.$route.params.id);
      this.title = movieToUpdate.title;
      this.vote_average = movieToUpdate.vote_average;
      this.release_date = movieToUpdate.release_date;
      this.overview = movieToUpdate.overview;
      this.director = movieToUpdate.director;
  }
}
</script>
<style scoped>
.mainLogo{
    margin: 10px 0 25px 0;
    padding: 0;
    text-align: center;
}
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
