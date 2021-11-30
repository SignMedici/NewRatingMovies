<template>
  <transition name="bloc-modal" v-if="revele">
    <div class="modal-backdrop" @click="toggleModal">
      <div class="modal">
        <div class="modalContent">
          <div>
            <!-- Poster -->
            <img v-if="movie.poster_path" :srcset="url + movie.poster_path" />
            <img
              v-else
              class="defaultPic"
              src="../../assets/No-Image-Placeholder.png"
            />
          </div>
          <div class="movieDesc">
            <div>
              <!-- Title -->
              <span v-if="movie.title.length <= 33" class="bigTitle">{{ movie.title}}</span>
              <span v-else class="smallTitle">{{ movie.title}}</span>
              <!-- Vote -->
              <span v-if="movie.vote_average" class="vote">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-heart-fill voteIcon"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                  />
                </svg>
                {{ movie.vote_average }}
              </span>
            </div>
            <!-- Movie details -->
            <div class="movieData">
              <!-- Year -->
              <div v-if="movie.release_date" class="year">
                {{ movie.release_date.substring(0, 4) }}
              </div>
              <!-- Genres -->
              <div v-if="movie.strGenres"class="genres">{{ movie.strGenres }}</div>

              <div class="people">
                <table>
                  <tr>
                    <td><span>Réalisateur</span></td>
                    <td>
                      <!-- Director -->
                      <div v-if="movie.director" class="casting">{{ movie.director }}</div>
                    </td>
                  </tr>
                  <tr>
                    <td><span>Acteurs</span></td>
                    <td>
                      <!-- Actors -->
                      <div v-if="movie.casting" class="casting">{{ movie.casting }}</div>
                    </td>
                  </tr>
                </table>
              </div>
              <!-- Overview -->
              <div v-if="movie.overview" class="overview">{{ movie.overview }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "Modal",
  props: ["movie", "revele", "toggleModal"],
  data() {
    return {
      url: process.env.API_PIC_URL,
      defaultPicUrl: "../../assets/No_Picture.png",
      modalMovie: "",
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
<style scoped>
img {
  float: left;
  width: auto;
  height: 450px;
  border: 0;
  border-radius: 10px;
  background-color: whitesmoke;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal {
  position: relative;
  width: 900px;
  height: 490px;
  display: flex;
  border: 0;
  border-radius: 10px;
  overflow: hidden;
}
.modalContent{
  display:flex;
  background-color: #492e4e;
  padding:20px;
  width:100%;
}
.poster{
  width: 350px;
}
.movieDesc {
  display:block;
  margin-left:20px;
}
.bigTitle {
  color: #9042b4;
  font-family: "Ubuntu", sans-serif;
  font-weight: 600;
  font-size: 30px;
}
.smallTitle {
  color: #9042b4;
  font-family: "Ubuntu", sans-serif;
  font-weight: 600;
  font-size: 20px;
}
.vote {
  font-size: 20px;
  font-weight: normal;
  color:#f2c43c;
  float: right;
  margin-top: 13px;
}
.voteIcon{
  margin-bottom: 3px;
  margin-right: 5px;
}
.movieData {
  color: white;
}
.year {
  font-family: "Lato", sans-serif;
  font-weight: 600;
  font-size: 18px;
}
.genres{
  font-size: 14px;
}
.people{
  margin: 25px 0;
}
.people .casting{
  padding-left: 10px;
  font-weight: 400;
}
table{
  font-size: 8px;
}
table span{
  color: #9042b4;
}
.overview{
  height: 255px;
  overflow:auto;
  text-align: justify;
  padding: 0 10px 0 0;
}
</style>
