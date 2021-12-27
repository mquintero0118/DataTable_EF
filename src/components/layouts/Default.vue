<template>
  <div class="d-flex flex-column h-100">
    <Navbar/>
    <Sidebar />
    <div class="main-wrapper flex-fill bg-gray">
      <router-view v-slot="{ Component }">
        <transition :name="transition || 'fade'" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <LeftMenu />
    <RightMenu>
      <component :is="Sidemenu"></component>
    </RightMenu>
    <Footer/>
  </div>
</template>
<script>
import { watch, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

import Footer from '@/components/elements/Footer.vue';
import Navbar from '@/components/elements/Navbar.vue';
import LeftMenu from '@/components/elements/Sidemenu/Left.vue';
import RightMenu from '@/components/elements/Sidemenu/Right.vue';
import Sidebar from '@/components/elements/Sidebar.vue';
/**
 * The base layout for most of the views, includes a Header, Sidebar, Navbar and a Footer
 * @displayName DefaultLayout
 * @version 1.0.0
 */
export default {
  name: 'DefaultLayout',
  setup() {
    const store = useStore();
    const route = useRoute();

    const transition = ref('fade');

    const Sidemenu = computed(() => store.state.sidemenu);

    watch(() => route?.meta, (value) => {
      const { transitionName } = value;
      transition.value = transitionName || 'fade';
    });

    return {
      transition,
      Sidemenu,
    };
  },
  components: {
    Navbar,
    Footer,
    LeftMenu,
    RightMenu,
    Sidebar,
  },
};
</script>
<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.75s ease-out;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}
</style>
