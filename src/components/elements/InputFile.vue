<template>
  <div class="input-group mb-3">
    <span class="btn btn-primary text-white" type="button" @click="triggerInput">
      {{ searchBtn }}&hellip;
      <input
        type="file"
        :id="id"
        style="display:none;"
        aria-label="Upload file"
        v-bind="clearAttrs"
      />
    </span>
    <input
      type="text"
      class="form-control disabled has-validation"
      :id="`input-file-${id}`"
      aria-label="Upload"
      :name="clearAttrs.name ? `${clearAttrs.name}-placehorder` : `${id}-placehorder`"
      readonly
    />
  </div>
</template>

<script>
import { uniqueId } from 'lodash';
import { onMounted, ref } from 'vue';

export default {
  name: 'InputFile',
  emits: ['fileSelected'],
  props: {
    searchBtn: {
      type: String,
      default: 'Search',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    attrs: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  setup(props, context) {
    const id = props.attrs.id ?? uniqueId();
    const clearAttrs = ref(props.attrs);
    delete clearAttrs.value.type;

    /**
     * Function to tigger the browser open file explorer
     */
    const triggerInput = () => {
      const inputBtn = document.getElementById(id);
      inputBtn.click();
    };

    onMounted(() => {
      const inputFile = document.getElementById(id);
      const placeholder = document.getElementById(`input-file-${id}`);

      inputFile.onchange = (input) => {
        const file = input.target.files;
        const numFiles = file ? file.length : 1;
        const label = input.target.value.replace(/\\/g, '/').replace(/.*\//, '');
        placeholder.value = numFiles > 1 ? `${numFiles} files selected` : label;
        // console.log(placeholder);
        context.emit('fileSelected', { target: placeholder });
      };
    });
    return { id, triggerInput, clearAttrs };
  },
};
</script>

<style scoped lang="scss">
// remove BS no backgorund color for disable inputs
.form-control.disabled {
  background-color: #fff;
}
</style>
