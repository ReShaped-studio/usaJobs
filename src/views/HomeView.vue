<script setup lang="ts">
import CiviHeader from "@/components/civi/CiviHeader.vue";
import BrowseCard from "@/components/home/BrowseCard.vue";
import BrowseSection from "@/components/home/BrowseSection.vue";
import HeroSearch from "@/components/home/HeroSearch.vue";
import { useHomeBrowseCounts } from "@/composables/useHomeBrowseCounts";

const { agencies, series, locations, loading } = useHomeBrowseCounts();
</script>

<template>
  <div class="civi-home">
    <a class="usa-skipnav" href="#main-content">Skip to main content</a>
    <CiviHeader />
    <HeroSearch />
    <p v-if="loading" class="usa-sr-only" role="status" aria-live="polite">Loading job counts</p>
    <main id="main-content">
      <BrowseSection id="browse-agencies" title="Agencies" :view-all-to="{ name: 'agencies' }">
        <BrowseCard
          v-for="a in agencies"
          :key="a.id"
          variant="agency"
          :title="a.title"
          :meta-line="a.kind"
          :sub-line="`${a.openPositions.toLocaleString()} open positions`"
          :to="{ name: 'agencies' }"
        />
      </BrowseSection>

      <BrowseSection id="browse-series" title="Series" :view-all-to="{ name: 'series' }">
        <BrowseCard
          v-for="s in series"
          :key="s.id"
          variant="series"
          :code="s.code"
          :title="s.title"
          :meta-line="s.gradeRange"
          :sub-line="`${s.openPositions.toLocaleString()} open positions`"
          :to="{ name: 'series' }"
        />
      </BrowseSection>

      <BrowseSection id="browse-locations" title="Locations" :view-all-to="{ name: 'locations' }">
        <BrowseCard
          v-for="loc in locations"
          :key="loc.id"
          variant="location"
          :title="loc.label"
          :meta-line="loc.remoteAvailable ? 'Remote available' : 'On-site'"
          :sub-line="`${loc.openPositions.toLocaleString()} open positions`"
          :to="{ name: 'locations' }"
        />
      </BrowseSection>
    </main>
  </div>
</template>

<style scoped>
.civi-home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
