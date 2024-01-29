import { createStore } from 'vuex';
import * as apiService from '../services/apiService';  // Import all functions from apiService
import * as supaService from '../services/supaService'


export default createStore({
  state: {
    // past & maybe future use
    imageUrl: null,
    
    // actively used
    address: '',
    coordinates: null,
    userId: null,
    userName: '',
    userCompany: '',
    // notifs
    locationSubmitted: false
  },
  getters: {
    
  },
  mutations: {
    setUserId(state, userId) { // TODO update to all caps pattern
      state.userId = userId
    },
    setCoordinates(state, coordinates) { // TODO update to all caps pattern
      state.coordinates = coordinates
    },
    SET_ADDRESS(state, newAddress) {
      state.address = newAddress;
    },
    SET_LOCATION_SUBMITTED(state, locationSubmitted) {
      state.locationSubmitted = locationSubmitted
    },

    // past and probably future use
    SET_IMAGE_URL(state, url) {
      state.imageUrl = url;
    },
  },
  actions: {
    updateAddress({ commit }, address) {
      commit('SET_ADDRESS', address)
    },
    triggerLocationSubmitNotif({ commit }, locationSubmitted) {
      commit('SET_LOCATION_SUBMITTED', locationSubmitted)
    },
    
    // past and probably future use
    async fetchLocationImage({ commit }, address ) {
      const imageUrl = await apiService.getLocationImage(address);
      commit('SET_IMAGE_URL', imageUrl);
    },
  },
});
