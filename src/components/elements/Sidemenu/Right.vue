<template>
  <BaseSidemenu side="right">
    <slot></slot>
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
