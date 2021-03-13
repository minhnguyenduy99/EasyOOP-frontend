<template>
  <header id="user-view-header">
    <b-navbar>
      <template #brand>
        <b-navbar-item tag="router-link" to="Home">
          <b-image
            id="website-icon"
            src="https://cdn4.iconfinder.com/data/icons/technology-83/1000/object_programming_development_oriented_developer_object-oriented_programming_software-512.png"
          />
        </b-navbar-item>
      </template>
      <template #end>
        <b-navbar-item tag="router-link" to="Home">Home</b-navbar-item>
        <b-navbar-item tag="router-link" to="Home">About</b-navbar-item>
      </template>
    </b-navbar>
  </header>
</template>

<script>
export default {
  name: "UserViewHeader"
};
</script>

<style scoped lang="scss">
#website-icon {
  width: 50px;
  height: 100%;
}
</style>
