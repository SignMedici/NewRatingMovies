<template>
  <div>
    <v-container class="grey lighten-5 mainLogo" id="logo">
      <img src="../../assets/logo_big.png">
    </v-container>
    <v-container class="grey lighten-5 loginForm">
      <nuxt-link :to="{ name: 'admin',hash:'#logo'}" class="btn backBtn">
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
        </svg>
      </nuxt-link>
      <div class="pageLogoTitle">
        <svg style="width:65px;height:65px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M20.84 2.18L16.91 2.96L19.65 6.5L21.62 6.1L20.84 2.18M13.97 3.54L12 3.93L14.75 7.46L16.71 7.07L13.97 3.54M9.07 4.5L7.1 4.91L9.85 8.44L11.81 8.05L9.07 4.5M4.16 5.5L3.18 5.69A2 2 0 0 0 1.61 8.04L2 10L6.9 9.03L4.16 5.5M2 10V20C2 21.11 2.9 22 4 22H20C21.11 22 22 21.11 22 20V10H2Z" />
        </svg><br>
        Modifier un MKV
      </div>
      <v-container data-app>
        <div class="mb-3">
          <span class="pageDesc">Modifier le titre dans les metadata d'un fichier MKV</span>
          <input
            type="path"
            v-model="path"
            class="form-control my-3"
          />
          <input
            type="file"
            class="form-control"
            @change="getSearchResult($event)"
            accept="video/*,.mkv"
          />
        </div>
      </v-container>

    </v-container>
    <div v-if="this.results !== ''">
      <MovieCard :btnTxt="this.btnTxt" :fileToModify="this.file" :filePath="this.path" />
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import { mapState } from 'vuex';
  import axios from "axios";
  import MovieCard from '@/components/MovieCard/index';

  export default {
    components:{
        MovieCard
    },
    data: () => ({
      path: '/mnt/Seagate-4To/__Videos/Films',
      btnTxt:'select',
      search: '',
      file: '',
      results: '',
      rules: [
        value => !!value || 'Required.',
      ],
      baseURL: process.env.baseURL,
    }),
    methods:{
      getSearchResult(event){
        this.file = event.target.files[0];
        let path = this.file.value;
        this.search = this.file.name;
        this.search = this.search.substring(0, this.search.indexOf('.')); //removes the extention of the filename

        // if the filename starts with year, remove it
        let theYear = this.search.substring(0, 4);
        if (!isNaN(parseInt(theYear))){
          this.search = this.search.replace(theYear + " - ", "");
        }

        // remove everything after a dash
        if (this.search.indexOf('-') !== -1){
          this.search = this.search.substring(0, this.search.indexOf('-'));
        }

        //get results from api
        axios
          .post(
              this.baseURL +
              "/movies/search/" +
              this.search.replaceAll(" ", "+")
          )
          .then(async (response) => {
            await this.$store.commit('SET_RESULT',response.data);
            this.results = "OK";
          });
      }
    },

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
  color: white;
}
.loginForm{
  width: 600px;
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
  display:flex;
  margin-top: 20px;
}
.searchBtn{
  margin-left: 20px;
  color: white;
}
.pageDesc{
  color:white;
}
</style>
