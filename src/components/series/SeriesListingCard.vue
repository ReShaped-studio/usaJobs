<script setup lang="ts">
import { computed } from "vue";

import type { UsajobsJobSummary } from "@/api/usajobs/search";
import { usajobsSearchResultsUrlForSeries } from "@/api/usajobs/search";
import type { SeriesPageRow } from "@/composables/useSeriesPage";
import { seriesLatestJobsFallback } from "@/data/seriesLatestJobsFallback";

import AgencyLatestJobCard from "@/components/agencies/AgencyLatestJobCard.vue";

const props = defineProps<{
  row: SeriesPageRow;
}>();

const browseHref = computed(() => usajobsSearchResultsUrlForSeries(props.row.code));

const displayJobs = computed((): UsajobsJobSummary[] => {
  const jobs = props.row.latestJobs;
  const fb = seriesLatestJobsFallback(props.row.code);
  if (jobs.length >= 2) return jobs.slice(0, 2);
  if (jobs.length === 1) return [jobs[0]!];
  return fb;
});
</script>

<template>
  <article class="civi-series-listing">
    <div class="civi-series-listing__intro">
      <div class="civi-series-listing__top">
        <div class="civi-series-listing__head">
          <div class="civi-series-listing__code-badge" aria-hidden="true">
            {{ row.code }}
          </div>
          <div class="civi-series-listing__details">
            <h2 class="civi-series-listing__title">{{ row.title }}</h2>
            <div class="civi-series-listing__meta-row">
              <span class="civi-series-listing__meta">{{ row.gradeRange }}</span>
              <span class="civi-series-listing__meta-dot" aria-hidden="true" />
              <span class="civi-series-listing__meta">
                {{ row.openPositions.toLocaleString() }} open positions
              </span>
            </div>
          </div>
        </div>
        <a
          class="civi-series-listing__browse"
          :href="browseHref"
          target="_blank"
          rel="noopener noreferrer"
        >
          Browse jobs
        </a>
      </div>

      <p v-if="row.description" class="civi-series-listing__description">{{ row.description }}</p>
    </div>

    <div class="civi-series-listing__latest">
      <p class="civi-series-listing__latest-label">Latest jobs</p>
      <div
        class="civi-series-listing__job-grid"
        :class="{ 'civi-series-listing__job-grid--one': displayJobs.length === 1 }"
      >
        <AgencyLatestJobCard
          v-for="(job, i) in displayJobs"
          :key="`${row.id}-job-${i}`"
          :job="job"
        />
      </div>
    </div>
  </article>
</template>

<style scoped>
.civi-series-listing {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
  overflow: hidden;
  border: 2px solid var(--civi-browse-card-border);
  border-radius: 8px;
  background-color: #fff;
}

.civi-series-listing__intro {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
}

.civi-series-listing__top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.civi-series-listing__head {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;
  flex: 1 1 auto;
}

.civi-series-listing__code-badge {
  box-sizing: border-box;
  flex: 0 0 54px;
  width: 54px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #f3f3f3;
  border-radius: 50%;
  background-color: #fff;
  font-family: var(--civi-ui-font);
  font-size: 12px;
  font-weight: 500;
  line-height: 1.15;
  color: #000;
}

.civi-series-listing__details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
}

.civi-series-listing__title {
  margin: 0;
  font-family: var(--civi-ui-font);
  font-size: 22px;
  font-weight: 700;
  line-height: 1.15;
  color: #1b1b1b;
}

.civi-series-listing__meta-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
}

.civi-series-listing__meta {
  font-family: var(--civi-ui-font);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.62;
  color: var(--civi-browse-meta);
  white-space: nowrap;
}

.civi-series-listing__meta-dot {
  flex-shrink: 0;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: var(--civi-browse-meta);
}

.civi-series-listing__browse {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 12px 20px;
  border-radius: 4px;
  background-color: var(--civi-hero-primary);
  font-family: var(--civi-ui-font);
  font-size: 16px;
  font-weight: 700;
  line-height: 0.95;
  color: #fff;
  text-decoration: none;
}

.civi-series-listing__browse:hover {
  background-color: #1a4480;
  color: #fff;
}

.civi-series-listing__browse:focus {
  outline: 0.25rem solid #2491ff;
  outline-offset: 0.125rem;
}

.civi-series-listing__description {
  margin: 0;
  font-family: var(--civi-ui-font);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--civi-browse-meta);
}

.civi-series-listing__latest {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 24px;
  border-top: 2px dashed var(--civi-browse-card-border);
  background-color: #fafafa;
}

.civi-series-listing__latest-label {
  margin: 0;
  font-family: var(--civi-ui-font);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.28;
  color: #000;
}

.civi-series-listing__job-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  width: 100%;
}

@media (min-width: 40em) {
  .civi-series-listing__job-grid {
    grid-template-columns: 1fr 1fr;
  }

  .civi-series-listing__job-grid--one {
    grid-template-columns: 1fr;
    max-width: min(100%, calc(50% - 4px));
  }
}
</style>
