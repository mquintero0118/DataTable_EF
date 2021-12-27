<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"
        v-for="entry, index in entries" :key="entry"
        :aria-current="index === entries.length - 1 ? 'page' : null"
        :class="index === entries.length - 1 ? 'active' : null"
      >
        <template v-if="typeof entry === 'string'">
            {{ entry }}
        </template>
        <template v-else>
            <router-link v-if="entry.to" :to="entry.to">
              {{ entry.text }}
            </router-link>
            <a :href="entry.href" v-else>{{ entry.text }}</a>
        </template>
      </li>
    </ol>
  </nav>
</template>
<script>
export default {
  name: 'Breadcrumb',
  props: {
    entries: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
