<template>
<div>
  <div class="d-flex bd-highlight mb-3">
    <input
      type="text"
      class="form-control"
      id="inputSearch"
      aria-describedby="basic-addon1"
      v-model="searchTerm"
      placeholder="Buscar:"
    />
  </div>
  <table-lite
    :is-static-mode="true"
    :columns="table.columns"
    :rows="table.rows"
    :total="table.totalRecordCount"
    :sortable="table.sortable"
  ></table-lite>
</div>
</template>

<script>
import {
  defineComponent, reactive, ref, computed,
} from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
// import TableLite from 'vue3-table-lite';
import TableLite from '@/components/elements/TableLite.vue';

export default defineComponent({
  name: 'App',
  components: { TableLite },
  setup() {
    const searchTerm = ref(''); // Search text
    // Fake data
    const data = reactive([]);
    axios.get('reponseMaterials.json')
      .then((response) => {
        console.log(response);
        for (let i = 0; i < 250; i += 1) {
          data.push({
            id: response.data.data[i].Material.id,
            nombre: response.data.data[i].Material.nombre,
            descripcion: response.data.data[i].Material.descripcion,
          });
        }
      });
    // Table config
    const table = reactive({
      columns: [
        {
          label: 'Nombre',
          field: 'nombre',
          width: '10%',
          display(row) {
            return `<button type="button" data-id="${row.id}" class="btn btn-primary btn-sm">${row.nombre}</button>`;
          },
          sortable: true,

        },
        {
          label: 'Descripcion',
          field: 'descripcion',
          width: '15%',
          sortable: true,
        },
        {
          label: 'ID',
          field: 'id',
          width: '5%',
          sortable: true,
          isKey: true,
        },
      ],
      rows: computed(() => data.filter(
        (x) => x.descripcion.toLowerCase().includes(searchTerm.value.toLowerCase())
            || x.nombre.toLowerCase().includes(searchTerm.value.toLowerCase()),
      )),
      totalRecordCount: computed(() => table.rows.length),
      sortable: {
        order: 'id',
        sort: 'asc',
      },
    });
    return {
      searchTerm,
      table,
    };
  },
});
</script>

<style scoped lang="scss">
// Este card es el color del header
.card ::v-deep(.table .thead-dark th) {
  color: rgb(0, 0, 0);
  background-color: transparent;
  border-color: transparent;
  border-bottom-color: rgba(218, 218, 218, 0.616);
  border-bottom-width: 2px;
}
.card ::v-deep(.table td) {
  border: none;
}
// .card ::v-deep(.table tr) <-- Para lineas verticales
.form-control {
  max-width: 30%;
position: relative;
  top: 70px;
  z-index: 400;
  margin-left: 68%;
}
.input-group-text {
position: relative;
  top: 70px;
  z-index: 500;
}
</style>
