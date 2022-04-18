<template>
  <div>
    <div ref="movieTrailers" v-if="trailers.length > 0">
      <h3 class="ms-3 my-4">{{ $t("trailers") }}</h3>
      <div class="trailers" v-for="trailer in trailers">
        <iframe
          class="trailer"
          :src="baseVideoURL + trailer.key"
          :width="width"
          :height="height"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
          scrolling="no"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["trailers"],
  data() {
    return {
      baseVideoURL: process.env.VIDEO_URL,
      width: "",
      height: "",
    };
  },
  async mounted() {
    console.log("trailers:", this.trailers);

    let elem = this.$refs.movieTrailers;

    if (typeof elem != "undefined") {
      // Calc size of each trailer
      let totalWidth = this.$screen.width;
      if (totalWidth < 500) {
        this.width = totalWidth;
        this.height = (this.width * 9) / 16;
      } else if (totalWidth >= 500 && totalWidth < 1024) {
        this.width = totalWidth / 2;
        this.height = (this.width * 9) / 16;
      } else {
        this.width = totalWidth / 3;
        this.height = (this.width * 9) / 16;
      }

      // Calc height of trailers zone
      if (this.trailers.length > 3) {
        elem.style.height = String(this.height * 2 + 76) + "px";
      } else {
        elem.style.height = String(this.height + 56) + "px";
      }
    }
  },
};
</script>
<style>
h3 {
  color: var(--color-fushia);
  font-family: "Ubuntu", sans-serif;
  font-weight: 600;
  font-size: 30px;
}
.trailers {
  display: inline-block;
}
.trailer {
  padding: 10px;
  border-radius: 20px;
  overflow: hidden;
}
</style>
