// Basic
import Vue from 'vue';
import App from './App.vue';
import router from './router/';
import store from './store/';
import './registerServiceWorker';

// Library
import VueCommon from '@/library/VueCommon';

//VeeValidate : https://baianat.github.io/vee-validate/
import VeeValidate, { Validator } from 'vee-validate';
import ko from 'vee-validate/dist/locale/ko';
import VueMq from 'vue-mq';
import VueLocalStorage from 'vue-localstorage';
import VModal from 'vue-js-modal';
import Notifications from 'vue-notification';
import VueLodash from 'vue-lodash';
import VuejsDialog from 'vuejs-dialog';
import 'vuejs-dialog/dist/vuejs-dialog.min.css';

import Vue2Filters from 'vue2-filters';

import html from '@/library/htmlinjection';
import sess from '@/library/session';

import "nprogress/nprogress.css";

Vue.config.productionTip = false;
Vue.use(VueCommon);
Vue.use(VeeValidate);
Validator.localize('ko', ko);
Vue.use(VueMq, {
  breakpoints: {
    sm: 768,
    md: 1080,
    lg: Infinity
  }
});
Vue.use(VueLocalStorage);
Vue.use(VModal, { injectModalsContainer: true, dynamic: true });
Vue.use(Notifications);
Vue.use(VueLodash);
Vue.use(VuejsDialog);

// Vue.use(VueMomentJs, moment);
Vue.use(Vue2Filters);
// 임시 전역 컴포넌트

html.setTitle(router);
sess.setRouterSession(router, store);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
