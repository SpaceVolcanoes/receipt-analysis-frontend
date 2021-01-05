import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import LoadScript from "vue-plugin-load-script";
import mitt from "mitt";

const app = createApp(App);

app.use(router);
app.use(LoadScript);
app.use(VueAxios, axios);

app.config.globalProperties.eventBus = mitt();

app.mount("#app");
