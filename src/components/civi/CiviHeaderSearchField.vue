<script setup lang="ts">
const model = defineModel<string>({ default: "" });

defineProps<{
  inputId?: string;
}>();
</script>

<template>
  <div class="civi-header-search">
    <label class="usa-sr-only" :for="inputId ?? 'civi-header-search'">Search</label>
    <input
      :id="inputId ?? 'civi-header-search'"
      v-model="model"
      class="civi-header-search__input"
      type="search"
      name="q"
      placeholder="Search..."
      autocomplete="off"
    />
  </div>
</template>

<style scoped>
.civi-header-search {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  flex: 0 0 190px;
  width: 190px;
  max-width: 100%;
}

.civi-header-search__input {
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 10px 12px;
  font-family: var(--civi-ui-font);
  font-size: 16px;
  font-weight: 500;
  line-height: 0.95;
  color: #1b1b1b;
  background-color: #fff;
  border: none;
  border-radius: 4px;
  box-shadow: none;
}

.civi-header-search__input::placeholder {
  color: var(--civi-search-placeholder);
}

.civi-header-search__input:focus {
  outline: 2px solid #2491ff;
  outline-offset: 2px;
}

@media (max-width: 63.99em) {
  .civi-header-search {
    align-self: center;
    align-items: center;
    flex-basis: auto;
    width: 100%;
    max-width: 190px;
  }
}
</style>
