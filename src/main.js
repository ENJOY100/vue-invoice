import Vue from 'vue';
import App from './App.vue';
import store from './store';
import Vuelidate from 'vuelidate';

Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    store,
    render: h => h(App)
});
