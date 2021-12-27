import { createApp } from 'vue';

import EFPlugin from '../src/index';
import App from './App.vue';

import routes from './router';
import userStore from './store/user';

createApp(App)
  .use(EFPlugin, {
    routes,
    store: {
      user: userStore,
    },
    requireAuth: true,
  })
  .mount('#app');
