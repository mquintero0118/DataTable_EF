<template>
  <div class="row multiselect align-items-start">
    <div id="leftSelect" class="col-5">
      <slot name="leftTitle">
        <label class="form-label" :for="elementId" v-if="leftTitle">{{leftTitle}}</label>
      </slot>
      <select
        name="from[]"
        :id="elementId"
        class="form-control"
        size="8"
        multiple="multiple"
        v-model="leftSelecte"
        @keydown.enter.prevent
      >
        <option v-for="item in leftData" :key="item.id" :value="item.id">{{
          item.text
        }}</option>
      </select>
    </div>

    <div id="actions" class="col-2 p-2">
      <div class="row">
        <button
          type="button"
          :id="`${elementId}_rightAll`"
          class="btn btn-block"
          @click="addAllOptions"
        >
          <i class="fas fa-forward"></i>
        </button>
        <button
          type="button"
          :id="`${elementId}_rightSelected`"
          class="btn btn-block"
          @click="addOption"
        >
          <i class="fas fa-chevron-right"></i>
        </button>
        <button
          type="button"
          :id="`${elementId}_leftSelected`"
          class="btn btn-block"
          @click="removeOption"
        >
          <i class="fas fa-chevron-left"></i>
        </button>
        <button
          type="button"
          :id="`${elementId}_leftAll`"
          class="btn btn-block"
          @click="removeAllOptions"
        >
          <i class="fas fa-backward"></i>
        </button>
      </div>
    </div>

    <div id="rightSelect" class="col-5">
      <slot name="rigthtitle">
        <label class="form-label" :for="`${elementId}_to`" v-if="rigthtitle">{{rigthtitle}}</label>
      </slot>
      <select
        name="to[]"
        :id="`${elementId}_to`"
        class="form-control"
        size="8"
        multiple="multiple"
        v-model="righSelecte"
        @keydown.enter.prevent
      >
        <option v-for="item in rightData" :key="item.id" :value="item.id">{{
          item.text
        }}</option>
      </select>
    </div>
  </div>
</template>

<script>
// TwoSideSelect Modules  node_modules/
import { onMounted, onUnmounted, ref } from 'vue';

import { uniqueId } from 'lodash';

export default {
  name: 'TwoSideSelect',
  props: {
    id: {
      require: false,
      type: String,
    },
    value: {
      type: Array,
      required: true,
      default: () => [],
    },
    rigthtitle: {
      require: false,
      type: String,
    },
    leftTitle: {
      require: false,
      type: String,
    },
  },
  setup(props) {
    const elementId = props.id || uniqueId();
    const leftSelecte = ref([]);
    const righSelecte = ref([]);
    const data = [];

    // flat array of objects
    props.value.forEach((e) => {
      const key = Object.keys(e)[0];
      const value = e[key];
      data.push({
        id: key,
        text: value,
      });
    });

    // Init left
    const leftData = ref(data);
    const rightData = ref([]);

    // Move all elements to the rigth
    const addAllOptions = () => {
      leftData.value = [];
      rightData.value = data;
    };
    // Move a element to the rigth
    const addOption = () => {
      const selectedKeys = leftSelecte.value;
      const selectedValues = data.filter((item) => selectedKeys.includes(item.id));
      const newfilterArray = data.filter(
        (item) => !selectedKeys.includes(item.id),
      );
      leftData.value = newfilterArray;
      rightData.value = rightData.value.concat(selectedValues);
    };
    // Move a element to de left
    const removeOption = () => {
      const selectedKeys = righSelecte.value;
      const selectedValues = data.filter((item) => selectedKeys.includes(item.id));
      const newfilterArray = data.filter(
        (item) => !selectedKeys.includes(item.id),
      );
      leftData.value = leftData.value.concat(selectedValues);
      rightData.value = newfilterArray;
    };
    // Move all element to the left
    const removeAllOptions = () => {
      leftData.value = data;
      rightData.value = [];
    };

    onMounted(() => {});
    onUnmounted(() => {});

    return {
      elementId,
      addOption,
      removeOption,
      addAllOptions,
      removeAllOptions,
      leftData,
      rightData,
      leftSelecte,
      righSelecte,
    };
  },
};
</script>

<style scoped lang="scss">
.multiselect {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;
}
// #actions {
//   width: 100%;
//   display: flex;
//   flex-direction: column ;
//   justify-content: space-evenly;
//   align-items: flex-start;
// }
#leftSelect,
#actions,
#rightSelect {
  flex: 0 0 auto;
  align-self: flex-start;
}
// #actions button {
//   flex: 0 0 auto;
//   align-self: f;
// }
</style>
