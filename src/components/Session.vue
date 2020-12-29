<script>
import Api from "./Api";
import router from "../router";
import { reactive } from "vue";

const key = "user";

const guest = {
  id: null,
  username: null,
  token: null,
  role: "GUEST",
  active: false
};

const read = function(field) {
  let stored = localStorage.getItem(key);
  if (!stored) {
    return guest[field];
  }
  return JSON.parse(stored)[field];
};

export default {
  name: "Session",
  created() {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(guest));
    }
  },
  state: reactive({
    id: read("id"),
    username: read("username"),
    token: read("token"),
    role: read("role"),
    active: read("active")
  }),
  login: function(username, password) {
    return Api.post("/api/auth/login/", {
      username: username,
      password: password
    }).then(response => {
      localStorage.setItem(key, JSON.stringify(response.data));
      this.state.id = response.data.id;
      this.state.username = response.data.username;
      this.state.token = response.data.token;
      this.state.role = response.data.role;
      this.state.active = true;
    });
  },
  logout: function() {
    localStorage.setItem(key, JSON.stringify(guest));
    this.state.id = guest.id;
    this.state.username = guest.username;
    this.state.token = guest.token;
    this.state.role = guest.role;
    this.state.active = guest.active;
    router.push({ name: "Home" });
  }
};
</script>
