<template>
  <div class="container-fluid">
    <h1>Bootsrap Accordion</h1>
    <div class="row">
      <div class="col-6">
        <dropdown-btn
          :menu="options"
          title="Boton con arreglo"
          btnClass="btn-danger"
        >
        </dropdown-btn>
      </div>
      <div class="col-6">
        <dropdown-btn
          title="Boton con slot"
        >
          <template v-slot:exampleBody>
            <router-link class="dropdown-item" to="/">
              <i class="fa fa-trash"></i> Slot1
            </router-link>
            <router-link class="dropdown-item" to="/">
              <i class="fa fa-edit"></i> Slot2
            </router-link>
          </template>
        </dropdown-btn>
      </div>
      </div>
    </div>
</template>

<script>
import DropdownBtn from '@/components/elements/DropdownBtn.vue';

export default {
  name: 'DropdownBtnExample',
  components: { DropdownBtn },
  data() {
    return {
      options: [
        {
          title: 'Action1',
          to: '/datatable',
        },
      ],
    };
  },
};
</script>

<style></style>
