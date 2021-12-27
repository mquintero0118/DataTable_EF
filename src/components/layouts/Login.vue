<template>
  <main>
    <router-view />
  </main>
</template>

<script>
import { onUnmounted } from 'vue';
/**
 * A boxed layout for the login form
 * @displayName LoginLayout
 * @version 1.0.0
 */
export default {
  name: 'LoginLayout',
  setup() {
    document.body.classList.add('login');
    onUnmounted(() => {
      document.body.classList.remove('login');
    });
  },
};
</script>

<style lang="scss">
.login {
  #app {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
  }

  body {
    display: flex;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5 !important;
    text-align: center !important;
  }
}
</style>
