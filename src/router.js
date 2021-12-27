import { createRouter, createWebHistory } from 'vue-router';
import store from './store';

const routerGenerator = (userRoutes) => {
  const routes = userRoutes;

  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
  });

  router.afterEach((to, from) => {
    store.commit('setLayout', to.meta.layout || 'default');
    store.commit('setTitle', to.meta.title || 'Enviaflores.com');
    store.commit('setSidemenu', to.meta.sidemenu);

    const toDepth = to.path.split('/').filter((item) => item.length > 0).length;
    const fromDepth = from.path.split('/').filter((item) => item.length > 0).length;
    // eslint-disable-next-line no-param-reassign
    to.meta.transitionName = toDepth < fromDepth ? 'slide-left' : 'slide-right';
  });
  // Trigger each route middleware
  // Base on https://github.com/maoberlehner/implementing-a-simple-middleware-with-vue-router
  function nextFactory(context, middleware, index) {
    const subsequentMiddleware = middleware[index];
    // Call next middleware or end the middleware chain
    if (!subsequentMiddleware) return context.next;

    return (...parameters) => {
      // Run the default Vue Router `next()` callback first.
      context.next(...parameters);
      // Than run the subsequent Middleware with a new
      // `nextMiddleware()` callback.
      const nextMiddleware = nextFactory(context, middleware, index + 1);
      subsequentMiddleware({ ...context, next: nextMiddleware });
    };
  }

  router.beforeEach((to, from, next) => {
    if (to.meta.middleware) {
      const middleware = Array.isArray(to.meta.middleware)
        ? to.meta.middleware
        : [to.meta.middleware];

      const context = {
        from,
        next,
        router,
        to,
      };
      const nextMiddleware = nextFactory(context, middleware, 1);

      return middleware[0]({ ...context, next: nextMiddleware });
    }

    return next();
  });

  return router;
};

export default routerGenerator;

// import { defineAsyncComponent, markRaw } from 'vue';

/**
 * {
    path: '/example',
    name: 'Example',
    meta: {
      title: 'Ejemplo',
      layout: 'default',
      sidemenu: markRaw(defineAsyncComponent(() => import('@/views/sidemenu/Example.vue'))),
    },
    component: () => import(/* webpackChunkName: "about" *\/ '@/views/Example.vue'),
  }
*/
