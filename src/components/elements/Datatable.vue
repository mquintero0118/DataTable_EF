<template>
  <div class="data-table-wrapper">
    <table class="table table-hover row-border" :id="id" v-once>
      <thead></thead>
      <tbody>
        <tr></tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// Datatable Modules  node_modules/
import 'datatables.net-bs4/js/dataTables.bootstrap4';

import $ from 'jquery';
import {
  inject, onMounted, reactive, watch,
} from 'vue';

/**
 * Datatable using bs5
 * @displayName Datatable
 */
export default {
  name: 'datatable',
  props: {
    /**
     * Identifier for the table componer.
     */
    id: {
      type: String,
      required: true,
    },
    /**
     * String to be display on top of the table.
     */
    title: {
      type: String,
      required: false,
    },
    /**
     * Array of string for the column names.
     */
    headers: {
      type: Array,
      required: true,
    },
    /**
     * Array that represent each row of the table.
     */
    rows: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
    /**
     * Datatable configuratio to be pass.
     * @see See [Datatable..net](https://datatables.net/manual/options)
     */
    config: {
      type: Object,
      required: false,
      default() {
        return {};
      },
    },
    /**
     * An array compose of objects in the format of `trigger` `selector` `callbackFn`.
     * For each element in the array a listener will be added
     */
    methods: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
  },
  emits: ['error.dt', 'draw.dt'],
  setup(props) {
    const $emitter = inject('$emitter');

    // Define variables
    let datatable;
    const rows = reactive(props.rows);
    const headers = reactive(props.headers);

    // Default Datatable configuration
    let defaultConfig = reactive({
      paging: true,
      ordering: true,
      info: true,
      autoWidth: true,
      lengthMenu: [
        [10, 25, 50, -1],
        [10, 25, 50, 'Todos'],
      ],
      displayLength: 10,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json',
      },
      deferRender: false,
      responsive: true,
      fixedHeader: true,
      scrollY: true,
      scroller: {
        loadingIndicator: true,
      },
      rowId:
        rows !== undefined && typeof rows[0] === 'object'
          ? Object.keys(rows[0])[0]
          : 0, // set defautl tr id to the first element
    });

    // Merge default configuration and user config
    defaultConfig = {
      ...defaultConfig,
      ...props.config,
    };

    if (defaultConfig.columns) {
      delete defaultConfig.columns;
    }
    if (rows !== undefined) {
      defaultConfig.data = rows;
    }
    defaultConfig.columns = headers;

    onMounted(() => {
      // Init datatable
      datatable = $(`#${props.id}`)
        .on('error.dt', (e, settings, techNote, message) => {
          /**
           * Triggers when the datatable plugin throws an error
           * @event error.dt
           * @property {object} e The datatable obj
           * @property {object} settings Current set of setting
           * @property {object} techNote References of the error
           * @property {string} message The actual message error
           */
          $emitter.emit('error.dt', [e, settings, techNote, message]);
        })
        .on('draw.dt', (e, settings) => {
          /**
           * Triggers when the datatable plugin draws in the dom
           * @event draw.dt
           * @property {object} e The datatable obj
           * @property {object} settings Current set of setting
           */
          $emitter.emit('draw.dt', [e, settings]);
        })
        .DataTable(defaultConfig);

      props.methods.forEach((listener) => {
        datatable.on(listener.trigger, listener.selector, listener.callback);
      });

      // Catch datatable error
      $.fn.dataTable.ext.errMode = (settings, helpPage, message) => {
        $emitter.emit('error.dt', [message]);
      };
    });

    watch(rows, (currentValue) => {
      // If the row data change, re draw the table without changing the page
      datatable.clear();
      datatable.rows.add(currentValue);
      datatable.draw(false);
    });
  },
};
</script>

<style scoped lang="scss">
@import "~datatables.net-bs4/css/dataTables.bootstrap4.css";

.table {
  width: 100%;
  max-height: 400px;
}

.data-table-wrapper {
  position: relative;
  clear: both;
  background-color: white;
  padding: 1.5rem;
  border-radius: 3px;
  margin-top: 5px;
}
</style>
