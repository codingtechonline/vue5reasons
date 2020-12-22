<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/currency">Currency Calculator</router-link>
    </div>
    <router-view />
  </div>
</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: white;
}
#app {
  font-family: "Source Code Pro";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  /* margin-top: 60px; */
}
</style>
