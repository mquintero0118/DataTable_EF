<template>
  <!-- Navbar -->
  <nav
    class="navbar navbar-expand-lg fixed-top main-navbar
    navbar-dark bg-primary py-1 shadow"
  >
    <!-- Container wrapper -->
    <div class="container-fluid">
      <div class="d-flex navbar-brand-wrapper justify-content-center">
        <!-- Navbar brand -->
        <a class="navbar-brand mt-2 mt-lg-0" href="/">
          <img
            :src="Logo"
            height="24"
            class="full-logo"
            alt=""
            loading="lazy"
          />
          <img
            :src="LogoResponsive"
            height="30"
            class="mini-logo"
            alt=""
            loading="lazy"
          />
        </a>
      </div>

      <!-- Toggle button -->
      <div class="flex-fill">
        <button
          class="btn btn-primary btn-lg py-0 text-white"
          type="button"
          @click="toggleSidebar"
        >
          <i class="fas fa-bars"></i>
        </button>
      </div>

      <!-- Right elements -->
      <ul class="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
        <!-- Icon -->
        <li class="nav-item">
          <a class="text-reset me-3" href="#">
            <i class="fas fa-shopping-cart"></i>
          </a>
        </li>

        <!-- Notifications -->
        <!-- <UserNotifications /> -->

        <!-- Avatar -->
        <UserMenu></UserMenu>

        <button
          class="btn btn-primary text-white border-0"
          type="button"
          @click="openRightMenu"
        >
          <i class="fas fa-cogs"></i>
        </button>
      </ul>
      <!-- Right elements -->
    </div>
    <!-- Container wrapper -->
  </nav>
  <!-- Navbar -->
</template>
<script>
import { onMounted, onUnmounted, inject } from 'vue';
import UserMenu from '@/components/elements/UserMenu.vue';
// import UserNotifications from '@/components/elements/UserNotifications.vue';
import Logo from '@/assets/img/logo_enviaflores.png';
import LogoResponsive from '@/assets/img/logo_enviaflores_mobile.png';

export default {
  name: 'Navbar',
  components: {
    UserMenu,
    // UserNotifications,
  },
  setup() {
    const emitter = inject('$emitter');

    const openRightMenu = () => {
      emitter.emit('sidemenu.open.right');
    };

    const toggleSidebar = () => {
      emitter.emit('sidebar.toggle');
    };

    onMounted(() => {
      document.body.classList.add('with-navbar');
    });

    onUnmounted(() => {
      document.body.classList.remove('with-navbar');
    });

    return {
      Logo,
      LogoResponsive,
      openRightMenu,
      toggleSidebar,
    };
  },
};
</script>
<style lang="scss" scoped>
.navbar-brand {
  margin-right: 0;
}
.navbar-brand-wrapper {
  width: 100%;
  padding-right: 0.75rem;
  max-width: calc(#{$sidebar-width} - 0.75rem);
  transition: 0.5s max-width ease;
  overflow: hidden;
}
.mini-logo {
  display: none;
}
.with-sidebar {
  .main-navbar {
    z-index: 1032;
  }
}
.sidebar-collapsed {
  .navbar-brand-wrapper {
    max-width: calc(#{$sidebar-collapsed-width} - 0.75rem);
  }
  .full-logo {
    display: none;
  }
  .mini-logo {
    display: block;
  }
}
</style>
<style lang="scss">
.with-sidebar {
  .main-wrapper {
    transition: 0.5s padding ease;
    padding-left: $sidebar-width;
    padding-top: 52px;
  }
  &.sidebar-collapsed {
    .main-wrapper {
      padding-left: #{$sidebar-collapsed-width};
    }
  }
}
</style>
