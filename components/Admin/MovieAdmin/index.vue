<template>
  <div v-if="isAdmin === true">
    <div>
      <nuxt-link :to="{ name: 'movie-add', hash: '#logo' }" class="btn btn-success mb-2 me-2">
        Ajouter
      </nuxt-link>
      <nuxt-link :to="{ name: 'movie-metadata',hash:'#logo'}" class="btn btn-success mb-2">
        Modifier metadata
      </nuxt-link>
    </div>
    <table class="table table-striped borderless">
      <thead>
        <tr>
          <th class="text-left">
            Titre
          </th>
          <th class="text-left">
            Vote
          </th>
          <th class="text-left">
            Sortie
          </th>
          <th class="text-left">
            Producteur
          </th>
          <th class="text-left ps-4">
            Résumé
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody v-if="getMovies.length > 0">
        <tr v-for="movie in getMovies" :key="movie._id">
            <td >{{ movie.title }}</td>
            <td>{{ movie.vote_average }}</td>
            <td class="noWrap">{{ movie.release_date }}</td>
            <td class="noWrap">{{ movie.director }}</td>
            <td class="overview"><span class="overviewTxt">{{ movie.overview }}</span></td>
            <td>
              <div class="d-flex align-center">
                <nuxt-link :to="{ name: 'admin-movies-update-id', params: { id: movie._id }, hash: '#logo' }" class="btn">
                  <svg style="width:24px;height:24px;color:#22d157;" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M21.7,13.35L20.7,14.35L18.65,12.3L19.65,11.3C19.86,11.09 20.21,11.09 20.42,11.3L21.7,12.58C21.91,12.79 21.91,13.14 21.7,13.35M12,18.94L18.06,12.88L20.11,14.93L14.06,21H12V18.94M12,14C7.58,14 4,15.79 4,18V20H10V18.11L14,14.11C13.34,14.03 12.67,14 12,14M12,4A4,4 0 0,0 8,8A4,4 0 0,0 12,12A4,4 0 0,0 16,8A4,4 0 0,0 12,4Z" />
                  </svg>
                </nuxt-link>
                <button @click="deleteMovie(movie._id)" class="btn removeUnderline">
                  <svg style="width:24px;height:24px;color:#ad0545" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" />
                  </svg>
                </button>
              </div>
            </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
            <td align="center" colspan="3">Aucun film dans la base de données.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data(){
    return {
      baseURL: process.env.baseURL,
    }
  },
  methods: {
    deleteMovie(id){
      if(confirm("Still OK to delete this movie")){
        axios
            .delete(this.baseURL + "/movies/delete/" + id)
            .then(async(response) => {
              await this.$store.commit('DELETE_MOVIE', id);
              alert ("Movie successfully deleted");
        });
      }
    }
  },
  computed: {
    getMovies() {
      return this.$store.getters.getMovies;
    },
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
};
</script>
<style scoped>
  .overview{
    padding: 15px;
  }
  .overviewTxt{
    display:flex;
    width: 300px;
    height: 225px;
    overflow:auto;
    text-align: justify;
    padding: 0 8px;
  }
  .overviewTxt::-webkit-scrollbar-track
  {
    border-radius: 10px;
    background-color: #F5F5F5;
  }

  .overviewTxt::-webkit-scrollbar
  {
    width: 8px;
  }

  .overviewTxt::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    /* background-color: rgba(82,15,73,1); */
    background-color: #9042b4;
  }
  th{
    padding:15px;
  }
  tr{
    font-family: 'Lato', sans-serif;
    font-weight: 600;
    color: #9042b4;
    font-size: 17px;
  }
  td{
    color: #fff;
    padding:15px;
  }
  .noWrap{
    white-space: nowrap;
  }
</style>
