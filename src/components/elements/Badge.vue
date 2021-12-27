<template>
  <span class="badge" :class="[badgeClass, { 'rounded-pill': pill }]" style="width: auto;">
    <slot/>
  </span>
</template>
<script>
import { computed } from 'vue';
/**
 * Basic BS Badge component
 * @displayName Badge
 * @version 1.0.0
 */
export default {
  name: 'Badge',
  props: {
    /**
     * Defines the default color set the badge can take
     * @values primary, secondary, success, danger, warning, info, light, dark
    */
    bg: {
      type: String,
      default: 'secondary',
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
     * Defines the type of badge to pill
     * @value boolean
    */
    pill: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const badgeClass = computed(() => {
      const invertIn = ['light'];
      return `bg-${props.bg}${invertIn.indexOf(props.bg) > -1 ? ' text-dark' : ''}`;
    });

    return {
      badgeClass,
    };
  },
};
</script>
