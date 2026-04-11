<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";

const query = ref("");
const locationLabel = ref("Atlanta, GA");

const keywordMirrorRef = ref<HTMLElement | null>(null);
const keywordWidthPx = ref("auto");
const locationMirrorRef = ref<HTMLElement | null>(null);
const locationWidthPx = ref("auto");
const isNarrowViewport = ref(false);

let narrowMq: MediaQueryList | null = null;

const keywordMeasureText = computed(() =>
  query.value.length > 0 ? query.value : "Search for..."
);

const locationMeasureText = computed(() =>
  locationLabel.value.length > 0 ? locationLabel.value : "\u00a0"
);

function onSubmit(e: Event) {
  e.preventDefault();
}

function updateNarrowViewport() {
  if (typeof window === "undefined") return;
  narrowMq ??= window.matchMedia("(max-width: 40em)");
  isNarrowViewport.value = narrowMq.matches;
}

async function syncKeywordInputWidth() {
  await nextTick();
  if (isNarrowViewport.value) return;
  const mirror = keywordMirrorRef.value;
  if (!mirror || typeof document === "undefined") return;
  const w = Math.ceil(mirror.getBoundingClientRect().width) + 8;
  const remPx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  const maxPx = 40 * remPx;
  keywordWidthPx.value = `${Math.min(w, maxPx)}px`;
}

async function syncLocationInputWidth() {
  await nextTick();
  if (isNarrowViewport.value) return;
  const mirror = locationMirrorRef.value;
  if (!mirror || typeof document === "undefined") return;
  const w = Math.ceil(mirror.getBoundingClientRect().width) + 8;
  const remPx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  const maxPx = 16 * remPx;
  locationWidthPx.value = `${Math.min(w, maxPx)}px`;
}

function onNarrowMqChange() {
  updateNarrowViewport();
  void syncKeywordInputWidth();
  void syncLocationInputWidth();
}

watch(keywordMeasureText, () => {
  void syncKeywordInputWidth();
});

watch(locationMeasureText, () => {
  void syncLocationInputWidth();
});

watch(isNarrowViewport, (narrow) => {
  if (!narrow) {
    void syncKeywordInputWidth();
    void syncLocationInputWidth();
  }
});

onMounted(() => {
  updateNarrowViewport();
  narrowMq?.addEventListener("change", onNarrowMqChange);
  void syncKeywordInputWidth();
  void syncLocationInputWidth();
});

onUnmounted(() => {
  narrowMq?.removeEventListener("change", onNarrowMqChange);
});
</script>

<!-- Figma: usaJobs → Hero (node 36:806) — card 960×min 800; row = cluster + flex spacer + button -->
<template>
  <section class="civi-hero" aria-labelledby="hero-heading">
    <div class="civi-hero__inner">
      <div class="civi-hero__title-wrap">
        <h1 id="hero-heading" class="civi-hero__title">
          Find federal jobs by title, agency, series, or location
        </h1>
      </div>
      <form class="civi-hero__card" role="search" @submit="onSubmit">
        <div class="civi-hero__cluster">
          <div class="civi-hero__keyword-wrap">
            <label class="usa-sr-only" for="hero-query">Keywords</label>
            <input
              id="hero-query"
              v-model="query"
              class="civi-hero__keywords"
              type="text"
              inputmode="search"
              name="keywords"
              placeholder="Search for..."
              autocomplete="off"
              :style="isNarrowViewport ? { width: '100%' } : { width: keywordWidthPx }"
            />
            <span ref="keywordMirrorRef" class="civi-hero__keywords-mirror" aria-hidden="true">{{
              keywordMeasureText
            }}</span>
          </div>
          <div class="civi-hero__location-inline">
            <span class="civi-hero__in">in</span>
            <div class="civi-hero__chip">
              <label class="usa-sr-only" for="hero-location">Location</label>
              <div class="civi-hero__chip-wrap">
                <input
                  id="hero-location"
                  v-model="locationLabel"
                  class="civi-hero__chip-input"
                  type="text"
                  name="location"
                  autocomplete="address-level2"
                  :style="isNarrowViewport ? { width: '100%' } : { width: locationWidthPx }"
                />
                <span ref="locationMirrorRef" class="civi-hero__chip-input-mirror" aria-hidden="true">{{
                  locationMeasureText
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- Figma 36:809: empty flexible space between left group and button -->
        <div class="civi-hero__card-spacer" aria-hidden="true"></div>
        <button class="civi-hero__submit" type="submit">Search</button>
      </form>
    </div>
  </section>
</template>

<style scoped>
.civi-hero {
  box-sizing: border-box;
  width: 100%;
  background-color: var(--civi-hero-bg);
  color: #fff;
  padding-top: 80px;
  padding-bottom: 80px;
}

/* Match header: full-width band, content aligned to 1440 / 40px gutters */
.civi-hero__inner {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
  max-width: var(--civi-header-max-width);
  margin-left: auto;
  margin-right: auto;
  padding-left: 40px;
  padding-right: 40px;
}

.civi-hero__title-wrap {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  width: 100%;
}

.civi-hero__title {
  box-sizing: border-box;
  max-width: var(--civi-hero-title-max-width);
  margin: 0;
  font-family: var(--civi-serif);
  font-weight: 700;
  font-size: 24px;
  line-height: 1.3;
  text-align: center;
  color: #fff;
}

/* Figma 36:809: flex row + spacer (same as justify-between with stable vertical alignment) */
.civi-hero__card {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  width: 100%;
  max-width: var(--civi-hero-card-max-width);
  min-width: min(100%, var(--civi-hero-card-min-width));
  min-height: 0;
  padding: 16px 24px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}

.civi-hero__cluster {
  box-sizing: border-box;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 24px;
  min-width: 0;
  flex: 0 0 auto;
}

.civi-hero__keyword-wrap {
  position: relative;
  display: inline-block;
  max-width: min(40rem, 100%);
  vertical-align: middle;
}

.civi-hero__keywords-mirror {
  position: absolute;
  left: 0;
  top: 0;
  visibility: hidden;
  white-space: pre;
  pointer-events: none;
  padding: 12px 0;
  font-family: var(--civi-ui-font);
  font-size: 20px;
  font-weight: 400;
  line-height: 0.95;
  color: #000;
}

.civi-hero__card-spacer {
  flex: 1 1 auto;
  min-width: 0;
  height: 1px;
  align-self: center;
}

.civi-hero__keywords {
  box-sizing: border-box;
  display: block;
  flex: 0 0 auto;
  min-width: 0;
  max-width: 100%;
  margin: 0;
  padding: 12px 0;
  border: none;
  background: transparent;
  font-family: var(--civi-ui-font);
  font-size: 20px;
  font-weight: 400;
  line-height: 0.95;
  color: #000;
  appearance: none;
}

.civi-hero__keywords::placeholder {
  color: #000;
  opacity: 0.4;
}

.civi-hero__keywords:focus {
  outline: 2px solid #2491ff;
  outline-offset: 2px;
}

.civi-hero__location-inline {
  display: flex;
  flex-shrink: 0;
  flex-wrap: nowrap;
  align-items: center;
  gap: 8px;
}

.civi-hero__in {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  align-self: center;
  padding: 12px 0;
  font-family: var(--civi-ui-font);
  font-size: 20px;
  font-weight: 700;
  line-height: 0.95;
  color: #000;
}

.civi-hero__chip {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 12px 14px;
  background-color: var(--civi-hero-search-chip-bg);
  border-radius: 4px;
  min-width: 0;
}

.civi-hero__chip-wrap {
  position: relative;
  display: inline-block;
  max-width: min(16rem, 100%);
  vertical-align: middle;
}

.civi-hero__chip-input-mirror {
  position: absolute;
  left: 0;
  top: 0;
  visibility: hidden;
  white-space: pre;
  pointer-events: none;
  padding: 0;
  font-family: var(--civi-ui-font);
  font-size: 20px;
  font-weight: 400;
  line-height: 0.95;
  color: #000;
}

.civi-hero__chip-input {
  box-sizing: border-box;
  display: block;
  min-width: 0;
  max-width: 100%;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  font-family: var(--civi-ui-font);
  font-size: 20px;
  font-weight: 400;
  line-height: 0.95;
  text-align: left;
  color: #000;
  appearance: none;
}

.civi-hero__chip-input:focus {
  outline: none;
}

.civi-hero__chip:focus-within {
  outline: 2px solid #2491ff;
  outline-offset: 2px;
}

.civi-hero__submit {
  flex-shrink: 0;
  margin: 0;
  padding: 12px 16px;
  border: none;
  border-radius: 4px;
  background-color: var(--civi-hero-primary);
  font-family: var(--civi-ui-font);
  font-size: 16px;
  font-weight: 700;
  line-height: 0.95;
  color: #fff;
  cursor: pointer;
  white-space: nowrap;
}

.civi-hero__submit:hover {
  background-color: #1a4480;
}

.civi-hero__submit:focus {
  outline: 2px solid #2491ff;
  outline-offset: 2px;
}

@media (max-width: 63.99em) {
  .civi-hero {
    padding-top: 48px;
    padding-bottom: 48px;
  }

  .civi-hero__inner {
    padding-left: 24px;
    padding-right: 24px;
  }
}

/* Figma row layout: keep horizontal until very narrow viewports */
@media (max-width: 40em) {
  .civi-hero__card {
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: stretch;
    row-gap: 16px;
    min-width: 0;
  }

  .civi-hero__card-spacer {
    display: none;
  }

  .civi-hero__cluster {
    flex-wrap: wrap;
  }

  .civi-hero__keyword-wrap {
    width: 100%;
    max-width: 100%;
  }

  .civi-hero__chip-wrap {
    width: 100%;
    max-width: 100%;
  }

  .civi-hero__submit {
    width: 100%;
  }
}
</style>
