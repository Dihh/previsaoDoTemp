<template>
  <div id="app">
    <router-view />
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

* {
  padding: 0px;
  margin: 0px;
}

@media only screen and (max-width: 600px) {
  #app {
    margin-left: 0px;
    margin-right: 0px;
  }
}
</style>
