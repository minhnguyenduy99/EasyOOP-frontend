<template>
  <div id="user-view-header-content">
    <transition
      name="custom-transition"
      mode="in-out"
      enter-active-class="animate__animated animate__slideInDown"
      leave-active-class="animate__animated animate__slideOutUp"
    >
      <b-navbar
        v-show="showNavbar"
        fixed-top
        :type="_themeType"
        transparent
        :shadow="!isScrollTop"
      >
        <template #brand>
          <b-navbar-item
            tag="router-link"
            to="Home"
            class="is-align-self-center"
          >
            <b-image
              id="website-icon"
              src="https://cdn4.iconfinder.com/data/icons/technology-83/1000/object_programming_development_oriented_developer_object-oriented_programming_software-512.png"
            />
          </b-navbar-item>
        </template>
        <template #end>
          <b-navbar-item tag="div" id="navigation-bar">
            <div class="buttons">
              <b-button
                class="navigate-button"
                type="is-primary-light"
                :outlined="!isScrollTop"
                tag="router-link"
                to="/"
                >Home</b-button
              >
              <b-button
                class="navigate-button"
                type="is-primary-light"
                :outlined="!isScrollTop"
                tag="router-link"
                to="/"
                >About</b-button
              >
              <b-button
                class="navigate-button"
                type="is-primary-dark"
                tag="router-link"
                to="/"
                >Login</b-button
              >
            </div>
          </b-navbar-item>
        </template>
      </b-navbar>
    </transition>
  </div>
</template>

<script>
export default {
  name: "UserViewHeader",
  data: () => ({
    isScrollTop: true,
    showNavbar: true,
    scrollPosition: 0
  }),
  computed: {
    _themeType() {
      return this.isScrollTop ? "is-primary-light" : "is-white";
    }
  },
  mounted: function() {
    window.addEventListener(
      "scroll",
      function() {
        const scrollTop = window.scrollY;
        // Is scrolling down
        if (scrollTop > this.scrollPosition) {
          this.showNavbar = false;
        } else {
          this.showNavbar = true;
          this.isScrollTop = scrollTop <= 70;
        }
        this.scrollPosition = scrollTop;
      }.bind(this)
    );
  }
};
</script>

<style scoped lang="scss">
#website-icon {
  width: 50px;
  height: 100%;
}

.navigate-button {
  border: none;
  font-weight: bold;
}

#navigation-bar {
  padding: 1rem;
}
</style>
