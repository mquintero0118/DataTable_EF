<template>
  <footer class="bg-light text-center
    text-lg-start border-top shadow"
  >
    <div class="text-center p-2">
      © 2020 Copyright:
      <a class="text-dark" href="https://www.enviaflores.com/">Enviaflores.com</a>
    </div>
  </footer>
</template>
<script>
import { onUnmounted, onMounted } from 'vue';

export default {
  name: 'Footer',
  setup() {
    onMounted(() => {
      document.body.classList.add('with-footer');
    });

    onUnmounted(() => {
      document.body.classList.remove('with-footer');
    });
  },
};
</script>
<style lang="scss" scoped>
.with-sidebar {
  footer {
    padding-left: $sidebar-width;
  }
}
</style>
