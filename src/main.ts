import { createApp } from "vue";

import App from "./App.vue";
import { router } from "./router";

import "./styles/civi-tokens.css";
import "./styles/uswds.scss";

createApp(App).use(router).mount("#app");
