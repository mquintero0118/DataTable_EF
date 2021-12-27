/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import mitt from 'mitt';

import VueSweetalert2 from 'vue-sweetalert2';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'sweetalert2/dist/sweetalert2.min.css';

// import Toast from 'vue-toastification';
// import 'vue-toastification/dist/index.css';

import { Tooltip } from 'bootstrap';
import store from './store';
import routerGenerator from './router';
// Layouts
import DefaultLayout from './components/layouts/Default.vue';
import ErrorLayout from './components/layouts/Error.vue';
import LoginLayout from './components/layouts/Login.vue';
// General app styles
import './assets/scss/app.scss';

const install = (app, options = {}) => {
  const emitter = mitt();
  const sweetAlertOptionsDefault = {
    confirmButtonColor: '#41b882',
    cancelButtonColor: '#ff7674',
  };
  // const toasterOptionsDefault = {
  //   maxToasts: 5,
  //   newestOnTop: true,
  // };

  const sweetAlertOptions = { ...sweetAlertOptionsDefault, ...options?.sweetAlert };
  // const toasterOptions = { ...toasterOptionsDefault, ...options?.toasterOptions };

  app.use(routerGenerator(options?.routes || [], options?.requireAuth || false));
  app.use(store);

  if (options?.store) {
    Object.keys(options.store).forEach((moduleName) => {
      store.registerModule(moduleName, options.store[moduleName]);
    });
  }

  app.directive('tooltip', {
    mounted(el, binding) {
      if (!Tooltip.getInstance(el)) {
        // eslint-disable-next-line no-new
        new Tooltip(el, binding.value);
      }
    },
    // eslint-disable-next-line no-unused-vars
    updated(el, binding) {
      // TODO: lógica de actualización del tooltip
    },
    unmounted(el) {
      const tooltip = Tooltip.getInstance(el);
      tooltip.dispose();
    },
  });

  // Define layouts as components
  app.component('default', DefaultLayout);
  app.component('error', ErrorLayout);
  app.component('login', LoginLayout);

  app
    .use(VueSweetalert2, sweetAlertOptions)
    // .use(Toast, toasterOptions)
    .provide('$emitter', emitter);
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default { install };

export { default as Alert } from './components/elements/Alert.vue';
export { default as Badge } from './components/elements/Badge.vue';
export { default as Breadcrumb } from './components/elements/Breadcrumb.vue';
export { default as Card } from './components/elements/Card.vue';
export { default as CodeBlock } from './components/elements/CodeBlock.vue';
export { default as DateRangePicker } from './components/elements/DateRangePicker.vue';
export { default as DropdownBtn } from './components/elements/DropdownBtn.vue';
export { default as Form } from './components/elements/Form.vue';
export { default as InputFile } from './components/elements/InputFile.vue';
export { default as InputGroup } from './components/elements/InputGroup.vue';
export { default as ListGroupContainer } from './components/elements/ListGroup/Container.vue';
export { default as ListGroupItem } from './components/elements/ListGroup/Item.vue';
export { default as Loader } from './components/elements/Loader.vue';
export { default as Modal } from './components/elements/Modal.vue';
export { default as Paginator } from './components/elements/Paginator.vue';
export { default as Select2 } from './components/elements/Select2.vue';
export { default as Timeline } from './components/elements/Timeline.vue';
