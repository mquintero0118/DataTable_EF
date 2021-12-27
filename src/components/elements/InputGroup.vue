<template>
  <div class="input-group mb-3">
    <slot name="start">
      <span v-if="attrs.position === 'start'" class="input-group-text"
        ><i v-if="attrs.icon" :class="attrs.icon"></i
      ></span>
    </slot>
    <input
      v-bind="attrs"
      class="form-control"
    />
    <slot name="end">
      <span v-if="attrs.position === 'end'" class="input-group-text"
        ><i v-if="attrs.icon" :class="attrs.icon"></i
      ></span>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'InputGroup',
  props: {
    attrs: {
      type: Object,
      required: true,
    },
  },
  setup() {},
};
</script>

<style lang="scss" scoped></style>
