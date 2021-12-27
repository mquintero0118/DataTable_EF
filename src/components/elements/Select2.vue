<template>
  <select :id="elementId" style="width:100%" > </select>
</template>

<script>
import {
  ref, onMounted, onUnmounted, watch,
} from 'vue';
import { uniqueId } from 'lodash';
import $ from 'jquery';

// Select2 Modules  node_modules/
import 'select2/dist/js/select2.full.min';

/**
 * Select2 using bs5
 * @displayName Select2
 * @version 1.0.0
 */
export default {
  name: 'Select2',
  props: {
    id: {
      /**
       * Identifier for select
       */
      type: String,
      required: false,
      default: '',
    },
    config: {
      /**
       * Base configuration passed to the select2 plugin
       * @values any select2 attibute
       * @see {@link https://select2.org/configuration/options-api}
       */
      type: Object,
      required: false,
      default() {
        return {};
      },
    },
    value: {
      /**
       * Defautl selected element
       */
      required: false,
      default: '',
    },
    options: {
      /**
       * Values to be transform to a <option> element
       */
      type: Array,
      required: false,
      default: () => [],
    },
  },
  emits: ['select2Select', 'select2Change', 'select2Clear', 'select2Unselect'],
  setup(props, context) {
    // Set unique id if not gived one
    const elementId = props.id || uniqueId();
    const data = ref([]);
    /**
     * Set a basic configuration for select2
     * The bootstrap theme is loaded from another componet [select2-bootstrap-5-theme]
     */
    let baseConfig = {
      theme: 'bootstrap-5',
      placeholder: {
        id: '', // the value of the option
        text: 'Select...',
      },
    };

    // Merge user configa and base config
    baseConfig = {
      ...baseConfig,
      ...props.config,
    };

    // Parse Array/Object option into the select2 format
    const parseOptions = (options) => {
      data.value = [];
      // Generate the <option> array
      if (!baseConfig.ajax) {
        options.forEach((e) => {
          const key = Object.keys(e)[0];
          const value = e[key];
          // Check if optgroup is needed
          if (Array.isArray(value)) {
            const group = {
              text: key,
              children: [],
            };
            // Iterate over childes
            value.forEach((k) => {
              const innerKey = Object.keys(k)[0];
              const innerValue = k[innerKey];
              group.children.push({
                id: innerKey,
                text: innerValue,
              });
            });
            data.value.push(group);
          } else {
            data.value.push({
              id: key,
              text: value,
            });
          }
        });
      }
      return data.value;
    };

    baseConfig.data = parseOptions(props.options);

    // Function to emmit to parent an event
    const emittResponse = (event, options) => {
      context.emit(event, options);
    };

    // Watch change in options prop and re construct select
    watch(() => props.options, (newValue) => {
      // Check  if select data is base on ajax call
      if (baseConfig.ajax) {
        return;
      }
      // Clear select2 data
      $(`#${elementId}`).empty().trigger('change');
      // Generate new <option> list
      baseConfig.data = parseOptions(newValue);
      // Re initialize select2
      $(`#${elementId}`).select2(baseConfig);
    });

    // Watch change in value prop and trigger change
    watch(() => props.value, (newValue) => {
      // Change select2 value
      $(`#${elementId}`).val(newValue).trigger('change');
    });

    onMounted(() => {
      // Attach modal dropdown to parent modal or document body
      baseConfig.dropdownParent = $(`#${elementId}`).closest('.modal').length > 0 ? $(`#${elementId}`).closest('.modal') : null;
      // Creat an instance of Select2
      const selectObjs = $(`#${elementId}`).select2(baseConfig);
      // Set default option
      selectObjs.val(props.value);
      /*
       * Add listener from JS @see {@link https://select2.org/programmatic-control/events} for more references
       */
      selectObjs
        .on('select2:select', (e) => {
          /**
           * An option from the dropdown was selected
           * @event select2Select
           */
          emittResponse('select2Select', e);
        })
        .on('change.select2', (e) => {
          /**
           * The <select> values has change
           * @event select2Change
           */
          emittResponse('select2Change', e);
        })
        .on('select2:clear', (e) => {
          /**
           * All the options wher clear
           * @event select2Clear
           */
          emittResponse('select2Clear', e);
        })
        .on('select2:unselect', (e) => {
          /**
           * When the select is multiple and a option was removed
           * @event select2Unselect
           */
          emittResponse('select2Unselect', e);
        });
      selectObjs.trigger('change');
    });

    onUnmounted(() => {
      $(`#${elementId}`).select2('destroy');
    });
    return {
      elementId,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~select2/dist/css/select2.min.css";
@import "~select2-bootstrap-5-theme/dist/select2-bootstrap-5-theme.min.css";
</style>
