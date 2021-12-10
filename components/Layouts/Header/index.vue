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
        <UIFlags />
        <!-- Favorite icon -->
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
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
                {{ $t('myProfile') }}
              </nuxt-link>
            </v-tab>
            <v-tab v-if="getUserInfo.isAdmin == true">
              <nuxt-link class="nav-link active" aria-current="page" to="/admin">
                {{ $t("administration") }}
              </nuxt-link>
            </v-tab>
            <v-tab class="nav-item logout" @click="logout">
              <nuxt-link class="nav-link active" aria-current="page" to="#">
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
</style>
