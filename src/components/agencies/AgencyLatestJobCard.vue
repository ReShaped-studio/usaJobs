<script setup lang="ts">
import type { UsajobsJobSummary } from "@/api/usajobs/search";

defineProps<{
  job: UsajobsJobSummary;
}>();

function metaParts(job: UsajobsJobSummary): string[] {
  return [job.locationDisplay, job.gradeLabel].filter(Boolean);
}

function salaryParts(job: UsajobsJobSummary): string[] {
  return [job.salaryLabel, job.statusLabel, job.closesLabel].filter(Boolean);
}
</script>

<template>
  <a
    class="civi-agency-job-card"
    :href="job.positionUri"
    target="_blank"
    rel="noopener noreferrer"
  >
    <div class="civi-agency-job-card__body">
      <p class="civi-agency-job-card__title">{{ job.positionTitle }}</p>
      <div v-if="metaParts(job).length" class="civi-agency-job-card__line">
        <template v-for="(part, i) in metaParts(job)" :key="`m-${i}`">
          <span v-if="i > 0" class="civi-agency-job-card__dot" aria-hidden="true" />
          <span class="civi-agency-job-card__meta">{{ part }}</span>
        </template>
      </div>
      <div v-if="salaryParts(job).length" class="civi-agency-job-card__line civi-agency-job-card__line--muted">
        <template v-for="(part, i) in salaryParts(job)" :key="`s-${i}`">
          <span v-if="i > 0" class="civi-agency-job-card__dot" aria-hidden="true" />
          <span class="civi-agency-job-card__meta">{{ part }}</span>
        </template>
      </div>
    </div>
    <div class="civi-agency-job-card__chevron" aria-hidden="true">
      <svg width="24" height="24" viewBox="0 0 24 24" focusable="false">
        <path
          fill="currentColor"
          d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z"
        />
      </svg>
    </div>
  </a>
</template>

<style scoped>
.civi-agency-job-card {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-width: 0;
  flex: 1 1 0;
  padding: 24px;
  border: 2px solid var(--civi-browse-card-border);
  border-radius: 8px;
  background-color: #fff;
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.15s ease;
}

.civi-agency-job-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.civi-agency-job-card:focus {
  outline: 0.25rem solid #2491ff;
  outline-offset: 0.125rem;
}

.civi-agency-job-card__body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
  min-width: 0;
}

.civi-agency-job-card__title {
  margin: 0;
  font-family: var(--civi-ui-font);
  font-size: 16px;
  font-weight: 700;
  line-height: 1.62;
  color: #1b1b1b;
}

.civi-agency-job-card__title + .civi-agency-job-card__line {
  margin-top: 4px;
}

.civi-agency-job-card__line + .civi-agency-job-card__line {
  margin-top: 2px;
}

.civi-agency-job-card__line {
  box-sizing: border-box;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-width: 0;
  font-family: var(--civi-ui-font);
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: #1b1b1b;
  overflow: hidden;
}

.civi-agency-job-card__line--muted {
  color: var(--civi-browse-meta);
}

.civi-agency-job-card__meta {
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.civi-agency-job-card__dot {
  flex-shrink: 0;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: currentColor;
  opacity: 0.85;
}

.civi-agency-job-card__chevron {
  flex: 0 0 24px;
  width: 24px;
  height: 24px;
  color: #71767a;
}

.civi-agency-job-card__chevron svg {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
