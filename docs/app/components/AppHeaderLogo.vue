<script setup lang="ts">
const config = useRuntimeConfig()
</script>

<template>
  <div class="flex items-center gap-2.5 text-base">
    <Icon name="ic:baseline-shopify" class="size-7 text-primary" />
    <p class="mt-0.5">Shopify <span class="font-normal">App Nuxt</span></p>
    <UBadge class="rounded-full" size="md" color="primary" variant="subtle">
      v{{ config.public.version }}
    </UBadge>
  </div>
</template>
