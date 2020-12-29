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

const session = {
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
      write({ ...response.data, active: true });
    });
  },
  logout: function() {
    write(guest);
    router.push({ name: "Home" });
  },
  update: function(data) {
    write(data);
  }
};

const write = function(data) {
  localStorage.setItem(key, JSON.stringify(data));
  session.state.id = data.id;
  session.state.username = data.username;
  session.state.token = data.token;
  session.state.role = data.role;
  session.state.active = data.active;
};

export default session;
</script>
