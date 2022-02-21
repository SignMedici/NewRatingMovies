<template>
  <div v-if="isAuthenticated">
    <UIBigLogo />
    <v-container class="grey lighten-5 square">
      <!-- Back button -->
      <UIBackBtn :path="'myprofile'" />
      <!-- Page logo and title -->
      <div class="pageLogoTitle">
        <svg style="width: 65px; height: 65px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M20.84 2.18L16.91 2.96L19.65 6.5L21.62 6.1L20.84 2.18M13.97 3.54L12 3.93L14.75 7.46L16.71 7.07L13.97 3.54M9.07 4.5L7.1 4.91L9.85 8.44L11.81 8.05L9.07 4.5M4.16 5.5L3.18 5.69A2 2 0 0 0 1.61 8.04L2 10L6.9 9.03L4.16 5.5M2 10V20C2 21.11 2.9 22 4 22H20C21.11 22 22 21.11 22 20V10H2Z"
          /></svg
        ><br />
        {{ $t("modifyMyProfile") }}
      </div>
      <!-- Form -->
      <v-container data-app>
        <form
          @submit.prevent="updateUserLoaded"
          enctype="multipart/form-data"
          method="post"
        >
          <div class="mb-3">
            <label for="nickname" class="form-label">{{
              $t("nickname")
            }}</label>
            <input
              type="text"
              class="form-control"
              name="nickname"
              aria-describedby="nickname"
              v-model="nickname"
            />
          </div>
          <div>
            <label for="email" class="form-label">{{
              $t("emailAddress")
            }}</label>
          </div>
          <div :class="['input-group', isEmailValid()]">
            <input
              type="email"
              class="form-control"
              id="email"
              aria-describedby="emailHelp"
              v-model="email"
            />
          </div>
          <div class="my-3">
            <label for="myLanguage" class="form-label">{{
              $t("language")
            }}</label>
            <select
              class="form-select langField"
              name="myLanguage"
              aria-label="Prefered language"
              v-model="userLang"
              required
            >
              <option
                v-for="locale in this.$i18n.locales"
                v-bind:value="locale.code"
              >
                {{ $t(locale.name) }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="avatar">{{ $t("profilePic") }}</label>
            <div class="my-2">
              <input
                type="file"
                class="form-control-file"
                id="avatar"
                name="avatar"
                ref="avatar"
                accept="image/*"
              />
            </div>
            <button type="submit" class="btn confirmButton">
              {{ $t("modify") }}
            </button>
          </div>
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
      userLang: "",
      profilePic: null,
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated; // it check if user isAuthenticated
    },
  },
  methods: {
    isEmailValid: function () {
      return this.email == ""
        ? ""
        : this.reg.test(this.email)
        ? "has-success"
        : "has-error";
    },
    async updateUserLoaded() {
      let newAvatar = this.$refs.avatar.files;
      let formData = new FormData();

      if (newAvatar.length > 0) {
        formData.append("avatar", newAvatar[0]);
        this.profilePic = newAvatar[0].name;
      }

      formData.append("nickname", this.nickname);
      formData.append("email", this.email);
      formData.append("userLang", this.userLang);
      formData.append("profilePic", this.profilePic);

      await this.$store.dispatch("updateLoggedUser", [
        this.$route.params.id,
        formData,
      ]);

      await this.$cookiz.set("siteLang", this.userLang);
      await this.$toast.success(this.$t("updateDone"));
      // await new Promise((resolve) => setTimeout(resolve, 300));
      this.$router.push("/myprofile");
    },
  },
  created() {
    let userLoadedUpdate = this.$store.getters.getUserInfo;

    this.nickname = userLoadedUpdate.nickname;
    this.email = userLoadedUpdate.email;
    this.userLang = userLoadedUpdate.language;
    this.profilePic = userLoadedUpdate.profilePic;

    let language = "";
    if (this.$cookiz.get("siteLang")) {
      language = this.$cookiz.get("siteLang");
    } else {
      language = "fr";
    }
    this.$i18n.setLocale(language);
  },
};
</script>

<style scoped>
.square {
  width: 700px;
  padding: 30px;
  background-color: #ffffff20;
  border-radius: 14px;
  margin-top: 20px;
}
.pageLogoTitle {
  color: #ffffff79;
  font-family: "Ubuntu", sans-serif;
  text-align: center;
  font-weight: 500;
  font-size: 50px;
}
.form {
  display: flex;
  margin-top: 20px;
}
.confirmButton {
  color: #fff;
  background-color: #a52199;
  font-family: "Lato", sans-serif;
  margin-top: 10px;
  font-weight: 500;
  font-size: 17px;
  width: 100%;
}
label {
  color: white;
}

@media (max-width: 620px) {
  .square {
    width: 92%;
  }
  .pageLogoTitle {
    font-size: calc(
      24px + (50 - 24) * ((100vw - 300px) / (620 - 300))
    ); /* font-size: calc([minimum size] + ([maximum size] - [minimum size]) * ((100vw - [minimum viewport width]) / ([maximum viewport width] - [minimum viewport width]))); */
    white-space: nowrap;
  }
}
</style>
