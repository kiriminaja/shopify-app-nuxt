<template>
  <ui-nav-menu v-bind="$attrs">
    <slot />
  </ui-nav-menu>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })
</script>
