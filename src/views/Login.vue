<template>
  <div class="section">
    <div class="columns">
      <div class="column is-one-fifth">Username</div>
      <div class="column">
        <input class="input" type="text" v-model.lazy="username" />
      </div>
    </div>
    <div class="columns">
      <div class="column is-one-fifth">Password</div>
      <div class="column">
        <input class="input" type="password" v-model.lazy="password" />
      </div>
    </div>
    <div class="columns">
      <div class="column"></div>
      <div class="column is-one-fifth">
        <button
          class="button is-link is-outlined is-pulled-right"
          @click="login"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Session from "@/components/Session";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login: function() {
      Session.login(this.username, this.password).then(() => {
        this.$router.push({ name: "Home" });
      });
    }
  }
};
</script>
