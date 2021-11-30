<template>
    <div>
      <v-container class="grey lighten-5 mainLogo" id="logo">
        <img src="../../assets/logo_big.png">
      </v-container>
    <v-card>
      <v-toolbar
        dark
        flat
        height="88"
      >
      <div class="adminTitle">
         <svg style="width:50px;height:50px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 1L21 5V11C21 16.55 17.16 21.74 12 23C6.84 21.74 3 16.55 3 11V5L12 1M16 14H8V15.5C8 15.77 8.19 15.96 8.47 16L8.57 16H15.43C15.74 16 15.95 15.84 16 15.59L16 15.5V14M17 8L17 8L14.33 10.67L12 8.34L9.67 10.67L7 8L7 8L8 13H16L17 8Z" />
        </svg>
         Administration</div>
      <template v-slot:extension>
        <v-tabs
          v-model="tab"
          align-with-title
        >
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab
            v-for="item in items"
            :key="item"
          >
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item"

      >
        <v-card v-if="item === 'utilisateurs'" class="tableMain">
          <Admin-UserAdmin />
        </v-card>
        <v-card v-else class="tableMain">
          <Admin-MovieAdmin />
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
    </div>
</template>


<script>
import UserAdmin from '@/components/Admin/UserAdmin/index';
export default {
  components:{
        UserAdmin
    },
    data () {
      return {
        tab: null,
        items: [
          'utilisateurs', 'films',
        ],
      }
    },
  }
</script>
<style scoped>
.mainLogo{
    margin: 10px 0 30px 0;
    padding: 0;
    text-align: center;
}
.v-toolbar{
  height:150px;
}
.theme--dark.v-toolbar.v-sheet {
  background-color: #9042b4;
}
.table{
  color: #fff;
}
.tableMain {
  padding: 40px;
}
.adminTitle{
  color: #ffffff79;
  font-family: 'Ubuntu', sans-serif;
  text-align: center;
  font-weight: 500;
  font-size: 50px;
}
.v-tabs:not(.v-tabs--vertical) .v-tab {
    white-space: normal;
}
.v-tabs{
  width:100%;
  padding-left: 20px;
}
</style>
