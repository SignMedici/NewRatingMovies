<template>
  <div v-if="isAuthenticated">
    <UIBigLogo />
    <v-container class="grey lighten-5 loginForm">
      <!-- Back button -->
      <UIBackBtn :path="'myprofile'" />
      <!-- Page logo and title -->
      <div class="pageLogoTitle">
        <svg style="width:65px;height:65px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M20.84 2.18L16.91 2.96L19.65 6.5L21.62 6.1L20.84 2.18M13.97 3.54L12 3.93L14.75 7.46L16.71 7.07L13.97 3.54M9.07 4.5L7.1 4.91L9.85 8.44L11.81 8.05L9.07 4.5M4.16 5.5L3.18 5.69A2 2 0 0 0 1.61 8.04L2 10L6.9 9.03L4.16 5.5M2 10V20C2 21.11 2.9 22 4 22H20C21.11 22 22 21.11 22 20V10H2Z" />
        </svg><br>
        {{ $t('modifyMyProfile') }}
      </div>
      <!-- Form -->
      <v-container data-app>
        <form @submit.prevent="updateUserLoaded">
            <div class="mb-3">
              <label for="nickname" class="form-label">{{ $t('nickname') }}</label>
              <input type="text" class="form-control" name="nickname" aria-describedby="nickname" v-model="nickname">
            </div>
            <div>
              <label for="email" class="form-label">{{ $t('emailAddress') }}</label>
            </div>
            <div :class="['input-group', isEmailValid()]">
              <input type="email" class="form-control" id="email" aria-describedby="emailHelp" v-model="email">
            </div>
            <div class="my-3">
              <label for="myLanguage" class="form-label">{{ $t('language')}}</label>
              <select  class="form-select langField" name="myLanguage" aria-label="Prefered language" v-model="language" required>
                <option v-for="locale in this.$i18n.locales" v-bind:value="locale.code">{{ $t(locale.name) }}</option>
              </select>
            </div>
            <button type="submit" class="btn confirmButton">{{ $t('confirm') }}</button>
        </form>
      </v-container>
    </v-container>
  </div>
</template>

<script>
export default {
    data() {
      return {
        baseURL: process.env.baseURL,
        nickname: "",
        email: "",
        language:"",
        reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
      }
    },
    created(){
        let userLoadedUpdate = this.$store.getters.getUserInfo;
        this.nickname = userLoadedUpdate.nickname;
        this.email = userLoadedUpdate.email;
        this.language = userLoadedUpdate.language;
        this.$i18n.setLocale(this.$cookiz.get('siteLang'));
    },
    computed: {
        isAuthenticated() {
          return this.$store.getters.isAuthenticated; // it check if user isAuthenticated
        },
    },
    methods: {
        isEmailValid: function() {
             return (this.email == "")? "" : (this.reg.test(this.email)) ? 'has-success' : 'has-error';
        },
        updateUserLoaded(){
          this.$axios
          .patch(this.baseURL + "/users/" + this.$route.params.id, {
              nickname: this.nickname,
              email: this.email,
              language: this.language
          })
          .then((response) => {
            this.$store.commit('UPDATE_USER', response.data);
            this.$store.commit('UPDATE_LOGGED_USER', response.data);
            this.$store.commit('SET_LANG', this.language);
            this.$cookiz.set('siteLang', this.language);
            this.$toast.success(this.$t('updateDone'));
            this.$router.push('/myprofile');
          })
          .catch((err) => {
            this.$toast.error(err);
          });
        }
    }
}
</script>

<style scoped>
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
  display:flex;
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
