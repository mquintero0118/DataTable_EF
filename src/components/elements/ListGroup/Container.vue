<template>
  <div>
    <ul
      v-if="!numered"
      :id="elementId"
      class="list-group "
      :class="{ 'list-group-flush': flush }"
    >
    <!-- @slot Main content -->
      <slot />
    </ul>
  </div>
</template>

<script>
import { uniqueId } from 'lodash';
/**
 * Listr group container
 * @displayName ListGroupWrapper
 * @version 1.0.0
 */
export default {
  name: 'ListGroupWrapper',
  props: {
    /**
     * Identifier for the container
     */
    id: {
      type: String,
    },
    /**
     * Defines if the list shuld be numerated
     * @values boolean
     * @see {@link https://getbootstrap.com/docs/5.1/components/list-group/#numbered}
     */
    numered: {
      type: Boolean,
      default: false,
    },
    /**
     * Remove the top border and both sides bordes
     * @values boolean
     * @see {@link https://getbootstrap.com/docs/5.1/components/list-group/#flush}
     */
    flush: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const elementId = props.id || uniqueId();
    return { elementId };
  },
};
</script>

<style></style>
