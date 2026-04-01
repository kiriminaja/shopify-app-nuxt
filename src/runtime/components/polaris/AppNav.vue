<template>
  <s-app-nav v-bind="$attrs">
    <slot />
  </s-app-nav>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })
</script>
