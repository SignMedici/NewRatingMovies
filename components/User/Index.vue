<template>
  <div>
    <UIBigLogo />
    <v-card>
      <v-toolbar
        dark
        flat
      >
       <div class="adminTitle">
         <svg class="peopleLogo" viewBox="0 0 24 24">
              <path fill="currentColor" d="M20,2H4A2,2 0 0,0 2,4V16A2,2 0 0,0 4,18H8L12,22L16,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M12,4.3C13.5,4.3 14.7,5.5 14.7,7C14.7,8.5 13.5,9.7 12,9.7C10.5,9.7 9.3,8.5 9.3,7C9.3,5.5 10.5,4.3 12,4.3M18,15H6V14.1C6,12.1 10,11 12,11C14,11 18,12.1 18,14.1V15Z" />
          </svg>
         {{ $t('welcome') }} {{ getUserInfo.nickname }}</div>
    </v-toolbar>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nom</th>
          <th scope="col">Adresse email</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ getUserInfo.id }}</td>
          <td>{{ getUserInfo.nickname }}</td>
          <td>{{ getUserInfo.email }}</td>
          <td>
            <nuxt-link :to="{ name: 'user-myprofile-update', params: { userId: getUserInfo.id }, hash: '#logo' }">
              <button>
                <svg style="width:24px;height:24px;color:#22d157;" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M21.7,13.35L20.7,14.35L18.65,12.3L19.65,11.3C19.86,11.09 20.21,11.09 20.42,11.3L21.7,12.58C21.91,12.79 21.91,13.14 21.7,13.35M12,18.94L18.06,12.88L20.11,14.93L14.06,21H12V18.94M12,14C7.58,14 4,15.79 4,18V20H10V18.11L14,14.11C13.34,14.03 12.67,14 12,14M12,4A4,4 0 0,0 8,8A4,4 0 0,0 12,12A4,4 0 0,0 16,8A4,4 0 0,0 12,4Z" />
                </svg>
              </button>
            </nuxt-link></td>
        </tr>
      </tbody>
    </table>
    </v-card>
  </div>
</template>

<script>
export default {
  computed: {
    getUserInfo() {
      return this.$store.getters.getUserInfo;
    },
  },
  created() {
    this.$i18n.setLocale(this.$cookiz.get('siteLang'));
  }
};
</script>

<style scoped>
.peopleLogo{
  width:40px;
  height:40px;
  margin-right:5px;
}
.v-sheet{
  height: 84px;
}
.table{
  padding: 20px;
}
tr{
  background-color: #1E1E1E;
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  color: #9042b4;
  font-size: 17px;
}
td{
  color: #fff;
  border-bottom-color: #9042b4;
}
</style>
