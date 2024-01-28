import { createStore } from 'vuex';
import * as apiService from '../services/apiService';  // Import all functions from apiService
import * as supaService from '../services/supaService'


export default createStore({
  state: {
    address: '',
    coordinates: null,
    imageUrl: null,
    userId: null,
    userName: '',
    userCompany: ''
  },
  getters: {
    
  },
  mutations: {
    setUserId(state, userId) {
      state.userId = userId
    },
    setCoordinates(state, coordinates) {
      state.coordinates = coordinates
    },
    SET_IMAGE_URL(state, url) {
      state.imageUrl = url;
    },
    SET_ADDRESS(state, newAddress) {
      state.address = newAddress;
    }
  },
  actions: {
    async fetchLocationImage({ commit }, address ) {
      const imageUrl = await apiService.getLocationImage(address);
      commit('SET_IMAGE_URL', imageUrl);
    },
    updateAddress({ commit }, address) {
      commit('SET_ADDRESS', address)
    }
  },
});
