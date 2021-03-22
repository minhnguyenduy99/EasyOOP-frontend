<template>
  <div>
    <canvas id="gameCanvas" width="800" height="450"></canvas>
  </div>
</template>

<script>
import startCocos from "./start.js";

export default {
  name: "TestCocosPage",
  mounted: function() {
    startCocos();
  }
};
</script>
