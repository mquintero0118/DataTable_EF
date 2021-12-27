<template>
  <div ref="root" class="offcanvas" :class="`offcanvas-${side === 'left' ? 'start' : 'end'}`"
    data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">Hola mundo</h5>
      <button type="button" class="btn-close text-reset"
        data-bs-dismiss="offcanvas" aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <slot />
    </div>
  </div>
</template>
<script>
import { ref, inject, onMounted } from 'vue';

import { Offcanvas } from 'bootstrap';

export default {
  props: {
    side: { type: String, default: 'left' },
  },
  setup(props) {
    const $emitter = inject('$emitter');

    const root = ref(null);
    let bsOffcanvas;

    $emitter.on(`sidemenu.open.${props.side}`, () => {
      bsOffcanvas.show();
    });

    $emitter.on(`sidemenu.close.${props.side}`, () => {
      bsOffcanvas.show();
    });

    onMounted(() => {
      bsOffcanvas = new Offcanvas(root.value);
    });

    return { root };
  },
};
</script>
<style lang="scss" scoped>
.offcanvas {
  width: 280px;
}
</style>
