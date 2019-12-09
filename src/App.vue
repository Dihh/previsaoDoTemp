<template>
  <div id="app">
    <router-view />
    <div class="loading" v-if="$store.getters.getLoader">
      <div class="loader"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #eee;
  margin-left: 200px;
  margin-right: 200px;
  padding: 10px;
}

body {
  background-image: linear-gradient(#2193b0, #6dd5ed);
  height: 100vh;
  overflow: hidden;
}

.loading {
  background: rgba(0, 0, 0, 0.752);
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader {
  border: 6px solid #f3f3f3;
  border-radius: 50%;
  border-top: 6px solid #2193b0;
  width: 60px;
  height: 60px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

* {
  padding: 0px;
  margin: 0px;
}

@media only screen and (max-width: 600px) {
  #app {
    margin-left: 0px;
    margin-right: 0px;
  }
  .loader {
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid #3498db;
    width: 120px;
    height: 120px;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;
  }
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
