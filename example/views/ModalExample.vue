<template>
  <div class="container-fluid">
    <h1>Ejemplo de modal</h1>

    <div class="row">
      <div class="col-6">
        <button
          type="button"
          class="btn btn-primary"
          style="color:white;"
          v-on:click="triggerModal"
          @keyup.esc="showModal = false"
        >
          Launch demo modal
        </button>
      </div>
      <div class="col-6">
        <button
          type="button"
          class="btn btn-primary"
          style="color:white;"
          v-on:click="triggerModal2"
          @keyup.esc="showModal = false"
        >
          Launch demo modal
        </button>
      </div>
    </div>
    <modal
      id="newModal"
      title="Modal Title"
      :visible="dialogVisible"
      sizes="lg"
      :fullScreen="false"
      :backgroundClickEnabled="false"
      :config="{
        backdrop: 'static',
        keyboard: false
      }"
      @modalComfirm="confirm"
      @modalCancel="cancel"
      @modalOutsideClick="outSideClick"
    >
      <template v-slot:default>
        <div>
          Model body contet
        </div>
      </template>
    </modal>
    <modal
      id="example2Modal"
      title="Modal Title"
      :visible="dialog2Visible"
      @modalhidden="dialog2Visible = false"
    >
      <template v-slot:header>
        <div>
          Titulo 2
        </div>
      </template>
      <template v-slot:default>
        <div>
          New modal 2
        </div>
      </template>
      <template v-slot:footer>
        <button
          type="button"
          class="btn btn-danger"
          style="color:white;"
          data-bs-dismiss="modal"
          @click="cancelBtn"
        >
          <i class="fa fa-times"></i>
        </button>
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from '@/components/elements/Modal.vue';

export default {
  name: 'ModalExample',
  components: { Modal },
  data() {
    return {
      dialogVisible: false,
      dialog2Visible: false,
    };
  },
  setup() {},
  mounted() {},
  methods: {
    triggerModal() {
      this.dialogVisible = !this.dialogVisible;
    },
    triggerModal2() {
      this.dialog2Visible = !this.dialog2Visible;
    },
    cancelBtn() {
      this.dialog2Visible = false;
    },
    confirm() {
      this.triggerModal();
    },
    cancel() {
      this.triggerModal();
    },
    outSideClick() {
    },
  },
};
</script>

<style scoped></style>
