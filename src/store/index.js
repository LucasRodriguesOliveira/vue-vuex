import Vue from 'vue';
import Vuex from 'vuex';

import state from './_state';
import getters from './_getters';
import mutations from './_mutations';
import actions from './_actions';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: 'production' !== process.env.NODE_ENV,
  state,
  getters,
  actions,
  mutations
});