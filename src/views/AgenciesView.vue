<script setup lang="ts">
import CiviHeader from "@/components/civi/CiviHeader.vue";
import AgencyListingCard from "@/components/agencies/AgencyListingCard.vue";
import { useAgenciesPage } from "@/composables/useAgenciesPage";

const { rows, loading } = useAgenciesPage();
</script>

<template>
  <div class="civi-agencies">
    <a class="usa-skipnav" href="#main-content">Skip to main content</a>
    <CiviHeader />
    <section class="civi-agencies-hero" aria-labelledby="agencies-page-title">
      <div class="civi-agencies-hero__inner">
        <h1 id="agencies-page-title" class="civi-agencies-hero__title">
          Browse jobs by agency
        </h1>
      </div>
    </section>
    <p v-if="loading" class="usa-sr-only" role="status" aria-live="polite">Loading agencies</p>
    <main id="main-content" class="civi-agencies__main">
      <div class="civi-agencies__list">
        <AgencyListingCard v-for="row in rows" :key="row.id" :row="row" />
      </div>
    </main>
  </div>
</template>

<style scoped>
.civi-agencies {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.civi-agencies-hero {
  box-sizing: border-box;
  width: 100%;
  background-color: var(--civi-hero-bg);
  padding: 80px 24px;
}

.civi-agencies-hero__inner {
  box-sizing: border-box;
  width: 100%;
  max-width: var(--civi-hero-card-max-width);
  margin-left: auto;
  margin-right: auto;
}

.civi-agencies-hero__title {
  margin: 0;
  font-family: var(--civi-serif);
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  line-height: 1.3;
  color: #fff;
}

.civi-agencies__main {
  flex: 1 1 auto;
  box-sizing: border-box;
  width: 100%;
  padding: 40px 24px;
  background-color: #f0f0f0;
}

.civi-agencies__list {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 11px;
  width: 100%;
  max-width: var(--civi-hero-card-max-width);
  margin-left: auto;
  margin-right: auto;
}
</style>
