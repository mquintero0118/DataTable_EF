<template>
  <div class="dropdown" :id="id">
    <button
      :class="`btn dropdown-toggle ${btnClass}`"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {{ title }}
    </button>
    <ul class="dropdown-menu" :aria-labelledby="`dropdownMenu${id}`">
      <li v-for="option in menu" :key="option.id || randomId()">
        <a v-if="option.href" class="dropdown-item" :href="option.href">{{
          option.title
        }}</a>
        <router-link
          v-else-if="option.to"
          class="dropdown-item"
          :to="option.to"
        >
          {{ option.title }}
        </router-link>
      </li>
      <li v-for="(option, index) in keySlots" :key="option">
           <slot :name="option" :index="index"></slot>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'DropdowBtn',
  props: {
    id: {
      type: String,
      required: false,
      default: Math.random()
        .toString(16)
        .substr(2, 6),
    },
    title: {
      type: String,
      required: true,
      default: 'Btn title',
    },
    btnClass: {
      type: String,
      required: false,
      default: 'btn-primary',
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

<style lang="scss" scoped>
.dropdown  button{
    color: white;
}
</style>
