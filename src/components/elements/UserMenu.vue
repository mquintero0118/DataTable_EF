<template>
  <li class="nav-item dropdown" v-if="profile">
    <a
      class="dropdown-toggle d-flex align-items-center hidden-arrow"
      href="#"
      id="navbarUserMenu"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <img
        :src="profile.profilePicture"
        class="user-image rounded-circle elevation-2"
        height="30"
        alt=""
        loading="lazy"
      />
      <span class="d-none d-md-inline text-white">{{ profile.fullName }}</span>
    </a>
    <ul class="dropdown-menu dropdown-menu-lg-end">
      <!-- User image -->
      <li class="user-header bg-primary">
        <img
          :src="profile.profilePicture"
          class="rounded-circle elevation-2"
          alt="User Image"
        />

        <p>{{ profile.fullName }} - {{ profile.profile }}</p>
      </li>
      <!-- Menu Body -->
      <li class="user-body">
        <div class="row">
          <div class="col-4 text-center">
            <a href="#">Followers</a>
          </div>
          <div class="col-4 text-center">
            <a href="#">Sales</a>
          </div>
          <div class="col-4 text-center">
            <a href="#">Friends</a>
          </div>
        </div>
        <!-- /.row -->
      </li>
      <!-- Menu Footer-->
      <li class="user-footer">
        <router-link to="/" class="btn btn-primary">Profile</router-link>
        <a class="btn btn-danger float-end" @click="logout">
          >Sign out</a
        >
      </li>
    </ul>
  </li>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'UserMenu',
  setup() {
    const router = useRouter();
    const store = useStore();
    const user = computed(() => store.state.user);
    const profile = user.value?.profile ?? null;
    const logout = () => {
      localStorage.removeItem('user');
      localStorage.removeItem('isAuth');
      router.replace({ path: '/login' });
    };

    return { profile, logout };
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/elements/_userserMenu.scss";
</style>
