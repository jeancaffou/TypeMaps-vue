<template>
  <div class="map">
    <div id="map" ref="map" class="map" />
    <slot v-if="ready" />
  </div>
</template>

<script lang="ts" src="./Map.ts"></script>

<style scoped>
  .map {
    width: 100%;
    height: 100%;
  }
</style>
