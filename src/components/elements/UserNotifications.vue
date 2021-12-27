<template>
  <li class="nav-item dropdown">
    <a
      class="text-reset me-3 dropdown-toggle hidden-arrow"
      href="#"
      id="navbarNotifications"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <i class="fas fa-bell"></i>
      <span class="badge rounded-pill badge-notification bg-danger">1</span>
    </a>

    <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg">
      <li class="header">
        Tienes
        <span class="amount_pending_notifications">0</span> notificaciones sin
        leer
      </li>
      <li><hr class="dropdown-divider" /></li>

      <li>
        <div class="scrollDivMenu overflow-auto">
          <ul
            class="menu list-group list-group-flush"
            id="notifications-menu-messages"
          >
            <li class="list-group-item list-group-item-action">
              <a href="#"
                ><i
                  class="fas fa-exclamation-triangle text-yellow text-wrap"
                ></i
                >13416 - Nuevo comentario en ticket 654654654654.</a
              >
            </li>
            <li class="list-group-item list-group-item-action">
              <a href="#"
                ><i
                  class="fas fa-exclamation-triangle text-yellow text-wrap"
                ></i
                >13416 - Nuevo comentario en ticket 654654654654.</a
              >
            </li>
            <li class="list-group-item list-group-item-action">
              <a href="#"
                ><i
                  class="fas fa-exclamation-triangle text-yellow text-wrap"
                ></i
                >13416 - Nuevo comentario en ticket 654654654654.</a
              >
            </li>
            <li class="list-group-item list-group-item-action">
              <a href="#"
                ><i
                  class="fas fa-exclamation-triangle text-yellow text-wrap"
                ></i
                >13416 - Nuevo comentario en ticket 654654654654.</a
              >
            </li>
            <li class="list-group-item list-group-item-action">
              <a href="#"
                ><i
                  class="fas fa-exclamation-triangle text-yellow text-wrap"
                ></i
                >13416 - Nuevo comentario en ticket 654654654654.</a
              >
            </li>
            <li class="list-group-item list-group-item-action">
              <a href="#"
                ><i
                  class="fas fa-exclamation-triangle text-yellow text-wrap"
                ></i
                >13416 - Nuevo comentario en ticket 654654654654.</a
              >
            </li>
            <li class="list-group-item list-group-item-action">
              <a href="#"
                ><i
                  class="fas fa-exclamation-triangle text-yellow text-wrap"
                ></i
                >13416 - Nuevo comentario en ticket 654654654654.</a
              >
            </li>
            <li class="list-group-item list-group-item-action">
              <a href="#"
                ><i
                  class="fas fa-exclamation-triangle text-yellow text-wrap"
                ></i
                >13416 - Nuevo comentario en ticket 654654654654.</a
              >
            </li>
            <li class="list-group-item list-group-item-action">
              <a href="#"
                ><i
                  class="fas fa-exclamation-triangle text-yellow text-wrap"
                ></i
                >13416 - Nuevo comentario en ticket 654654654654.</a
              >
            </li>
            <li class="list-group-item list-group-item-action">
              <a href="#"
                ><i
                  class="fas fa-exclamation-triangle text-yellow text-wrap"
                ></i
                >13416 - Nuevo comentario en ticket 654654654654.</a
              >
            </li>
          </ul>
        </div>
      </li>
      <li><hr class="dropdown-divider" /></li>
      <li class="footer"><a href="#">Ver mas</a></li>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'UserNotifications',
  props: {},
  setup() {

  },
};
</script>

<style scoped lang="scss">
.dropdown-menu {
  width: 300px;
  list-style: none;
  font-size: 14px;
  text-align: left;
}
.scrollDivMenu {
  position: relative;
  width: 100%;
  height: 200px;
  padding-left: 5px;
}
ul.menu {
  margin: 0;
  padding: 0;
  list-style: none;
}

ul.menu > li > a {
  text-decoration: inherit;
  color: inherit;
  //   cursor: auto;
}
li.header {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  background-color: #fff;
  padding: 7px 10px;
  border-bottom: 1px solid #f4f4f4;
  color: #444;
  font-size: 14px;
}
.dropdown-menu.ul {
  overflow: hidden;
  width: 100%;
  height: 200px;
}
li.footer {
  text-align: center;
  text-decoration: inherit;
}
</style>
