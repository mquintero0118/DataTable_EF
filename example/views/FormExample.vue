<template>
  <div class="container-fluid">
    <h1>Forms</h1>
    <h3>Example</h3>
    <Form :fields="example1" @submit="submit" ref="form" />
    <button class="btn btn-danger text-white" @click="clearForm">Limpiar</button>
    <div v-if="formData">
      <ul style="list-style-type: none;">
        <li style="" v-for="(value, key) in formData" :key="key">
          <b>{{ key }}</b> -> {{ value }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import { useToast } from 'vue-toastification';

import { ref } from 'vue';
import Form from '@/components/elements/Form.vue';

// const toast = useToast();

export default {
  setup() {
    const formData = ref({});
    const form = ref(null);
    const example1 = [
      {
        container: {
          attrs: {
            class: 'col-6',
          },
        },
        label: 'Select Input',
        helpBlock: 'Nuevo input para tu nombre',
        attrs: {
          type: 'select',
        },
        config: {
          name: 'select2Input',
          value: '',
          required: 'required',
          options: [
            { key1: 'valor 1' },
            { key2: 'valor 2' },
            { key3: 'valor 3' },
            { key4: 'valor 4' },
            { key5: 'valor 5' },
          ],
        },
      },
      {
        label: 'Test input',
        invalidFeedback: 'A custom error here',
        attrs: {
          name: 'InputName',
          value: '',
          required: 'required',
          minlength: 5,
        },
      },
      {
        label: 'Number input',
        attrs: {
          id: 'field1',
          type: 'number',
          name: 'number',
          required: 'required',
          value: 123,
          min: 0,
        },
      },
      {
        label: 'Date range picker',
        attrs: {
          type: 'datepicker',
        },
        config: {
          id: 'daterangepicker',
          name: 'created',
          value: '17/07/2021',
        },
      },
      {
        container: {
          attrs: {
            class: 'form-check',
          },
        },
        label: 'Check Input',

        attrs: {
          class: 'form-check-input',
          type: 'checkbox',
          checked: false,
          name: 'checkboxInput',
        },
      },
      {
        container: {
          attrs: {
            class: 'col-6',
          },
        },
        label: 'Input Goup',

        attrs: {
          type: 'password',
          isGroupInput: true,
          icon: 'fa fa-lock',
          position: 'start',
          name: 'groupInput',
          required: 'required',
          minlength: 5,
        },
      },
      {
        label: 'Custom Input File',
        attrs: {
          type: 'file',
          name: 'fileInput',
          required: 'required',
        },
      },
    ];
    /**
     * @param data FormData instance
     */
    const submit = (data) => {
      // convert the FormData into an object
      const dataToObject = [...data].reduce((o, [k, v]) => ({ ...o, [k]: v }), {});
      // Read the file input data
      const fileExample = data.get('fileInput');
      // Convert file input to a object
      dataToObject.fileInput = {
        name: fileExample.name,
        lastModified: fileExample.lastModified,
        size: fileExample.size,
        type: fileExample.type,
      };
      // Display values
      formData.value = dataToObject;
      // Show succes submit msg
      // toast.success('Form submited', {
      //   position: 'top-right',
      //   timeout: 3000,
      //   closeOnClick: true,
      //   pauseOnFocusLoss: false,
      //   icon: 'fas fa-check',
      // });
    };
    // Call child form function clearForm
    const clearForm = () => {
      form.value.clearForm();
      formData.value = {};
    };

    return {
      example1, submit, formData, form, clearForm,
    };
  },
  components: {
    Form,
  },
};
</script>
