<template>
  <div>
    <form class="signin" @submit.prevent="submitForm">
      <img class="mb-4" :src="Logo" alt="" width="72" height="57" />
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="username"
          placeholder="Username"
          v-model.trim="userName"
          autocomplete="off"
        />
        <label for="floatingInput">Username</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          v-model.trim="password"
          autocomplete="off"
        />
        <label for="floatingPassword">Password</label>
      </div>

      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" v-model.trim="rememberMe" />
          Remember me
        </label>
      </div>
      <button class="w-100 btn btn-lg btn-primary  text-white" type="submit">
        Sign in
      </button>
      <p class="mt-5 mb-3 text-muted">
        © {{ new Date().getFullYear() }} Copyright:
        <a class="text-dark text-decoration-none" href="https://www.enviaflores.com/"
          >Enviaflores.com</a
        >
      </p>
    </form>
    <Loader :loading="isLoading" />
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useStore } from 'vuex';
import moment from 'moment';
import Loader from '@/components/elements/Loader.vue';
import Logo from '@/assets/img/logo.png';

export default {
  components: { Loader },
  name: 'Login',
  setup() {
    const toast = useToast();
    const router = useRouter();
    const store = useStore();

    const userName = ref('');
    const password = ref('');
    const rememberMe = ref(false);
    const isLoading = ref(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isAuth');

    const submitForm = () => {
      if (!userName.value || !password.value) {
        toast.error('Completa todos los campos', {
          position: 'top-right',
          timeout: 3000,
        });
        return;
      }
      if (userName.value !== 'admin' || password.value !== 'admin') {
        userName.value = '';
        password.value = '';
        toast.error('Username or password invalid', {
          position: 'top-right',
          timeout: 3000,
        });
        return;
      }

      // const formData = {
      //   username: userName.value,
      //   passsword: password.value,
      //   remember: rememberMe.value,
      // };
      isLoading.value = true;

      setTimeout(() => {
        const profile = {
          id: 12345678,
          name: 'Edgardo',
          fullName: 'Edgardo Acosta',
          profilePicture: 'https://avatars.githubusercontent.com/u/11066125?v=4',
          profile: 'Developer',
        };
        store.dispatch('user/setUserProfile', profile);
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2NzgsIm5hbWUiOiJFZGdhcmRvIiwiZnVsbE5hbWUiOiJFZGdhcmRvIEFjb3N0YSIsInByb2ZpbGVQaWN0dXJlIjoiaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzExMDY2MTI1P3Y9NCIsInByb2ZpbGUiOiJEZXZlbG9wZXIiLCJpYXQiOjE1MTYyMzkwMjJ9.XwwDLKgx5cHqkFFLi3L0NRlff5oAD1BISFd9NLq1zTE';
        const expiration = moment()
          .add(1, 'days')
          .utc();

        document.cookie = `session=${token}; expires=${expiration} UTC; path=/; secure; `;
        localStorage.setItem('user', JSON.stringify(profile));
        localStorage.setItem('isAuth', true);
        router.replace({ path: '/' });
        isLoading.value = false;
      }, 2000);
    };
    return {
      Logo,
      submitForm,
      userName,
      password,
      rememberMe,
      isLoading,
    };
  },
};
</script>

<style scoped lang="scss">
.signin.checkbox {
  font-weight: 400;
}

.signin.form-floating:focus-within {
  z-index: 2;
}

.signin input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.signin input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
