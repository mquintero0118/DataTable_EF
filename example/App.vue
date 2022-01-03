<template>
  <component :is='layout'>
    <slot/>
  </component>
</template>

<script>
import { computed, watch } from 'vue';
import { useStore } from 'vuex';
import DefaultLayout from '@/components/layouts/Default.vue';
import ErrorLayout from '@/components/layouts/Error.vue';
import LoginLayout from '@/components/layouts/Login.vue';

import '@/assets/scss/app.scss';

export default {
  setup() {
    const store = useStore();

    const layout = computed(() => store.state.layout || 'default');

    watch(() => store.state.title, (title) => {
      document.title = title;
    });

    store.commit('setSidebarEntries', [
      {
        id: 'elements',
        to: '/',
        icon: 'star',
        title: 'Elementos',
      },
      {
        id: 'form',
        to: '/form',
        icon: 'star',
        title: 'Form',
      }, {
        id: 'datatable',
        to: '/datatable',
        icon: 'star',
        title: 'Datatable',
      }, {
        id: 'modal',
        to: '/modal',
        icon: 'star',
        title: 'Modal',
      },
      {
        id: 'accordion',
        to: '/accordion',
        icon: 'star',
        title: 'Accordion',
      }, {
        id: 'dropdownBtn',
        to: '/dropdownBtn',
        icon: 'star',
        title: 'Dropdown Button',
      },
      {
        id: 'tabs',
        to: '/tabs',
        icon: 'star',
        title: 'Tabs',
      }, {
        id: 'list',
        to: '/listGroup',
        icon: 'star',
        title: 'List Group',
      },
      {
        id: 'card',
        to: '/cards',
        icon: 'star',
        title: 'Card/Box',
      },
      {
        id: 'DateRangePicker',
        to: '/dateRangePicker',
        icon: 'star',
        title: 'DateRangePicker',
      },
      {
        id: 'select2',
        to: '/select2',
        icon: 'star',
        title: 'Select2',
      },
      {
        id: 'timeline',
        to: '/timeline',
        icon: 'star',
        title: 'Timeline',
      },
      {
        id: 'datatable2',
        to: '/datatable2',
        icon: 'table',
        title: 'DataTable2',
      },
      {
        id: 'datatableaxios',
        to: '/datatableaxios',
        icon: 'table',
        title: 'Datatableaxios',
      },
    ]);
    store.dispatch('user/setUserProfile', JSON.parse(localStorage.getItem('user')));
    return { layout };
  },
  components: {
    default: DefaultLayout,
    error: ErrorLayout,
    login: LoginLayout,
  },
};
</script>
