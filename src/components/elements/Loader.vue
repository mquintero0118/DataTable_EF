<template>
  <div class="overlay" v-if="loading">
    <div class=" h-100 d-flex justify-content-center align-items-center">
      <!-- @slot Main content -->
      <slot>
        <div :class="`text-${color} spinner-${type}`" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    /**
     * If the loader shuld be display
    */
    loading: {
      type: Boolean,
      required: true,
      default: false,
    },
    /**
     * Defines the type of loading icon
     * @values border, grow
    */
    type: {
      type: String,
      required: false,
      default: 'border',
      validator(value) {
        return ['border', 'grow'].indexOf(value) !== -1;
      },
    },
    /**
     * Defines the color set of the loading icon
     * @values primary, secondary, success, warning, info, danger,light
    */
    color: {
      type: String,
      required: false,
      default: 'dark',
      validator(value) {
        // The value must match one of these strings
        return (
          [
            'primary',
            'secondary',
            'success',
            'warning',
            'info',
            'danger',
            'light',
            'dark',
          ].indexOf(value) !== -1
        );
      },
    },
  },
  setup() {},
};
</script>

<style scoped lang="scss">
.overlay.dark {
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
}
.overlay {
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.7);
}
</style>
