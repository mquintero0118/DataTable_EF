<template>
  <div>
    <ul class="list-group" :id="id">
      <li
        v-for="option in menu"
        :key="option.id || randomId()"
        :class="{
          'list-group-item': true,
          'active': option.active || false,
          'disabled': option.disabled || false
        }"
      >
        {{ option.body }}
      </li>
      <li v-for="(option, index) in keySlots" :key="option"  class="list-group-item">
        <slot :name="option" :index="index"></slot>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ListGroup',
  props: {
    id: {
      type: String,
      required: false,
      default: () => Math.random()
        .toString(16)
        .substr(2, 6),
    },
    menu: {
      type: Array,
      require: true,
      default: () => [],
    },
  },
  methods: {
    randomId(length = 6) {
      return Math.random()
        .toString(16)
        .substr(2, length);
    },
  },
  setup(props, context) {
    const listOfSlots = context.slots || {};
    const keySlots = Object.keys(listOfSlots);
    return {
      keySlots,
    };
  },
};
</script>

<style></style>
