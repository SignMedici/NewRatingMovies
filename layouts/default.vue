<template>
  <div>
    <Header />
    <div class="container">
      <UILoading v-if="showHideSpinner" />
      <Nuxt />
    </div>
  </div>
</template>
<script>
export default {
  beforeCreate() {
    this.showHideSpinner = true;
  },
  mounted() {
    this.showHideSpinner = false;
  },
  data() {
    return {
      showHideSpinner: true,
    };
  },
};
</script>
<style>
* {
  box-sizing: border-box;
}
:root {
  --color-fushia: #9042b4;
  --color-rose: #a52199;
  --color-purple: #492e4e;
}
html {
  min-width: 100%;
  min-height: 150%;
}
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background: -moz-linear-gradient(
    270deg,
    rgba(7, 17, 29, 1) 0%,
    rgba(82, 15, 73, 1) 48%,
    rgba(7, 17, 29, 1) 100%
  );
  background: -webkit-linear-gradient(
    270deg,
    rgba(7, 17, 29, 1) 0%,
    rgba(82, 15, 73, 1) 48%,
    rgba(7, 17, 29, 1) 100%
  );
  background: linear-gradient(
    270deg,
    rgba(7, 17, 29, 1) 0%,
    rgba(82, 15, 73, 1) 48%,
    rgba(7, 17, 29, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#07111d",endColorstr="#07111d",GradientType=1);
}
</style>
