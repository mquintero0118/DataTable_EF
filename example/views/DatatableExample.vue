<template>
  <div class="container-fluid">
    <h1>Ejemplo de datatable</h1>
    <datatable
      id="table_example"
      :headers="headers1"
      :rows="dataRows1"
      :methods="methods"
    />
    <datatable
      id="table_example_json"
      :headers="ajaxHeader"
      :config="ajaxConfig"
      :methods="methodsAjax"
    />
  </div>
</template>

<script>
import { inject } from 'vue';
import Datatable from '@/components/elements/Datatable.vue';

export default {
  name: 'DatatableExample',
  components: { Datatable },

  data() {
    return {
      headers1: [
        {
          title: 'Name',
          mDataProp: 0, // if object ame of propery, if array position
          sDefaultContent: '',
          class: 'center',
          render: (data, type, row) => {
            let id = data;
            if (type === 'display') {
              id = id
                ? `<button class="btn btn-primary btn-sm btn-action" style="color:white;">${row[0]}</button>`
                : 'N/A';
            }
            return id;
          },
        },
        {
          title: 'Position',
          bSortable: false,
        },
        {
          title: 'Office',
          bSortable: false,
        },
        {
          title: 'Extn.',
          bSortable: false,
        },
        {
          title: 'Start date',
          bSortable: false,
        },
        {
          title: 'Salary',
          bSortable: false,
        },
      ],
      dataRows1: [
        [
          'Tiger Nixon',
          'System Architect',
          'Edinburgh',
          '5421',
          '2011/04/25',
          '$320,800',
        ],
        [
          'Garrett Winters',
          'Accountant',
          'Tokyo',
          '8422',
          '2011/07/25',
          '$170,750',
        ],
        [
          'Ashton Cox',
          'Junior Technical Author',
          'San Francisco',
          '1562',
          '2009/01/12',
          '$86,000',
        ],
        [
          'Cedric Kelly',
          'Senior Javascript Developer',
          'Edinburgh',
          '6224',
          '2012/03/29',
          '$433,060',
        ],
        ['Airi Satou', 'Accountant', 'Tokyo', '5407', '2008/11/28', '$162,700'],
      ],
      ajaxConfig: {
        processing: true,
        order: [[0, 'desc']],
        rowId: 'id.value',
        ajax: {
          url: 'https://randomuser.me/api/?results=100',
          type: 'GET',
          dataSrc: (json) => json.results,
        },
      },
      ajaxHeader: [
        {
          title: 'Id',
          data: 'id.value',
          class: 'center',
          sDefaultContent: '',
          render: (data, type) => {
            let id = data;
            if (type === 'display') {
              if (data) {
                id = `<label class="badge bg-primary">${id}</label>`;
              } else {
                const fake = Math.floor(Math.random() * 1000);
                id = `<label class="badge bg-info">${fake}</label>`;
              }
            }
            return id;
          },
        },
        {
          title: 'Name',
          data: 'name.first',
          class: 'center',
          bSortable: false,
        },
        {
          title: 'Gender',
          data: 'gender',
          class: 'center',
          sortable: false,
        },
        {
          title: 'Email',
          data: 'email',
          class: 'center',
          sortable: false,
        },
        {
          title: 'Age',
          data: 'dob.age',
          class: 'center',
          sortable: false,
        },
        {
          title: 'Actions',
          defaultContent: '',
          render: (data, type) => {
            let button = data;
            // if (type === 'display' && row.id.value) {
            if (type === 'display') {
              button = '<button class="btn btn-danger edit-row" style="color:white;"><i class="fas fa-pencil-alt"></i></button>';
            }
            return button;
          },
          class: 'center',
          sortable: false,
        },
      ],
      methods: [
        {
          selector: '.btn-action',
          trigger: 'click',
          callback: (e) => {
            const text = e.target.innerText;
            this.$swal({
              icon: 'error',
              title: text,
              text: 'sub text',
              showCancelButton: false,
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
            });
          },
        },
      ],
      methodsAjax: [
        {
          selector: 'button.edit-row',
          trigger: 'click',
          callback: this.edit,
        },
      ],
    };
  },
  setup() {
    const $emitter = inject('$emitter');
    //
    $emitter.on('draw.dt', () => {});
  },
  mounted() {
    setInterval(() => {
      const rows = this.dataRows1;
      rows[0][3] = Math.floor(Math.random() * 10);
      rows[rows.length - 1][3] = Math.floor(Math.random() * 10);
      this.dataRows1 = rows;
    }, 3000);
  },
  methods: {
    edit(e) {
      const row = e.currentTarget.closest('tr');
      const text = e.target.innerText;
      this.$swal({
        icon: 'question',
        title: text,
        text: `Editando el registro #${row.id}`,
        showCancelButton: false,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    },
  },
};
</script>

<style scoped>
.even {
  background-color: #f9f9f9;
}
</style>
