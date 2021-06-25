<template>
  <div id="not-found-page">
    <div class="hero is-fullheight-with-navbar">
      <div class="hero-body">
        <div class="container columns is-centered">
          <div class="column is-half has-text-centered ha-vertical-layout-6">
            <img
              class="not-found__image"
              src="https://res.cloudinary.com/dml8e1w0z/image/upload/v1624584726/oop-learning-helper/2748558_qnprsi.png"
            />
            <p class="title p-3 has-text-grey">PAGE NOT FOUND</p>
            <b-button type="is-primary" tag="router-link" to="/"
              >TRANG CHỦ</b-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageNotFound"
};
</script>

<style scoped>
.not-found__image {
  max-width: 250px;
  height: auto;
  opacity: 0.8;
}
</style>
