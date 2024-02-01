import { createStore } from 'vuex';
import * as apiService from '../services/apiService';  // Import all functions from apiService
import * as supaService from '../services/supaService'


export default createStore({
  state: {
    // past & maybe future use
    imageUrl: null,
    // identity
    userId: null,
    userName: '',
    userCompany: '',
    // measure stuff
    address: '',
    coordinates: null,
    // dash / ordering
    selectedSquareFeet: 0,

    // notifs
    locationSubmitted: false
  },
  getters: {
    
  },
  mutations: {
    SET_USER_ID(state, userId) { // TODO update to all caps pattern
      state.userId = userId
    },
    SET_COORDINATES(state, coordinates) { // TODO update to all caps pattern
      state.coordinates = coordinates
    },
    SET_ADDRESS(state, newAddress) {
      state.address = newAddress;
    },
    SET_LOCATION_SUBMITTED(state, locationSubmitted) {
      state.locationSubmitted = locationSubmitted
    },
    SET_SELECTED_SQUARE_FEET(state, selectedSquareFeet) {
      state.selectedSquareFeet = selectedSquareFeet
    },
    // past and probably future use
    SET_IMAGE_URL(state, url) {
      state.imageUrl = url;
    },
  },
  actions: {
    setUserId({ commit }, userId) {
      commit('SET_USER_ID', userId)
    },
    updateAddress({ commit }, address) { // TODO remove and just hit mutations direct (actions for async!!)
      commit('SET_ADDRESS', address)
    },
    triggerLocationSubmitNotif({ commit }, locationSubmitted) { // TODO remove and just hit mutations direct (actions for async!!)
      commit('SET_LOCATION_SUBMITTED', locationSubmitted)
    },
    
    // past and probably future use
    async fetchLocationImage({ commit }, address ) {
      const imageUrl = await apiService.getLocationImage(address);
      commit('SET_IMAGE_URL', imageUrl);
    },
  },
});
