<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img alt="Vue logo" src="../assets/logo.png" />
      </a>

      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/">Home</router-link>
        <router-link v-if="active" class="navbar-item" :to="customerUrl"
          >CustomerReceipts</router-link
        >
        <router-link class="navbar-item" to="/about">About</router-link>
      </div>
      <div class="navbar-end">
        <div v-if="active" class="navbar-item">
          <div class="buttons">
            <a class="button is-primary" @click="logout">
              <strong>Log out</strong>
            </a>
          </div>
        </div>
        <div v-else class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <router-link class="button is-light" to="/login"
              >Log in</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Session from "./Session";

export default {
  name: "Navigation",
  methods: {
    logout: function() {
      Session.logout();
    }
  },
  computed: {
    active() {
      return Session.state.active;
    },
    username() {
      return Session.state.username;
    },
    customerUrl() {
      return "/customers/" + Session.state.id + "/receipts";
    }
  }
};
</script>
