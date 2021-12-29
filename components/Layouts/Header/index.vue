<template>
  <div>
    <v-card class="overflow-hidden">
      <v-app-bar
        absolute
        color="#6A76AB"
        dark
        shrink-on-scroll
        prominent
        :src="bannerURL"
        fade-img-on-scroll
        scroll-target="#scrolling-techniques-3"
      >
        <v-spacer></v-spacer>
        <!-- Favorite icon -->
        <v-btn icon v-if="isAuthenticated">
          <nuxt-link class="nav-link active" aria-current="page" :to="{name: `user-favorites___${locale}`,hash: '#logo'}" >
            <img class="HeaderFavIcon" src="~/assets/favIcons/favFull.png">
          </nuxt-link>
        </v-btn>

        <UIFlags />

        <template v-slot:extension v-if="!isAuthenticated">
          <v-tabs align-with-title class="navTab">
            <v-tab>
              <nuxt-link class="nav-link active" aria-current="page" to="/">
                <svg style="width:18px;height:18px;margin-bottom:5px" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12,3L20,9V21H15V14H9V21H4V9L12,3Z" />
                </svg>
                {{ $t('home') }}
              </nuxt-link>
            </v-tab>
            <v-tab>
              <nuxt-link class="nav-link active" aria-current="page" to="/auth/login">
                {{ $t('login') }}
              </nuxt-link>
            </v-tab>
            <v-tab>
              <nuxt-link class="nav-link active" aria-current="page" to="/auth/register">
                {{ $t('register') }}
              </nuxt-link>
            </v-tab>
          </v-tabs>
        </template>
        <template v-slot:extension v-else>
          <v-tabs align-with-title class="navTab" id="navTab">
            <v-tab>
              <nuxt-link class="nav-link active" aria-current="page" to="/">
                <svg style="width:18px;height:18px;margin-bottom:5px" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12,3L20,9V21H15V14H9V21H4V9L12,3Z" />
                </svg>
                  {{ $t('home') }}
              </nuxt-link>
            </v-tab>
            <v-tab>
              <nuxt-link class="nav-link active" aria-current="page" to="/myprofile">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 18 18">
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </svg>
                {{ $t('myProfile') }}
              </nuxt-link>
            </v-tab>
            <v-tab v-if="getUserInfo.isAdmin == true">
              <nuxt-link class="nav-link active" aria-current="page" to="/admin">
                <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 1L21 5V11C21 16.55 17.16 21.74 12 23C6.84 21.74 3 16.55 3 11V5L12 1M16 14H8V15.5C8 15.77 8.19 15.96 8.47 16L8.57 16H15.43C15.74 16 15.95 15.84 16 15.59L16 15.5V14M17 8L17 8L14.33 10.67L12 8.34L9.67 10.67L7 8L7 8L8 13H16L17 8Z" />
              </svg>
                {{ $t("administration") }}
              </nuxt-link>
            </v-tab>
            <v-tab class="nav-item logout" @click="logout">
              <nuxt-link class="nav-link active" aria-current="page" to="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 18 18">
                  <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                  <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                </svg>
                {{ $t('logout') }}
              </nuxt-link>
            </v-tab>
          </v-tabs>
        </template>
      </v-app-bar>
      <v-sheet
        id="scrolling-techniques-3"
        class="overflow-y-auto"
        max-height="600"
      >
        <v-container style="height:224px;"></v-container>
      </v-sheet>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bannerURL: process.env.BANNER_PIC_URL,
      locale: ''
    }
  },
  methods: {
    async logout() {
      if(this.$cookiz.get('siteLang')){
        this.$cookiz.remove('siteLang');
      }
      await this.$auth.logout(); // this method will logout the user and make token to false on the local storage of the user browser
    },
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated; // check if there is an authenticated user
    },
    getUserInfo() {
      return this.$store.getters.getUserInfo;
    },
  },
  created(){
    if(this.$cookiz.get('siteLang')){
      this.locale = this.$cookiz.get('siteLang')
    }
    else{
      this.locale = 'fr'
    }
    this.$i18n.setLocale(this.locale);
  }
};
</script>

<style scoped>
.nav-link{
  color: #ffffff;
  font-family: 'Ubuntu', sans-serif;
  font-weight: 600;
}
.nav-link:focus{
  color: #9042b4;
  font-family: 'Ubuntu', sans-serif;
  font-weight: 600;
}
.v-tabs-slider {
    background-color: #9042b4;
    height: 100%;
    width: 100%;
}
.v-tab:hover{
  background-color: #9042b4;
}
.nav-link:hover{
  color: #ffffff;
  font-family: 'Ubuntu', sans-serif;
  font-weight: 600;
}
.navTab{
  background-color: #00000053;
}
.logout{
  text-align: right;
}
.HeaderFavIcon{
  height: 30px;
  width: auto;
}
</style>
