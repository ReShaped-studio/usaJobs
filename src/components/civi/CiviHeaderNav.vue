<script setup lang="ts">
import { RouterLink } from "vue-router";

import type { CiviNavItem } from "@/constants/navigation";

defineProps<{
  items: CiviNavItem[];
  activeName?: string;
}>();
</script>

<template>
  <nav class="civi-header-nav" aria-label="Primary">
    <ul class="civi-header-nav__list">
      <li
        v-for="item in items"
        :key="item.name"
        class="civi-header-nav__item"
        :class="{
          'civi-header-nav__item--home': item.name === 'home',
          'civi-header-nav__item--active': activeName === item.name,
        }"
      >
        <RouterLink
          :to="item.to"
          class="civi-header-nav__link"
          :class="{ 'civi-header-nav__link--active': activeName === item.name }"
        >
          {{ item.label }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.civi-header-nav {
  position: absolute;
  left: calc(50% + 0.5px);
  top: 0;
  bottom: 0;
  z-index: 2;
  display: flex;
  align-items: stretch;
  transform: translateX(-50%);
  pointer-events: none;
}

.civi-header-nav * {
  pointer-events: auto;
}

.civi-header-nav__list {
  display: flex;
  flex-wrap: nowrap;
  align-items: stretch;
  gap: 8px;
  height: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
}

.civi-header-nav__item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  border-radius: 4px;
}

.civi-header-nav__item--home {
  position: relative;
  border-radius: 8px;
}

.civi-header-nav__link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-height: 44px;
  padding: 0;
  font-family: var(--civi-ui-font);
  font-size: 16px;
  font-weight: 500;
  line-height: 0.95;
  color: #fff;
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.15s ease;
}

.civi-header-nav__link:hover {
  opacity: 1;
}

.civi-header-nav__link--active {
  opacity: 1;
}

.civi-header-nav__item--active::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 69px;
  height: 2px;
  margin-left: -34.5px;
  border-radius: 4px;
  background-color: var(--civi-nav-active-line);
}

@media (max-width: 63.99em) {
  .civi-header-nav {
    position: static;
    left: auto;
    top: auto;
    transform: none;
    width: 100%;
    pointer-events: auto;
  }

  .civi-header-nav__list {
    flex-wrap: wrap;
    justify-content: center;
  }

}
</style>
