import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
// import Vuelidate from 'vuelidate'
// Vue.use(Vuelidate)

Vue.config.productionTip = false;

new Vue({
  store,
  vuetify,

  render: function (h) {
    return h(App);
  },
}).$mount("#app");
