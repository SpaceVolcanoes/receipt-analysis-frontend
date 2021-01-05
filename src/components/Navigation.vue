<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img alt="Vue logo" src="../assets/logo.png" />
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu is-active">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/">Home</router-link>
        <router-link v-if="active" class="navbar-item" :to="customerUrl"
          >Receipts</router-link
        >
        <router-link class="navbar-item" to="/about">About</router-link>
        <router-link v-if="role === 'ADMIN'" class="navbar-item" to="/images"
          >Images</router-link
        >
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
            <router-link class="button is-primary" to="/register">
              <strong>Sign up</strong>
            </router-link>
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
import Session from "@/components/Session";

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
    role() {
      return Session.state.role;
    },
    customerUrl() {
      return "/customers/" + Session.state.id + "/receipts";
    }
  }
};
</script>
