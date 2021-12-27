<template>
  <form :id="formID" :action="action" :method="method" @submit.prevent="submit" novalidate="true">
    <template v-if="Array.isArray(fields)">
      <div class="row mb-3">
        <div
          class="col-4"
          :set="(tmpId = el.attrs?.id ?? `input-${uniqueId()}`)"
          v-for="el in fields"
          :key="el"
          v-bind="el.container?.attrs"
        >
          <label :for="tmpId" class="form-label" v-if="el.label">{{ el.label }}</label>
          <template v-if="el.attrs?.type === 'select'">
            <Select2 v-bind="el.config ?? {}" @select2Change="inputChage" />
          </template>
          <template v-else-if="el.attrs?.type === 'datepicker'">
            <DateRangePicker
              v-bind="el.config ?? {}"
              :attrs="el.attrs ?? {}"
              @pickerApply="inputChage"
            />
          </template>
          <template v-else-if="el.attrs?.type === 'checkbox'">
            <!-- hidden input to return an empty value if checkbox is not checked-->
            <input class="hidden" type="hidden" :name="el.attrs?.name ?? ''" value="" />
            <input
              class="form-check-input"
              type="checkbox"
              v-bind="el.attrs ?? {}"
              :value="1"
              v-on:change="inputChage"
            />
          </template>
          <template v-else-if="el.attrs?.type === 'file'">
            <InputFile :attrs="el.attrs ?? {}" @fileSelected="inputChage" />
          </template>
          <template v-else-if="el.attrs?.isGroupInput ?? false">
            <InputGroup :attrs="el.attrs ?? {}" />
          </template>
          <template v-else>
            <input class="form-control" v-bind="el.attrs ?? {}" v-on:change="inputChage" />
          </template>

          <div :id="`${tmpId}HelpBlock`" class="form-text" v-if="el.helpBlock">
            {{ el.helpBlock }}
          </div>

          <div v-if="el.validFeedback" class="valid-feedback">
            {{ el.validDeedback }}
          </div>
          <div v-if="el.invalidFeedback" class="invalid-feedback">
            {{ el.invalidFeedback }}
          </div>
        </div>
      </div>
    </template>
    <div
      class="mb-3"
      :set="(tmpId = element.attrs?.id ?? `input-${uniqueId()}`)"
      v-bind="element.container?.attrs"
      v-else
    >
      <label :for="tmpId" class="form-label" v-if="element.label">{{ element.label }}</label>
      <input :id="tmpId" :class="element.attrs?.class ?? 'form-control'" v-bind="element.attrs" />
    </div>
    <slot name="customInput"></slot>
    <slot name="submitButton">
      <div class="col">
        <button type="submit" class="btn btn-success text-white float-end">{{ submitBtn }}</button>
      </div>
    </slot>
  </form>
</template>
<script>
import { uniqueId } from 'lodash';
import moment from 'moment';
import DateRangePicker from './DateRangePicker.vue';
import Select2 from './Select2.vue';
import InputGroup from './InputGroup.vue';
import InputFile from './InputFile.vue';

export default {
  name: 'Form',
  components: {
    DateRangePicker,
    Select2,
    InputGroup,
    InputFile,
  },
  props: {
    /**
     * Identifier for the form element
     */
    id: {
      type: String,
      required: false,
    },
    /**
     * The list or object to be render inside the form
     * @values Object or Array of elements
     */
    fields: {
      type: [Object, Array],
      default() {
        return [];
      },
    },
    /**
     * The action for the form
     * @values Any string
     */
    action: {
      type: String,
      default: '#',
    },
    /**
     * Defines the base action of the form
     * @values POST GET DELETE PUT
     */
    method: {
      type: String,
      default: 'POST',
    },
    /**
     * Text to be display on the submit button
     * @values Any string
     */
    submitBtn: {
      type: String,
      default: 'Submit',
    },
  },
  emits: ['submit', 'cleared'],
  setup(props, context) {
    const formID = props.id ?? uniqueId();
    const submit = (e) => {
      const f = new FormData(e.target);
      // Reriver all inputs from the form
      const getAllFormElements = (element) => Array.from(element.elements).filter((tag) => ['select', 'textarea', 'input'].includes(tag.tagName.toLowerCase()));
      // Validate each input befor return the value
      getAllFormElements(e.target).forEach((input) => {
        if (!input.checkValidity()) {
          input.classList.add('is-invalid');
        } else {
          input.classList.remove('is-invalid');
          // input.classList.add('is-valid');
        }
      });
      if (!e.target.checkValidity()) {
        return;
      }
      /**
       * On form submited.
       *
       * @event submit
       * @property {string} submit emited event
       * @property {FormData} f return a new instance of FormData
       */
      context.emit('submit', f);
    };
    /**
     * Function to be trigger each time a input in the form cnage value
     * @param e The DomObject that has change
     */
    const inputChage = (e) => {
      const input = e.target;
      const { value } = input;
      let hasError = false;
      // Ignore empty inputs
      if (value === '' || value === undefined) {
        return;
      }
      // Validate DateRangePicker inputs with moment
      if (input.required && input.classList.contains('isdaterangepicker')) {
        hasError = moment(value, input.getAttribute('data-date-format')).isValid();
        input.classList.add('is-invalid');
      } else {
        hasError = input.required && !input.checkValidity();
      }
      // Add BS5 error class
      if (hasError) {
        input.classList.add('is-invalid');
        const errorMsgDiv = input.parentNode.getElementsByClassName('invalid-feedback')[0];
        if (errorMsgDiv) {
          errorMsgDiv.innerHTML = input.validationMessage;
        }
      } else {
        input.classList.remove('is-invalid');
        // input.classList.add('is-valid');
      }
    };
    /**
     * Function to clear all inputs in the form
     * This function is returned so the parente component can access it
     */
    const clearForm = () => {
      const form = document.getElementById(formID);
      form.reset();
      form.getElementsByTagName('select').forEach((e) => {
        e.value = '';
        e.dispatchEvent(new Event('change'));
      });
      /**
       * On form cleared.
       *
       * @event cleared
       * @property {string} cleared emited event
       * @property {DOMObject} form return the DOM form object
       */
      context.emit('cleared', form);
    };
    return {
      formID,
      uniqueId,
      submit,
      inputChage,
      clearForm,
    };
  },
};
</script>
