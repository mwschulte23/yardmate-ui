import { createStore } from 'vuex';
import * as apiService from '../services/apiService';  // Import all functions from apiService
import * as supaService from '../services/supaService'


export default createStore({
  state: {
    test: 'abc',
    locationAddress: '',
    imageUrl: null,
    userId: null
  },
  getters: {
    // temp
    test2: function (state) {
      return `${state.test.toUpperCase()}`
    },
  },
  mutations: {
    setUserId(state, userId) {
      state.userId = userId
    },
    SET_IMAGE_URL(state, url) {
      state.imageUrl = url;
    }
  },
  actions: {
    async fetchLocationImage({ commit }, address ) {
      const imageUrl = await apiService.getLocationImage(address);
      commit('SET_IMAGE_URL', imageUrl);
    }

    // Other actions
  },
  
  // modules: {}  // If you're using modules
});
