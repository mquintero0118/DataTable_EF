<template>
  <div class="root-element flex-shrink-0 p-2 fixed-top h-100 text-light bg-dark">
    <ul class="nav nav-pills nav-sidebar flex-column mb-auto w-100">
      <li class="w-100" v-for="entry in entries" :key="entry.id">
        <router-link
          :to="entry.to"
          active-class="active"
          v-bind="entry.attrs"
          v-if="!entry.childs"
          class="nav-link text-gray px-2"
          aria-current="page"
        >
          <i class="fas" :class="'fa-' + entry.icon" v-if="entry.icon"></i>
          <span class="nav-text ms-2">{{ entry.title }}</span>
        </router-link>

        <div v-else>
          <button
            @click="toogleChilds"
            v-bind="entry.attrs"
            class="nav-link text-gray px-2 w-100 text-start"
            aria-current="page"
          >
            <i class="fas" :class="'fa-' + entry.icon" v-if="entry.icon"></i>
            <span class="nav-text ms-2"
              >{{ entry.title }}
              <i class="fas fa-angle-left float-end arrow"></i>
            </span>
          </button>
          <ul class="nav nav-treeview">
            <li v-for="child in entry.childs" :key="child.id">
              <router-link
                :to="child.to"
                active-class="active"
                v-bind="child.attrs"
                class="nav-link text-gray px-2 w-100"
              >
                <i class="fas" :class="'fa-' + child.icon" v-if="child.icon"></i>
                <span class="nav-text ms-2">{{ child.title }}</span>
              </router-link>
            </li>
          </ul>
        </div>
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
  name: 'Sidebar',
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

    const toogleChilds = (entry) => {
      const liParent = entry.target.closest('li');
      if (liParent.classList.contains('menu-open')) {
        liParent.classList.remove('menu-open');
      } else {
        liParent.classList.add('menu-open');
      }
    };

    return { uniqueId, entries, toogleChilds };
  },
};
</script>
<style lang="scss" scoped>
.nav-pills {
  overflow: hidden;
}
.nav-pills .nav-link {
  border-color: $primary;
  &:not(.active) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: 2px solid transparent;

    &:hover {
      border-left: 2px solid $primary;
    }
  }
}
.root-element {
  width: $sidebar-width;
  z-index: 1031;
  transition: 0.5s width ease;
}
.nav-link {
  white-space: nowrap;
  font-size: 14px;
  i {
    padding-left: 5px;
  }
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
.nav-sidebar ul.nav-treeview {
  // display: none;
  transition: opacity 1s ease-out;
  opacity: 0;
  height: 0;
  overflow: hidden;
  li {
    padding-left: 16px;
    width: 100%;
  }
}

.nav-sidebar .menu-open ul.nav-treeview {
  // transition: 00.2s ease-in;
  opacity: 1;
  height: auto;
}
.nav-sidebar .menu-open div > .nav-link i.arrow {
  -webkit-transform: rotate(-90deg);
  transform: rotate(-90deg);
  transition: 00.2s ease-in;
}
.nav-sidebar div > .nav-link i.arrow {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
  transition: 00.2s ease-in;
}
.sidebar-menu li a span {
  margin-right: 20px;
  color: #fff;
}
</style>
