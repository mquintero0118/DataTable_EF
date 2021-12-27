<template>
  <div class="accordion"
    :id="elementId"
  >
    <slot />
  </div>
</template>
<script>
import { uniqueId } from 'lodash';

/**
 * Wrapper for the accordion component
 * @displayName AccordionWrapper
 */

export default {
  props: {
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const elementId = !props.multiple ? `accordion${uniqueId()}` : null;

    return { elementId };
  },
};
</script>
