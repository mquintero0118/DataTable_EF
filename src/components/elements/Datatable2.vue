<template>
  <div style="text-align: left">
    <label>SearchBy:</label><input v-model="searchTerm" />
  </div>
  <table-lite
    :is-static-mode="true"
    :columns="table.columns"
    :rows="table.rows"
    :total="table.totalRecordCount"
    :sortable="table.sortable"
  ></table-lite>
</template>

<script>
import {
  defineComponent, reactive, ref, computed,
} from 'vue';
import TableLite from 'vue3-table-lite';

export default defineComponent({
  name: 'App',
  components: { TableLite },
  setup() {
    const searchTerm = ref(''); // Search text
    // Fake data
    const data = reactive([]);
    for (let i = 0; i < 126; i += 1) {
      data.push({
        id: i,
        name: `TEST${i}`,
        email: `test${i}@example.com`,
      });
    }
    // Table config
    const table = reactive({
      columns: [
        {
          label: 'ID',
          field: 'id',
          width: '3%',
          sortable: true,
          isKey: true,
        },
        {
          label: 'Name',
          field: 'name',
          width: '10%',
          sortable: true,
        },
        {
          label: 'Email',
          field: 'email',
          width: '15%',
          sortable: true,
        },
      ],
      rows: computed(() => data.filter(
        (x) => x.email.toLowerCase().includes(searchTerm.value.toLowerCase())
            || x.name.toLowerCase().includes(searchTerm.value.toLowerCase()),
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

<style scoped>
.card {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  padding: 20px;
}
</style>
