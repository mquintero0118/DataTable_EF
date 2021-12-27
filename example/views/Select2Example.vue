<template>
  <div class="container">
    <h1>Select 2</h1>
    <div class="col-12 p-2 border bg-white ">
      <div class="example">
        <div class="md-3">
          <label class="form-label">Multiple select</label>
          <Select2 multiple :value="selectedOption1" :options="values2" />
        </div>
        <div class="md-3">
          <label class="form-label">Optgroup </label>
          <Select2 :options="values" value="key1" @select2Select="elementSelected" />
        </div>
        <div class="md-3">
          <label class="form-label">Ajax select </label>
          <Select2 :config="ajaxExampleConfig" />
        </div>
      </div>
    </div>
    <div class="col-12 p-2 border bg-white" style="margin-top: 10px;">
      <button
        class="btn btn-primary text-white"
        type="button"
        style="color:white;"
        v-on:click="triggerModal"
        @keyup.esc="showModal = false"
      >
        Select 2 in modal
      </button>
      <modal
      id="select2-modal"
      title="Select 2 and modal"
      :visible="dialogVisible"
      sizes="lg"
      :fullScreen="false"
      :backgroundClickEnabled="false"
      :config="{
        backdrop: 'static',
        keyboard: false
      }"
       @modalComfirm="closeModal"
      @modalCancel="closeModal"
      >
      <template v-slot:default>
        <div>
         <Select2 :config="ajaxExampleConfig" />
        </div>
      </template>
      </modal>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification';
import Select2 from '@/components/elements/Select2.vue';
import Modal from '@/components/elements/Modal.vue';

const toast = useToast();

export default {
  components: { Select2, Modal },
  name: 'Select2Example',
  data() {
    return {
      selectedOption1: ['key1', 'key2'],
      values2: [
        { key1: 'valor 1' },
        { key2: 'valor 2' },
        { key3: 'valor 3' },
        { key4: 'valor 4' },
        { key5: 'valor 5' },
      ],
      values: [{ 'grupo 1': [{ key1: 1 }, { key2: 2 }] }, { key3: 3 }, { key4: 4 }, { key5: 5 }],
      ajaxExampleConfig: {
        ajax: {
          url: 'https://api.github.com/search/repositories',
          dataType: 'json',
          data(params) {
            return {
              q: params.term, // search term
              page: params.page,
            };
          },
          delay: 250,
          cache: true,
          processResults(data, params) {
            const result = [];
            data.items.forEach((element) => {
              result.push({
                id: element.id,
                text: element.full_name,
              });
            });
            // eslint-disable-next-line no-param-reassign
            params.page = params.page || 1;
            return {
              results: result,
              pagination: {
                more: params.page * 30 < data.total_count,
              },
            };
          },
        },
        templateSelection: (repo) => repo.full_name || repo.text,
        placeholder: 'Search for a repository',
        minimumInputLength: 2,
        allowClear: true,
      },
      dialogVisible: false,
    };
  },
  methods: {
    elementSelected(e) {
      const { text, id } = e.params.data;
      toast.success(`Element selected ${id} - ${text}`, {
        position: 'top-right',
        timeout: 3000,
        closeOnClick: true,
        pauseOnFocusLoss: false,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: true,
        closeButton: 'button',
        icon: 'fas fa-hand-pointer',
      });
    },
    triggerModal() {
      this.dialogVisible = !this.dialogVisible;
    },
    closeModal() {
      this.dialogVisible = false;
    },
  },
  mounted() {
    let hasRun = false;
    // change values after 3s
    setInterval(() => {
      if (!hasRun) {
        this.values2 = [
          { key6: 'valor 6' },
          { key7: 'valor 7' },
          { key8: 'valor 8' },
          { key9: 'valor 9' },
          { key10: 'valor 10' },
        ];
        hasRun = true;
      }
    }, 3000);
    // set a random value avery 5s
    setInterval(() => {
      this.selectedOption1 = `key${Math.floor(Math.random() * (10 - 6)) + 6}`;
    }, 5000);
  },
};
</script>

<style scoped lang="scss">
.example {
  padding: 1.5rem;
  margin-right: 0;
  margin-left: 0;
  border-width: 1px;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}
</style>
