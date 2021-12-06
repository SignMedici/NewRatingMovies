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
        {{ $t('addMovie') }}
      </div>
      <!-- Form -->
      <v-form method="post" @submit.prevent="getSearchResult()" class="form" >
        <input
          type="title"
          placeholder="Title of the movie"
          v-model="title"
          class="form-control"
          id="title"
        />
        <button type="submit" class="searchBtn">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </button>
      </v-form>
    </v-container>
    <div v-if="this.results !== ''">
      <MovieCard :btnTxt="this.btnTxt" />
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
      btnTxt:'add',
      title: '',
      results: '',
      rules: [
        value => !!value || 'Required.',
      ],
      baseURL: process.env.baseURL,
    }),
    methods:{
      getSearchResult(){
        if (this.title !== ''){
          axios
            .post(
                this.baseURL +
                "/movies/search/" +
                this.title.replace(" ", "+")
            )
            .then(async (response) => {
              await this.$store.commit('SET_RESULT',response.data);
              this.results = "OK";
            });
        }else{
          this.$toast.info(this.$t('enterTitle'));
        }
      }
    },
    computed: {
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
    created() {
      this.$i18n.setLocale(this.$cookiz.get('siteLang'));
    }
  }
</script>
<style scoped>
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
  margin: auto 0 auto 20px;
  color: white;
}
</style>
