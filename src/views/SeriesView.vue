<script setup lang="ts">
import CiviHeader from "@/components/civi/CiviHeader.vue";
import SeriesListingCard from "@/components/series/SeriesListingCard.vue";
import { useSeriesPage } from "@/composables/useSeriesPage";

const { rows, loading } = useSeriesPage();
</script>

<template>
  <div class="civi-series">
    <a class="usa-skipnav" href="#main-content">Skip to main content</a>
    <CiviHeader />
    <section class="civi-series-hero" aria-labelledby="series-page-title">
      <div class="civi-series-hero__inner">
        <h1 id="series-page-title" class="civi-series-hero__title">Browse jobs by series</h1>
      </div>
    </section>
    <p v-if="loading" class="usa-sr-only" role="status" aria-live="polite">Loading series</p>
    <main id="main-content" class="civi-series__main">
      <div class="civi-series__list">
        <SeriesListingCard v-for="row in rows" :key="row.id" :row="row" />
      </div>
    </main>
  </div>
</template>

<style scoped>
.civi-series {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.civi-series-hero {
  box-sizing: border-box;
  width: 100%;
  background-color: var(--civi-hero-bg);
  padding: 80px 24px;
}

.civi-series-hero__inner {
  box-sizing: border-box;
  width: 100%;
  max-width: var(--civi-hero-card-max-width);
  margin-left: auto;
  margin-right: auto;
}

.civi-series-hero__title {
  margin: 0;
  font-family: var(--civi-serif);
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  line-height: 1.3;
  color: #fff;
}

.civi-series__main {
  flex: 1 1 auto;
  box-sizing: border-box;
  width: 100%;
  padding: 40px 24px;
  background-color: #f0f0f0;
}

.civi-series__list {
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
