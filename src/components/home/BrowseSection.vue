<script setup lang="ts">
import { RouterLink } from "vue-router";
import type { RouteLocationRaw } from "vue-router";

defineProps<{
  id: string;
  title: string;
  viewAllTo: RouteLocationRaw;
  viewAllLabel?: string;
}>();
</script>

<!-- Figma: usaJobs → agencies section (node 36:822); reuse for Series / Locations -->
<template>
  <section class="civi-browse-section" :aria-labelledby="id">
    <div class="civi-browse-section__inner">
      <div class="civi-browse-section__head">
        <h2 :id="id" class="civi-browse-section__title">
          <RouterLink class="civi-browse-section__title-link" :to="viewAllTo">
            <span class="civi-browse-section__title-text">{{ title }}</span>
            <svg
              class="civi-browse-section__title-chevron"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path
                fill="currentColor"
                d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z"
              />
            </svg>
          </RouterLink>
        </h2>
      </div>
      <div class="civi-browse-section__grid">
        <slot />
        <RouterLink class="civi-browse-section__view-all" :to="viewAllTo">
          {{ viewAllLabel ?? "View all" }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.civi-browse-section {
  box-sizing: border-box;
  width: 100%;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.civi-browse-section__inner {
  box-sizing: border-box;
  width: 100%;
  max-width: var(--civi-header-max-width);
  margin-left: auto;
  margin-right: auto;
  padding-left: 40px;
  padding-right: 40px;
}

.civi-browse-section__head {
  margin-bottom: 11px;
}

.civi-browse-section__title {
  margin: 0;
}

.civi-browse-section__title-link {
  display: inline-flex;
  align-items: center;
  gap: 0;
  color: #000;
  text-decoration: none;
  font-family: var(--civi-ui-font);
  font-size: 16px;
  font-weight: 600;
  line-height: 1.28;
}

.civi-browse-section__title-link:hover {
  text-decoration: underline;
}

.civi-browse-section__title-text {
  white-space: nowrap;
}

.civi-browse-section__title-chevron {
  flex-shrink: 0;
  display: block;
}

.civi-browse-section__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  width: 100%;
}

.civi-browse-section__view-all {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 102px;
  padding: 24px;
  border: 2px solid var(--civi-browse-view-all-border);
  border-radius: 8px;
  background-color: #fff;
  color: #005ea2;
  font-family: var(--civi-ui-font);
  font-size: 16px;
  font-weight: 600;
  line-height: 1.28;
  text-decoration: none;
}

.civi-browse-section__view-all:hover {
  text-decoration: underline;
}

.civi-browse-section__view-all:focus {
  outline: 2px solid #2491ff;
  outline-offset: 2px;
}

@media (max-width: 40em) {
  .civi-browse-section__inner {
    padding-left: 24px;
    padding-right: 24px;
  }

  .civi-browse-section__grid {
    grid-template-columns: 1fr;
  }
}
</style>
