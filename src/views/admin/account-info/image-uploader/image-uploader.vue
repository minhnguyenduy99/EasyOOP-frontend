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
        <b-field class="file is-primary">
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
        </b-field>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageUploader",
  props: {
    src: String
  },
  data: () => ({
    currentImageSrc: null,
    file: null
  }),
  created: function() {
    this.currentImageSrc = this.src;
  },
  methods: {
    $on_fileChanged(file) {
      const fileReader = new FileReader();
      fileReader.onload = function(e) {
        this.currentImageSrc = e.target.result;
        this.$emit("image-changed", file);
      }.bind(this);

      fileReader.readAsDataURL(file);
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
    // position: absolute;
    // top: 0;
    // left: $image-left;
    // width: $image-width;
    // z-index: 0;
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
      display: flex;
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
</style>
