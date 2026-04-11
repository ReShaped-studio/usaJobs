<script setup lang="ts">
import { computed } from "vue";

import type { UsajobsJobSummary } from "@/api/usajobs/search";
import { usajobsSearchResultsUrl } from "@/api/usajobs/search";
import type { AgencyPageRow } from "@/composables/useAgenciesPage";
import { agencyLatestJobsFallback } from "@/data/agencyLatestJobsFallback";

import AgencyLatestJobCard from "./AgencyLatestJobCard.vue";

const props = defineProps<{
  row: AgencyPageRow;
}>();

const browseHref = computed(() => {
  const code = props.row.organizationCode;
  return code ? usajobsSearchResultsUrl(code) : undefined;
});

const initials = computed(() =>
  props.row.title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join(""),
);

/** Up to two cards: live API rows when present; otherwise Figma-style placeholders (links to agency search). */
const displayJobs = computed((): UsajobsJobSummary[] => {
  const jobs = props.row.latestJobs;
  const fb = agencyLatestJobsFallback(props.row.organizationCode);
  if (jobs.length >= 2) return jobs.slice(0, 2);
  if (jobs.length === 1) return [jobs[0]!];
  return fb;
});
</script>

<template>
  <article class="civi-agency-listing">
    <div class="civi-agency-listing__intro">
      <div class="civi-agency-listing__top">
        <div class="civi-agency-listing__head">
          <div class="civi-agency-listing__media" aria-hidden="true">
            <img
              v-if="row.imageUrl"
              class="civi-agency-listing__image"
              :src="row.imageUrl"
              alt=""
            />
            <span v-else class="civi-agency-listing__initials">{{ initials }}</span>
          </div>
          <div class="civi-agency-listing__details">
            <h2 class="civi-agency-listing__title">{{ row.title }}</h2>
            <div class="civi-agency-listing__meta-row">
              <span class="civi-agency-listing__meta">{{ row.kind }}</span>
              <span class="civi-agency-listing__meta-dot" aria-hidden="true" />
              <span class="civi-agency-listing__meta">
                {{ row.openPositions.toLocaleString() }} open positions
              </span>
            </div>
          </div>
        </div>
        <a
          v-if="browseHref"
          class="civi-agency-listing__browse"
          :href="browseHref"
          target="_blank"
          rel="noopener noreferrer"
        >
          Browse jobs
        </a>
      </div>

      <p v-if="row.mission" class="civi-agency-listing__mission">{{ row.mission }}</p>
    </div>

    <div class="civi-agency-listing__latest">
      <p class="civi-agency-listing__latest-label">Latest jobs</p>
      <div
        class="civi-agency-listing__job-grid"
        :class="{ 'civi-agency-listing__job-grid--one': displayJobs.length === 1 }"
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
.civi-agency-listing {
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

.civi-agency-listing__intro {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
}

.civi-agency-listing__top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.civi-agency-listing__head {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;
  flex: 1 1 auto;
}

.civi-agency-listing__media {
  flex: 0 0 54px;
  width: 54px;
  height: 54px;
  overflow: hidden;
  border-radius: 50%;
  background-color: #dfe5eb;
  display: flex;
  align-items: center;
  justify-content: center;
}

.civi-agency-listing__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.civi-agency-listing__initials {
  font-size: 0.875rem;
  font-weight: 700;
  color: #565c65;
}

.civi-agency-listing__details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
}

.civi-agency-listing__title {
  margin: 0;
  font-family: var(--civi-ui-font);
  font-size: 22px;
  font-weight: 700;
  line-height: 1.15;
  color: #1b1b1b;
}

.civi-agency-listing__meta-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
}

.civi-agency-listing__meta {
  font-family: var(--civi-ui-font);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.62;
  color: var(--civi-browse-meta);
  white-space: nowrap;
}

.civi-agency-listing__meta-dot {
  flex-shrink: 0;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: var(--civi-browse-meta);
}

.civi-agency-listing__browse {
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

.civi-agency-listing__browse:hover {
  background-color: #1a4480;
  color: #fff;
}

.civi-agency-listing__browse:focus {
  outline: 0.25rem solid #2491ff;
  outline-offset: 0.125rem;
}

.civi-agency-listing__mission {
  margin: 0;
  font-family: var(--civi-ui-font);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--civi-browse-meta);
}

.civi-agency-listing__latest {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 24px;
  border-top: 2px dashed var(--civi-browse-card-border);
  background-color: #fafafa;
}

.civi-agency-listing__latest-label {
  margin: 0;
  font-family: var(--civi-ui-font);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.28;
  color: #000;
}

.civi-agency-listing__job-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  width: 100%;
}

@media (min-width: 40em) {
  .civi-agency-listing__job-grid {
    grid-template-columns: 1fr 1fr;
  }

  .civi-agency-listing__job-grid--one {
    grid-template-columns: 1fr;
    max-width: min(100%, calc(50% - 4px));
  }
}
</style>
