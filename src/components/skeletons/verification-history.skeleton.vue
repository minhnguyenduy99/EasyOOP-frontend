<template>
  <div>
    <div
      v-for="i in count"
      :key="i"
      class="is-fullwidth p-3 is-flex is-justify-content-space-between is-align-items-center"
    >
      <div>
        <b-skeleton width="150px" />
        <b-skeleton rounded width="60px" />
      </div>
      <div>
        <b-skeleton width="30px" height="30px" rounded />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VerificationHistorySkeleton",
  props: {
    count: {
      type: Number,
      default: () => 0
    }
  }
};
</script>
