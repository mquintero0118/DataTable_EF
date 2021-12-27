import auth from '../middleware/auth';

export default [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: 'Ejemplos de componentes básico',
      middleware: [auth],
    },
    component: () => import(/* webpackChunkName: "dropdownBtn" */ '../views/BasicElementsExample.vue'),
  },
  {
    path: '/form',
    name: 'Form',
    meta: {
      title: 'Form',
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/FormExample.vue'),
  },
  {
    path: '/datatable',
    name: 'Datatable',
    meta: {
      title: 'Ejemplos de Datatable',
    },
    component: () => import(/* webpackChunkName: "datatable" */ '../views/DatatableExample.vue'),
  },
  {
    path: '/accordion',
    name: 'Accordion',
    meta: {
      title: 'Ejemplos de acordión',
    },
    component: () => import(/* webpackChunkName: "accordion" */ '../views/AccordionExample.vue'),
  },
  {
    path: '/tabs',
    name: 'Tabs',
    meta: {
      title: 'Ejemplos de tabs',
    },
    component: () => import(/* webpackChunkName: "tabs" */ '../views/TabExample.vue'),
  },
  {
    path: '/modal',
    name: 'Modal',
    meta: {
      title: 'Ejemplos de Modales',
    },
    component: () => import(/* webpackChunkName: "modal" */ '../views/ModalExample.vue'),
  },
  {
    path: '/dropdownBtn',
    name: 'DropdownBtn',
    meta: {
      title: 'Ejemplos de botones dropdown',
    },
    component: () => import(/* webpackChunkName: "dropdownBtn" */ '../views/DropdownBtnExample.vue'),
  },
  {
    path: '/listGroup',
    name: 'ListGroup',
    meta: {
      title: 'Ejemplos de list group',
    },
    component: () => import(/* webpackChunkName: "listGroup" */ '../views/ListGroupExample.vue'),
  },
  {
    path: '/cards',
    name: 'Card',
    meta: {
      title: 'Box example',
    },
    component: () => import(/* webpackChunkName: "card" */ '../views/CardExample.vue'),
  },
  {
    path: '/dateRangePicker',
    name: 'DateRangePicker',
    meta: {
      title: 'DateRangePicker Example',
    },
    component: () => import(/* webpackChunkName: "dateRangePicker" */ '../views/DateRangePickerExample.vue'),
  },
  {
    path: '/select2',
    name: 'Select2',
    meta: {
      title: 'Select2 Example',
    },
    component: () => import(/* webpackChunkName: "select2" */ '../views/Select2Example.vue'),
  },
  {
    path: '/timeline',
    name: 'Timeline',
    meta: {
      title: 'Timeline Example',
    },
    component: () => import(/* webpackChunkName: "timeline" */ '../views/TimeLineExample.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login',
      layout: 'login',
    },
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/datatable2',
    name: 'datatable2',
    meta: {
      title: 'Datatable2',
    },
    component: () => import(/* webpackChunkName: "datatable2" */ '../views/Datatable2Example.vue'),
  },
];
