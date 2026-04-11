<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <main id="main-content" class="usa-section">
    <div class="grid-container">
      <h1 class="usa-heading margin-top-4">{{ title }}</h1>
      <p>This section will list all {{ title.toLowerCase() }}.</p>
    </div>
  </main>
</template>
