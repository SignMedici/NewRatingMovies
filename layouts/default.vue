<template>
  <div>
    <div class="splash-screen" v-if="showHideSpinner">
      <div class="spinner-wrapper">
        <div class="spinner"></div>
      </div>
    </div>
    <div>
      <Header />
      <div class="container">
        <Nuxt />
      </div>
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

/* SPLASH */
.splash-screen {
  background: #f2f0ee;
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 50;
}

.spinner-wrapper {
  position: absolute;
  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);
}
.spinner {
  width: 80px;
  height: 80px;
  margin: 100px auto;
  background-color: #e45447;

  border-radius: 100%;
  -webkit-animation: sk-scaleout 1s infinite ease-in-out;
  animation: sk-scaleout 1s infinite ease-in-out;
}

@-webkit-keyframes sk-scaleout {
  0% {
    -webkit-transform: scale(0);
  }
  100% {
    -webkit-transform: scale(1);
    opacity: 0;
  }
}

@keyframes sk-scaleout {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 0;
  }
}
</style>
