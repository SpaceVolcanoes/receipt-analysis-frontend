<script>
import axios from "axios";
import Session from "../components/Session";

function attachHeader(config) {
  if (!Session.state.active) {
    return config;
  }

  if (!config.headers) {
    config.headers = {};
  }
  config.headers["Authorization"] = "Bearer " + Session.state.token;
  return config;
}

export default {
  name: "Api",
  get: function(url = "", config = {}) {
    return axios.get(url, attachHeader(config));
  },
  post: function(url = "", data = {}, config = {}) {
    return axios.post(url, data, attachHeader(config));
  },
  put: function(url = "", data = {}, config = {}) {
    return axios.put(url, data, attachHeader(config));
  },
  delete: function(url = "", config = {}) {
    return axios.delete(url, attachHeader(config));
  }
};
</script>
