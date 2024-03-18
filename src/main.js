import { createApp } from 'vue'
import App from './App.vue'
import vuetify from "./plugins/vuetify.js";
import pinia from "./plugins/pinia.js";
import router from "./plugins/router.js";
import "./global.css"
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001/docs"


createApp(App).use(vuetify).use(router).use(pinia).mount('#app')
