<template>
  <transition name="slideup">
    <div
      v-if="showCard"
      class="card"
      :class="[
        {
          'card-outline': outline
        },
        `card-${type}`
      ]"
      :id="elementId"
    >
      <div class="card-header">
        {{ title }}
        <div class="float-end">
          <button
            v-if="canCollapse"
            type="button"
            class="btn btn-tool"
            data-bs-toggle="collapse"
            :data-bs-target="`#collapse-${elementId}`"
            aria-expanded="false"
            :aria-controls="`#collapse-${elementId}`"
            data-card-widget="collapse"
          >
            <i :class="`fas fa-${iconMinMaxButton}`"></i>
          </button>
          <button
            v-if="canClose"
            type="button"
            class="btn btn-tool"
            data-card-widget="remove"
            @click="showCard = false"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
      <div
        :id="`collapse-${elementId}`"
        :class="[
          {
            'collapse show': canCollapse
          },
          !outline ? `border border-${type}` : null
        ]"
      >
        <div class="card-body">
          <!-- @slot Use this slot body -->
          <slot name="default" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { uniqueId } from 'lodash';
import { ref, onMounted, onUnmounted } from 'vue';
import '@/assets/scss/elements/_card.scss';
// import Loader from '@/components/elements/Accordion/Loader.vue';

/**
 * Card/Box base on adminLTE implementarion
 * @displayName Card
 */
export default {
  name: 'Card',
  props: {
    /**
     * Identifier for the card container
     */
    id: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * The title placed in the card header
     */
    title: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * Defines the default color set the card can take
     * @values success, warning, danger, primary, default
     */
    type: {
      type: String,
      required: false,
      default: 'default',
      validator(value) {
        // The value must match one of these strings
        return (
          ['success', 'warning', 'danger', 'primary', 'default'].indexOf(
            value,
          ) !== -1
        );
      },
    },
    /**
     * Option to change de style of the card header
     */
    outline: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * If the button to collapse the card should be display or not
     */
    canCollapse: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * If the button to remove the card should be display or not
     */
    canClose: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['cardHidden', 'cardShown'],
  setup(props, context) {
    const showCard = ref(true);
    const iconMinMaxButton = ref('minus');

    const elementId = props.id || uniqueId();

    onMounted(() => {
      const collapseObj = document.getElementById(`collapse-${elementId}`);

      // Add event lister for card on hidden, emit event
      collapseObj.addEventListener('hidden.bs.collapse', (e) => {
        iconMinMaxButton.value = 'plus';
        /**
         * Carde close event.
         *
         * @event cardHidden
         * @property {string} content content of the first prop passed to the event
         * @property {array} example clicked element
         */
        context.emit('cardHidden', [e]);
      });
      // Add event lister for card on shown, emit event
      collapseObj.addEventListener('shown.bs.collapse', (e) => {
        iconMinMaxButton.value = 'minus';
        /**
         * Carde open event.
         *
         * @event cardShown
         * @property {string} content content of the first prop passed to the event
         * @property {array} example clicked element
         */
        this.$emit('cardShown', [e]);
      });
    });
    onUnmounted(() => {});
    return {
      showCard,
      iconMinMaxButton,
      elementId,
    };
  },
};
</script>
<style scoped lang="scss">
@import "@/assets/scss/elements/_card.scss";
</style>
