<template>
  <div
    class="alert"
    role="alert"
    :class="[`alert-${type}`, { 'alert-dismissible fade show': dismissible }]"
  >
    <h4 class="alert-heading" v-if="hasHeaderSlot">
      <!-- @slot Header content -->
      <slot name="header" />
    </h4>
    <i v-if="icon" :class="`me-1 fas fa-${icon}`"></i>
    <!-- @slot Main item content -->
    <slot />
    <button
      v-if="dismissible"
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    ></button>
  </div>
</template>
<script>
import { computed } from 'vue';
/**
 * Basic BS Alert component
 * @displayName Alert
 * @version 1.0.0
 */
export default {
  name: 'Alert',
  props: {
    /**
     * Defines alert component can be dismiss from the DOM
     */
    dismissible: {
      type: Boolean,
      default: false,
    },
    /**
     * Defines the default color set the alert can take
     * @values primary, secondary, success, danger, warning, info, light, dark
    */
    type: {
      type: String,
      default: 'primary',
      validator(value) {
        // The value must match one of these strings
        return (
          ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'].indexOf(
            value,
          ) !== -1
        );
      },
    },
    /**
     * Prepend a fa icon to the main content
     * @value any `fa-icon class`
     * @see {@link https://fontawesome.com/}
    */
    icon: {
      type: String,
      default: '',
    },
  },
  setup(props, context) {
    const hasHeaderSlot = computed(() => !!context.slots.header);

    return { hasHeaderSlot };
  },
};
</script>
