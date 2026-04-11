<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
import type { RouteLocationRaw } from "vue-router";

const props = withDefaults(
  defineProps<{
    title: string;
    metaLine: string;
    subLine: string;
    variant: "agency" | "series" | "location";
    to: RouteLocationRaw;
    code?: string;
    initials?: string;
    imageUrl?: string;
  }>(),
  {
    code: "",
    initials: "",
    imageUrl: "",
  },
);

const displayInitials = computed(() => {
  if (props.initials) return props.initials;
  return props.title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
});

const showMetaDot = computed(() => Boolean(props.metaLine && props.subLine));
</script>

<!-- Figma: usaJobs → Agency card (node 36:829+); same shell for series / location -->
<template>
  <RouterLink class="civi-browse-card-link" :to="to">
    <article class="civi-browse-card">
      <div class="civi-browse-card__content">
        <div class="civi-browse-card__media" aria-hidden="true">
          <img
            v-if="imageUrl"
            class="civi-browse-card__image"
            :src="imageUrl"
            alt=""
          />
          <span v-else-if="variant === 'series'" class="civi-browse-card__code">{{ code }}</span>
          <span v-else class="civi-browse-card__initials">{{ displayInitials }}</span>
        </div>
        <div class="civi-browse-card__body">
          <h3 class="civi-browse-card__title">{{ title }}</h3>
          <div v-if="metaLine || subLine" class="civi-browse-card__meta-row">
            <span v-if="metaLine" class="civi-browse-card__meta-text">{{ metaLine }}</span>
            <span
              v-if="showMetaDot"
              class="civi-browse-card__meta-dot"
              aria-hidden="true"
            />
            <span v-if="subLine" class="civi-browse-card__meta-text">{{ subLine }}</span>
          </div>
        </div>
      </div>
      <div class="civi-browse-card__chevron" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" focusable="false">
          <path
            fill="currentColor"
            d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z"
          />
        </svg>
      </div>
    </article>
  </RouterLink>
</template>

<style scoped>
.civi-browse-card-link {
  display: block;
  height: 100%;
  min-width: 0;
  text-decoration: none;
  color: inherit;
}

.civi-browse-card-link:focus {
  outline: 0.25rem solid #2491ff;
  outline-offset: 0.125rem;
}

.civi-browse-card {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 16px;
  min-height: 0;
  height: 100%;
  padding: 24px;
  border: 2px solid var(--civi-browse-card-border);
  border-radius: 8px;
  background-color: #fff;
  transition: box-shadow 0.15s ease;
}

.civi-browse-card-link:hover .civi-browse-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.civi-browse-card__content {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  gap: 16px;
  min-width: 0;
}

.civi-browse-card__media {
  flex: 0 0 54px;
  width: 54px;
  height: 54px;
  overflow: hidden;
  background-color: #dfe5eb;
  display: flex;
  align-items: center;
  justify-content: center;
}

.civi-browse-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.civi-browse-card__code {
  font-size: 0.75rem;
  font-weight: 700;
  color: #1b1b1b;
  text-align: center;
  padding: 0 4px;
  line-height: 1.2;
}

.civi-browse-card__initials {
  font-size: 0.875rem;
  font-weight: 700;
  color: #565c65;
}

.civi-browse-card__body {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
}

.civi-browse-card__title {
  margin: 0;
  width: 100%;
  font-family: var(--civi-ui-font);
  font-size: 22px;
  font-weight: 700;
  line-height: 1.15;
  color: #1b1b1b;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.civi-browse-card__meta-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
  width: 100%;
}

.civi-browse-card__meta-text {
  font-family: var(--civi-ui-font);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.62;
  color: var(--civi-browse-meta);
  white-space: nowrap;
}

.civi-browse-card__meta-dot {
  flex-shrink: 0;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: var(--civi-browse-meta);
}

.civi-browse-card__chevron {
  flex: 0 0 24px;
  width: 24px;
  height: 24px;
  color: #71767a;
}

.civi-browse-card__chevron svg {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
