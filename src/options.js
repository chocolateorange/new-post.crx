import Vue from 'vue';
import Vuex from 'vuex';

import {
  loadValues,
  saveValues,
} from './modules/storage';

import App from './components/App';

Vue.use(Vuex);

const actions = {
  /**
   * load configs from chrome.storage
   *
   * @return {Promise}
   */
  async loadConfigs() {
    return await loadValues();
  },
  /**
   * save configs to chrome.storage
   *
   * @param {Object} context
   * @param {Object} values
   * @return {Promise}
   */
  async saveConfigs({ getters }, values) {
    return await saveValues(
      Object.assign({}, getters.configs, values)
    );
  },
  /**
   * update store configs
   *
   * @param {Object} context
   * @param {Object} configs
   */
  updateConfigs({ commit }, configs) {
    commit('setConfigs', { configs });
  },
};

const getters = {
  configs: (state) => state.configs,
};

const mutations = {
  setConfigs(state, payload) {
    Object.assign(state.configs, payload.configs);
  },
};

const state = {
  configs: {
    account: '',
    branch: '',
    path: '',
    repository: '',
    template: '',
  },
};

// eslint-disable-next-line no-unused-vars
const app = new Vue({
  el: '#app',
  store: new Vuex.Store({
    actions,
    getters,
    mutations,
    state,
  }),
  render(createElement) {
    return createElement(App);
  },
});
