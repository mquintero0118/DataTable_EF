<template>
  <div
    class="root-element flex-shrink-0 p-2 fixed-top h-100 text-light bg-dark"
  >
    <ul class="nav nav-pills flex-column mb-auto w-100">
      <li class="w-100 " v-for="entry in entries" :key="entry.id">
        <router-link
          :to="entry.to"
          active-class="active"
          v-bind="entry.attrs"
          class="nav-link text-gray px-2"
          aria-current="page"
        >
          <i class="fas" :class="'fa-' + entry.icon" v-if="entry.icon"></i>
          <span class="nav-text ms-2">{{ entry.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import {
  onMounted, onUnmounted, inject, computed,
} from 'vue';

import { useStore } from 'vuex';

import { uniqueId } from 'lodash';

export default {
  setup() {
    const store = useStore();

    const $emitter = inject('$emitter');

    $emitter.on('sidebar.toggle', () => {
      document.body.classList.toggle('sidebar-collapsed');
    });

    onMounted(() => {
      document.body.classList.add('with-sidebar');
    });

    onUnmounted(() => {
      document.body.classList.remove('with-sidebar');
    });

    const entries = computed(() => store.state.sidebar?.entries);

    return { uniqueId, entries };
  },
};
</script>
<style lang="scss" scoped>
.root-element {
  position: relative;
  width: $sidebar-width;
  background-color: $gray-900;
  box-shadow: 10px 0 0 $blue;
  border-left: 10px solid $gray-900;
  overflow-x: hidden;
  z-index: 1031;
  transition: 0.5s width ease;
}
.root-element ul {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding-left: 5px;
  padding-top: 60px;
}
.root-element ul a {
  position: relative;
  list-style: none;
  width: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.root-element ul a.active {
  background-color: $blue;
}

.root-element ul  a.active::before {
  content: "";
  position: absolute;
  top: -30px;
  right: 0;
  width: 30px;
  height: 30px;
  background-color: $gray-900;
  border-radius: 50px;
  box-shadow: 15px 15px 0 $blue;
}
.root-element ul a.active::after {
  content: "";
  position: absolute;
  bottom: -30px;
  right: 0;
  width: 30px;
  height: 30px;
  background-color: #212529;
  border-radius: 50px;
  box-shadow: 15px -15px 0 #008cba;
}

.root-element ul li a {
  position: relative;
  display: block;
  width: 100%;
  display: flex;
  text-decoration: none;
  color: #fff;
}

.root-element ul li a .icon {
  position: relative;
  display: block;
  min-width: 60px;
  height: 60px;
  line-height: 70px;
  text-align: center;
}
.root-element ul li a .icon i {
  position: relative;
  font-size: 1.5rem;
  z-index: 1;
}
.root-element ul li a .title {
  position: relative;
  display: block;
  padding-left: 10px;
  height: 60px;
  line-height: 70px;
  white-space: nowrap;
}

.sidebar-collapsed {
  .root-element {
    width: $sidebar-collapsed-width;
  }

  .nav-text {
    display: none;
  }

  .root-element:hover {
    width: $sidebar-width !important;

    .nav-text {
      display: inline-block;
    }
  }
}

.with-navbar {
  .root-element {
    padding-top: calc(49px + 1rem) !important;
  }
}
</style>
