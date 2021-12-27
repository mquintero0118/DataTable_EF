<template>
  <ul class="nav" role="tablist" v-if="items.length > 0">
      <li class="nav-item" role="presentation" v-for="nav in items" :key="nav.id">
        <button class="nav-link"
          :id="`tab-${nav.id}`"
          data-bs-toggle="tab"
          :data-bs-target="`#tab-pane-${nav.id}`"
          :aria-controls="`tab-pane-${nav.id}`"
          aria-selected="true"
          type="button"
          role="tab"
          :class="{
            'disabled': nav.node.attrs.disabled,
            'active': selectedTab === nav.id,
          }"
        >
          <template v-if="nav.node.slots?.title">
            <template v-for="c, cindex in nav.node.slots?.title()" :key="cindex">
              <component :is="c"/>
            </template>
          </template>
          <template v-else>
            {{ nav.node.props?.title }}
          </template>
        </button>
      </li>
    </ul>
</template>

<script>
import { inject } from 'vue';

export default {
  props: {
    items: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup() {
    const selectedTab = inject('setSelectedTab');

    return { selectedTab };
  },
};
</script>
