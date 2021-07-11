<template>
  <div class="ha-vertical-layout-7">
    <b-skeleton width="100%" height="200px" />
    <div class="p-3 ha-vertical-layout-6">
      <b-skeleton width="100%" height="30px" />
      <div>
        <b-skeleton width="100px" />
        <b-skeleton width="100%" />
      </div>
      <div>
        <b-skeleton width="100px" />
        <b-skeleton width="100%" />
      </div>
      <div>
        <b-skeleton width="100px" />
        <div
          class="is-flex is-align-items-center is-justify-content-flex-start"
        >
          <div class="mr-2">
            <b-skeleton width="50" />
          </div>
          <div class="mr-2">
            <b-skeleton width="50" />
          </div>
          <div>
            <b-skeleton width="50" />
          </div>
        </div>
      </div>
      <div>
        <b-skeleton width="100px" />
        <b-skeleton width="100%" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VerificationPost"
};
</script>
