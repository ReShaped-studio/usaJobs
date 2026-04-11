<script setup lang="ts">
import CiviWordmark from "./CiviWordmark.vue";

defineProps<{
  tagline?: string;
}>();
</script>

<template>
  <div class="civi-brand-block">
    <CiviWordmark />
    <p class="civi-brand-block__tagline">{{ tagline }}</p>
  </div>
</template>

<style scoped>
.civi-brand-block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 8px;
  flex: 0 0 auto;
  min-width: 197px;
  max-width: max-content;
}

.civi-brand-block__tagline {
  margin: 0;
  font-family: var(--civi-ui-font);
  font-size: 12px;
  font-weight: 500;
  line-height: 1.2;
  color: #fff;
  opacity: 0.8;
  white-space: nowrap;
}

@media (max-width: 63.99em) {
  .civi-brand-block {
    width: 100%;
    max-width: 100%;
    flex-basis: auto;
    min-width: 0;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
