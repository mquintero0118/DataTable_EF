<template>
  <div
    class="tab-pane fade"
    role="tabpanel"
    :id="'tab-pane-' + elementId"
    :aria-labelledby="`tab-${elementId}`"
    :class="{
      'show active': selectedTab === elementId,
    }"
  >
    <slot />
  </div>
</template>

<script>
import { uniqueId } from 'lodash';
import { getCurrentInstance, inject } from 'vue';

export default {
  name: 'tab-item',
  props: {
    id: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const elementId = props?.id || uniqueId();

    const updater = inject('updateNav');

    const selectedTab = inject('setSelectedTab');

    updater(elementId, getCurrentInstance());

    return { elementId, selectedTab };
  },
};
</script>
