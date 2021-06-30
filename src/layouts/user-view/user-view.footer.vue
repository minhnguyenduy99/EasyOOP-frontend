<template>
  <footer class="hero is-primary-dark is-fullheight">
    <div
      class="hero-body is-flex-direction-column is-justify-content-space-evenly is-align-items-stretch"
    >
      <div class="general-info mb-5">
        <b-image
          class="general-info__logo"
          src="https://res.cloudinary.com/dml8e1w0z/image/upload/v1624886684/oop-learning-helper/logo_lkpsia.png"
        />
        <div class="columns">
          <div class="column is-full">
            <p class="is-size-2 has-text-weight-bold py-3">
              Website dành cho người học OOP
            </p>
            <div class="is-size-5 py-4">
              <p>
                Tại đây bạn có thể học những bài học OOP từ cơ bản đến nâng cao
                và có lộ trình được sắp xếp dựa trên chủ đề. Ngoài ra, bạn còn
                có thể làm các bài test trắc nghiệm để củng cố thêm kiến thức
                sau mỗi bài học
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <div class="info-group has-left-border">
            <p class="info-group__title">Created by</p>
            <div
              v-for="contributor in contributors"
              :key="contributor.id"
              class="mb-3"
            >
              <p>{{ contributor.name }}</p>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="info-group has-left-border">
            <p class="info-group__title">Contributors</p>
            <div class="ha-vertical-layout-5">
              <div v-for="contributor in contributors" :key="contributor.id">
                <p class="mb-2 has-text-weight-bold">{{ contributor.name }}</p>
                <div class="info-group__profile">
                  <div v-for="social in contributor.profiles" :key="social.id">
                    <b-tooltip
                      position="is-bottom"
                      type="is-primary-dark"
                      v-if="social.iconType === 'tooltip'"
                      :label="social.value"
                    >
                      <b-icon
                        :icon="social.icon"
                        :class="[social.type]"
                        :pack="social.iconPack"
                        size="is-medium"
                      />
                    </b-tooltip>
                    <a v-else :href="social.to">
                      <b-icon
                        :icon="social.icon"
                        :pack="social.iconPack"
                        :class="[social.type]"
                        size="is-medium"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "UserViewFooter",
  data: () => ({
    contributors: [
      {
        name: "NGUYỄN DUY MINH",
        profiles: [
          {
            iconType: "link",
            icon: "github",
            iconPack: "fab",
            type: "has-text-white",
            to: "https://github.com/minhnguyenduy99"
          },
          {
            iconType: "link",
            icon: "facebook",
            iconPack: "fab",
            type: "has-text-facebook",
            to: "https://www.facebook.com/minhnd.mei"
          },
          {
            iconType: "tooltip",
            icon: "google",
            iconPack: "fab",
            type: "has-text-google",
            value: "minhnguyenduy99@gmail.com"
          }
        ]
      },
      {
        name: "NGUYỄN DU LỊCH",
        profiles: [
          {
            iconType: "link",
            icon: "github",
            iconPack: "fab",
            type: "has-text-white",
            to: "https://github.com/LichND"
          },
          {
            iconType: "link",
            icon: "facebook",
            iconPack: "fab",
            type: "has-text-facebook",
            to: "#"
          },
          {
            iconType: "tooltip",
            icon: "google",
            iconPack: "fab",
            type: "has-text-google",
            value: "test@gmail.com"
          }
        ]
      }
    ]
  })
};
</script>

<style scoped lang="scss">
$github: #333;

#user-view-footer-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.info-group {
  &__title {
    font-weight: bold;
    font-size: 1rem;
    margin-bottom: 2rem;
  }

  &__profile {
    display: flex;

    > * {
      &:not(:last-child) {
        margin-right: 0.5rem;
      }
    }
  }

  &.has-left-border {
    border-left: 1px solid white;
    padding-left: 1rem;
  }
}

.general-info {
  &__logo {
    width: 80px;
    height: auto;
  }
}

.has-text-facebook {
  color: $facebook;
}

.has-text-google {
  color: $google;
}

.has-text-github {
  color: $github;
}
</style>
