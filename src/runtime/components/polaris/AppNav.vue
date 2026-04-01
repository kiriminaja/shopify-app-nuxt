<template>
  <s-app-nav v-bind="$attrs">
    <slot />
  </s-app-nav>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShAppNav', inheritAttrs: false })
</script>
