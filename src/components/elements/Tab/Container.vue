<template>
  <div>
    <NavItems :items="navs" :class="navClass"/>
    <div class="tab-content">
      <slot />
    </div>
  </div>
</template>
<script>
import {
  ref, provide, computed,
} from 'vue';
import { uniqueId } from 'lodash';

import NavItems from '@/components/elements/Tab/NavItems.vue';

export default {
  props: {
    pills: {
      type: Boolean,
      default: false,
    },
    class: {
      type: String,
      default: '',
    },
  },
  setup(props, context) {
    const navs = ref([]);
    const selectedTab = ref(null);

    const countTabItems = (nodes) => nodes.reduce((prev, node) => {
      let add = 0;
      if (node.type?.name === 'tab-item') {
        add = prev + 1;
      } else {
        add = prev + countTabItems(node.children);
      }
      return add;
    }, 0);

    const totalTabItems = countTabItems(context.slots.default());

    provide('updateNav', (id, node) => {
      navs.value.push({
        id,
        node,
      });
      if (totalTabItems === navs.value.length) {
        selectedTab.value = navs.value.filter((nav) => nav.node.attrs.active).pop()?.id
          || navs.value[0]?.id;
      }
    });

    provide('setSelectedTab', selectedTab);

    const navClass = computed(() => {
      const baseClass = props.class;
      const type = props.pills ? 'pills' : 'tabs';

      return `${baseClass} nav-${type}`;
    });

    return { navs, uniqueId, navClass };
  },
  components: {
    NavItems,
  },
};
</script>
