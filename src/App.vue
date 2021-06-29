<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;600;700;800&display=swap");

input:placeholder-shown {
  font-style: italic;
}

#app {
  font-family: "Montserrat", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

:root {
  --animate-duration: 0.5s;
}
</style>
