<template>
  <div class="image-uploader">
    <div class="image-container">
      <b-image
        class="image-displayer"
        :src="currentImageSrc"
        rounded
        ratio="1by1"
      />
    </div>
    <div class="image-edit">
      <div>
        <div class="image-edit-background"></div>
        <b-upload
          v-model="file"
          rounded
          outlined
          class="file-label"
          @input="$on_fileChanged"
        >
          <div class="has-background-primary is-rounded p-2">
            <b-icon
              class="file-icon"
              icon="pen"
              type="is-white"
              size="is-small"
            ></b-icon>
          </div>
        </b-upload>
        <slot v-bind="{ open: $_openModal }">
          <b-button
            class="is-icon-button"
            rounded
            inverted
            size="is-small"
            type="is-primary"
            :icon-right="viewIcon"
            @click="$_openModal"
          />
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageUploader",
  props: {
    src: String,
    viewable: {
      type: Boolean,
      default: () => false
    },
    viewIcon: {
      type: String,
      default: () => "eye"
    }
  },
  data: () => ({
    currentImageSrc: null,
    file: null
  }),
  created: function() {
    this.currentImageSrc = this.src;
  },
  watch: {
    src(val) {
      this.currentImageSrc = val;
    }
  },
  methods: {
    $on_fileChanged(file) {
      const fileReader = new FileReader();
      fileReader.onload = function(e) {
        this.currentImageSrc = e.target.result;
        this.$emit("image-changed", file);
      }.bind(this);

      fileReader.readAsDataURL(file);
    },
    $_openModal() {
      const h = this.$createElement;
      const vnode = h("p", { class: "image-viewer" }, [
        h("img", {
          attrs: {
            src: this.currentImageSrc
          }
        })
      ]);
      this.$buefy.modal.open({
        content: [vnode]
      });
    }
  }
};
</script>

<style scoped lang="scss">
$image-width: 100%;
$image-left: 0;

.image {
  &-uploader {
    position: relative;
    z-index: 10;
    cursor: pointer;
  }

  &-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    border: 1px solid rgb(200, 200, 200);
    border-radius: 50%;
    box-sizing: border-box;
  }

  &-displayer {
    position: relative;
    z-index: -1;
  }

  &-edit {
    border-radius: 100%;
    padding-top: $image-width;
    opacity: 0;
    transition: 0.1s ease-in;

    > div {
      position: absolute;
      left: $image-left;
      top: 0;
      width: $image-width;
      height: 100%;
      display: grid;
      grid-template-columns: auto auto;
      column-gap: 0.5rem;
      justify-content: center;
      align-items: center;
    }

    &-background {
      position: absolute;
      width: 100%;
      height: 100%;
      background: black;
      border-radius: 50%;
      opacity: 0.3;
    }
  }
}

.image-uploader {
  &:hover {
    .image-edit {
      opacity: 1;
    }
  }
}

.image-viewer {
  height: 100%;
  width: auto;
  display: flex;
  justify-content: center;
}
</style>
