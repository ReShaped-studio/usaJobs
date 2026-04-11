<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <RouterLink to="/" class="civi-wordmark" aria-label="civi.work home">
    <span class="civi-wordmark__bold">civi</span>
    <span class="civi-wordmark__light">.work</span>
  </RouterLink>
</template>

<style scoped>
.civi-wordmark {
  display: block;
  margin: 0;
  color: #fff;
  font-family: var(--civi-serif);
  font-size: 32px;
  line-height: 0.95;
  text-decoration: none;
  letter-spacing: 0;
  white-space: nowrap;
}

.civi-wordmark:hover .civi-wordmark__bold,
.civi-wordmark:hover .civi-wordmark__light {
  text-decoration: underline;
  text-underline-offset: 0.12em;
}

.civi-wordmark__bold {
  font-weight: 700;
}

.civi-wordmark__light {
  font-weight: 300;
}
</style>
