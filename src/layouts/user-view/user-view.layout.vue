<template>
  <div id="user-view-layout">
    <div class="ha-vertical-layout-3">
      <router-view name="header" />
      <section id="main-body-section">
        <div id="navbar-section">
          <router-view name="sidebar" />
        </div>
        <div id="body-section">
          <router-view name="default" />
        </div>
      </section>
      <router-view name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  name: "UserViewLayout"
};
</script>

<style scoped lang="scss">
#main-body-section {
  display: flex;
  justify-content: space-between;
  padding: 0 20px 0 10px;
  position: relative;

  #navbar-section {
    position: sticky;
    top: 20px;
    flex-basis: 20%;
    height: fit-content;
    scroll-behavior: auto;
  }

  #body-section {
    flex-basis: 78%;
  }
}
</style>
