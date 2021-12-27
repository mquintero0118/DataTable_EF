<template>
  <div class="accordion-item">
    <h2 class="accordion-header" :id="'heading' + elementId">
      <button
        class="accordion-button"
        type="button"
        data-bs-toggle="collapse"
        aria-expanded="true"
        :class="{
          collapsed: !open
        }"
        :data-bs-target="'#collapse' + elementId"
        :aria-controls="'collapse' + elementId"
      >
        <!-- @slot Slot for the header-->
        <slot name="title">
          {{ title }}
        </slot>
      </button>
    </h2>
    <div
      class="accordion-collapse collapse"
      :id="'collapse' + elementId"
      :class="{
        show: open
      }"
      :aria-labelledby="'heading' + elementId"
      :data-bs-parent="bsParent"
    >
      <div class="accordion-body">
        <!-- @slot Main content-->
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
import { getCurrentInstance } from 'vue';
import { uniqueId } from 'lodash';

/**
 * Accordion component
 * @displayName AccordionItem
 */
export default {
  props: {
    id: {
      /**
       * Identifier for select
       */
      type: String,
      required: false,
      default: '',
    },
    /**
     * State of the item
     * @values true, false
     */
    open: {
      type: Boolean,
      default: false,
    },
    /**
     * The accordion header
     */
    title: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const elementId = props.id || uniqueId();

    const parentId = getCurrentInstance().parent.ctx.elementId;
    const bsParent = parentId ? `#${parentId}` : null;

    return { elementId, bsParent };
  },
};
</script>
