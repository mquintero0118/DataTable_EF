<template>
  <div>
    <!-- standar list item -->
    <li
      v-if="!href && !to"
      class="list-group-item"
      :class="{
        active: active,
        disabled: disabled
      }"
    >
      <!-- @slot Main item content -->
      <slot />
    </li>
    <!-- Anchor tag list item -->
    <a
      v-else-if="href"
      :href="href"
      class="list-group-item"
      :class="{
        active: active,
        disabled: disabled
      }"
    >
      <!-- @slot Main item content -->
      <slot />
    </a>
    <!-- vuex router link item -->
    <router-link
      v-else
      :to="to"
      class="list-group-item"
      :class="{
        active: active,
        disabled: disabled
      }"
    >
      <!-- @slot Main item content -->
      <slot />
    </router-link>
  </div>
</template>

<script>
/**
 * Listr group item
 * @displayName ListGroupItem
 * @version 1.0.0
 */
export default {
  name: 'ListGroupItem',
  props: {
    /**
     * Defines if the active class shuld be apply to the item
    */
    active: {
      type: Boolean,
      require: false,
      default: false,
    },
    /**
     * Defines if the disbale class shuld be apply to the item
    */
    disabled: {
      type: Boolean,
      require: false,
      default: false,
    },
    /**
     * String used by vuex router link
    */
    to: {
      type: String,
      require: false,
      default: '',
    },
    /**
     * String used by the achor tag as href
    */
    href: {
      type: String,
      require: false,
      default: '',
    },
  },
};
</script>

<style></style>
