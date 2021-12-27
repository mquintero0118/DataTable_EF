<template>
  <BaseSidemenu>
    <slot />
  </BaseSidemenu>
</template>
<script>
import BaseSidemenu from './Base.vue';

export default {
  setup() {
  },
  components: { BaseSidemenu },
};
</script>
