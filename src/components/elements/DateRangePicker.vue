<template>
  <input
    :id="elementId"
    class="form-control isdaterangepicker"
    type="text"
    :value="value"
    :data-date-format="baseFormat"
  />
</template>

<script>
import { uniqueId } from 'lodash';
import { onMounted } from 'vue';
import moment from 'moment';
import $ from 'jquery';
import 'daterangepicker/daterangepicker';

/**
 * A component to select date and dates ranges
 * @displayName DateRangePicker
 */
export default {
  name: 'DateRangePicker',
  props: {
    /**
     * Identifier for the input container
     * If emprty a unique id will be generated
     * @default string ''
     */
    id: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * The input value
     * If empty the actual day will be de value (in formate (dd/mm/yyyy)
     * @default Date Actual date
     */
    value: {
      typeof: String,
      required: false,
      default: () => moment().format('DD/MM/YYYY'),
    },
    /**
     * Configuiration to be pass to the daterangepicker plugin
     * @see See [DateRangePicker](https://www.daterangepicker.com/#options)
     * @default object {}
     */
    config: {
      type: Object,
      required: false,
      default: () => {},
    },
    /**
     * Load a pre set options to the plugin
     * The default ranges are: `Ultimos 7 dias`,`Ultimos 30 dias`,`Este mes`,`Mes anterio`
     */
    showRanges: {
      type: Boolean,
      required: false,
      default: false,
    },
    attrs: {
      type: Object,
      default: () => {},
    },
  },
  emits: [
    'pickerShow',
    'pickerHide',
    'pickerShowCalendar',
    'pickerHideCalendar',
    'pickerApply',
    'pickerCancel',
  ],
  setup(props, context) {
    // If a id is not given set a unique ID
    const elementId = props.id || uniqueId();
    const baseFormat = 'DD/MM/YYYY';
    // Pre set a defautl configuration for plugin
    // Any of the values can be override in the config prop
    let baseConfig = {
      singleDatePicker: true,
      showDropdowns: true,
      opens: 'left',
      autoApply: true,
      minYear: 2000,
      maxYear: parseInt(moment().format('YYYY'), 10) + 1,
      locale: {
        format: baseFormat,
        separator: ' - ',
        applyLabel: 'Aplicar',
        cancelLabel: 'Cancelar',
        fromLabel: 'Desde',
        toLabel: 'Hasta',
        customRangeLabel: 'Personalizado',
        weekLabel: 'S',
        daysOfWeek: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
        monthNames: [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre',
        ],
        firstDay: 1,
      },
    };
    const ranges = {
      Hoy: [moment(), moment()],
      Ayer: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Ultimos 7 dias': [moment().subtract(6, 'days'), moment()],
      'Ultimos 30 dias': [moment().subtract(29, 'days'), moment()],
      'Este mes': [moment().startOf('month'), moment().endOf('month')],
      'Mes anterio': [
        moment()
          .subtract(1, 'month')
          .startOf('month'),
        moment()
          .subtract(1, 'month')
          .endOf('month'),
      ],
    };
    // Show the pre set ranges
    if (props.showRanges) {
      baseConfig.ranges = ranges;
    }
    // Merge default configuration and user config
    baseConfig = {
      ...baseConfig,
      ...props.config,
    };
    // Emit events
    function emittResponse(event, element, picker) {
      context.emit(event, element, picker);
    }

    onMounted(() => {
      const input = $(`#${elementId}`);
      input.data('date-format', baseConfig.locale.format ?? '');
      input
        .daterangepicker(baseConfig)
        .on('show.daterangepicker', (event, picker) => {
          /**
           * Date modal show.
           *
           * @event pickerShow
           * @property {object} event The event return from the plugin
           * @property {object} picker The instance for the result value
           */
          emittResponse('pickerShow', event, picker);
        })
        .on('hide.daterangepicker', (event, picker) => {
          /**
           * Date modal hide.
           *
           * @event pickerHide
           * @property {object} event The event return from the plugin
           * @property {object} picker The instance for the result value
           */
          emittResponse('pickerHide', event, picker);
        })
        .on('showCalendar.daterangepicker', (event, picker) => {
          /**
           * Date calendar modal is display.
           *
           * @event pickerShowCalendar
           * @property {object} event The event return from the plugin
           * @property {object} picker The instance for the result value
           */
          emittResponse('pickerShowCalendar', event, picker);
        })
        .on('hideCalendar.daterangepicker', (event, picker) => {
          /**
           * Date calendar modal is hide.
           *
           * @event pickerShowCalendar
           * @property {object} event The event return from the plugin
           * @property {object} picker The instance for the result value
           */
          emittResponse('pickerHideCalendar', event, picker);
        })
        .on('apply.daterangepicker', (event, picker) => {
          /**
           * When the apply button in the calendar is clicked
           *
           * @event pickerShowCalendar
           * @property {object} event The event return from the plugin
           * @property {object} picker The instance for the result value
           */
          emittResponse('pickerApply', event, picker);
        })
        .on('cancel.daterangepicker', (event, picker) => {
          /**
           * When the cancel button in the calendar is clicked
           *
           * @event pickerShowCalendar
           * @property {object} event The event return from the plugin
           * @property {object} picker The instance for the result value
           */
          emittResponse('pickerCancel', event, picker);
        });
    });

    return {
      elementId,
      baseFormat,
    };
  },
};
</script>

<style scoped lang="scss">
@import '~daterangepicker/daterangepicker.css';
</style>
