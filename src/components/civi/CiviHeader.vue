<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

import { CIVI_PRIMARY_NAV } from "@/constants/navigation";

import CiviBrandBlock from "./CiviBrandBlock.vue";
import CiviHeaderNav from "./CiviHeaderNav.vue";
import CiviHeaderSearchField from "./CiviHeaderSearchField.vue";

const route = useRoute();
const headerSearch = ref("");

const activeName = computed(() => {
  const n = route.name;
  return typeof n === "string" ? n : undefined;
});
</script>

<!-- Figma: usaJobs → Header (node 36:1856) -->
<template>
  <header class="civi-header" role="banner">
    <div class="civi-header__bar">
      <div class="civi-header__row">
        <CiviBrandBlock tagline="Find your place in the public sector." />
        <CiviHeaderNav :items="CIVI_PRIMARY_NAV" :active-name="activeName" />
        <CiviHeaderSearchField v-model="headerSearch" input-id="header-search" />
      </div>
    </div>
  </header>
</template>

<style scoped>
.civi-header__bar {
  box-sizing: border-box;
  background-color: var(--civi-header-fill);
  border: 2px solid var(--civi-header-stroke);
  color: #fff;
}

.civi-header__row {
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: var(--civi-header-max-width);
  margin-left: auto;
  margin-right: auto;
  min-height: 4.75rem;
  padding: 16px 40px;
}

@media (max-width: 63.99em) {
  .civi-header__row {
    flex-direction: column;
    align-items: stretch;
    padding: 16px 24px;
    gap: 1rem;
    min-height: 0;
  }
}
</style>
