<template>
  <div
    class="modal fade"
    :id="id"
    :aria-labelledby="id + 'Label'"
    aria-hidden="true"
  >
    <div
      :class="{
        'modal-dialog': true,
        [sizes ? `modal-${sizes}` : '']: sizes,
        'modal-fullscreen': fullScreen,
        'modal-dialog-scrollable': scrollable
      }"
    >
      <div class="modal-content">
        <div class="modal-header">
          <slot name="header">
            <h5 class="modal-title" v-if="title">{{ title }}</h5>
          </slot>
          <button
            v-if="closeBtn"
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <slot>
            <p>Modal body text goes here.</p>
          </slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="cancelBtn"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              style="color:white;"
              @click="comfirmBtn"
            >
              Save changes
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';
import { ref } from 'vue';

export default {
  name: 'Modal',
  props: {
    id: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
    title: {
      type: String,
      required: false,
    },
    closeBtn: {
      type: Boolean,
      required: false,
      default: true,
    },
    config: {
      type: Object,
      default() {
        return {};
      },
      required: false,
    },
    sizes: {
      type: String,
      default: '',
      required: false,
    },
    fullScreen: {
      type: Boolean,
      default: false,
      required: false,
    },
    scrollable: {
      type: Boolean,
      default: false,
      required: false,
    },
    backgroundClickEnabledd: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  emits: [
    'modalComfirm',
    'modalCancel',
    'modalhidden',
    'modalShow',
    'modalShown',
    'modalOutsideClick',
  ],
  setup() {
    const modalInstance = ref(null);
    return {
      modalInstance,
    };
  },
  mounted() {
    const modalEle = document.getElementById(this.id);
    this.modalInstance = new Modal(modalEle, this.config);

    // Expose bootstrap modal event to vue
    modalEle.addEventListener('hidden.bs.modal', (event) => {
      this.$emit('modalhidden', [event]);
    });
    modalEle.addEventListener('show.bs.modal', (event) => {
      this.$emit('modalShow', [event]);
    });
    modalEle.addEventListener('shown.bs.modal', (event) => {
      this.$emit('modalShown', [event]);
    });
    modalEle.addEventListener('hidePrevented.bs.modal', (event) => {
      this.$emit('modalOutsideClick', [event]);
    });
  },
  watch: {
    visible(show) {
      if (show) this.modalInstance.show();
      else this.modalInstance.hide();
    },
  },
  methods: {
    comfirmBtn() {
      this.$emit('modalComfirm');
    },
    cancelBtn() {
      this.$emit('modalCancel');
    },
  },
  unmounted() {
    this.modalInstance.dispose();
  },
};
</script>

<style scoped lang="scss"></style>
