<template>
  <div class="home-hero hero is-fullheight-with-navbar is-large">
    <div class="hero-body home__hero__container">
      <div class="container columns is-centered is-vcentered">
        <div class="column">
          <div class="home__hero__logo pb-3">
            <div
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-offset="0"
              data-aos-anchor=".home-hero"
            >
              <p class="home__hero__title--large">OOP</p>
              <p class="home__hero__title--medium">for learnee</p>
            </div>

            <p
              class="home__hero__description"
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-offset="200"
              data-aos-anchor=".home-hero"
            >
              Tại đây bạn có thể học những bài học OOP từ cơ bản đến nâng cao và
              có lộ trình được sắp xếp dựa trên chủ đề.
            </p>
          </div>
          <b-button
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-offset="400"
            data-aos-anchor=".home-hero"
            type="is-primary-dark"
            size="is-medium"
            rounded
            class="home__hero__button--about"
            >VỀ CHÚNG TÔI</b-button
          >
        </div>
        <div class="column">
          <b-image
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-offset="600"
            data-aos-anchor=".home-hero"
            class="home__hero__image"
            src="https://res.cloudinary.com/dml8e1w0z/image/upload/v1624897233/oop-learning-helper/OOPforlearnee_ysujss.png"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home__hero {
  &__container {
    text-align: center;
    background: linear-gradient(
      125deg,
      rgba(78, 178, 254, 1) 0%,
      rgba(92, 242, 255, 1) 100%
    );

    @include tablet {
      text-align: left;
    }
  }

  &__image {
    display: none;
    @include tablet {
      margin-right: -3rem;
      max-width: 500px;
      display: block;
    }
  }

  &__title {
    &--large {
      font-size: 4.5rem;
    }

    &--medium {
      font-size: 3rem;
    }

    @include tablet {
      &--large {
        font-size: 9rem;
      }

      &--medium {
        font-size: 5rem;
      }
    }
  }
}

p[class^="home__hero__title"] {
  font-weight: 800;
  color: white;
  line-height: 0.9em;
}

.home__hero__description {
  color: black;
  padding-top: 2rem;
  font-size: 1rem;
  font-weight: bold;
  margin-right: -10px;

  @include tablet {
    font-size: 1.5rem;
  }
}

.home__hero__button {
  &--about {
    margin-top: 2rem;
    font-weight: bold;
    height: auto;
  }
}
</style>
