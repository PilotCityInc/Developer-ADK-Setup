import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import './registerServiceWorker';
import { ValidationObserver, ValidationProvider } from '@/validation';
import VueMask from 'v-mask';

import App from './App.vue';
import vuetify from './plugins/vuetify';

Vue.use(VueMask);

Vue.config.productionTip = false;

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.use(VueCompositionApi);
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app');
