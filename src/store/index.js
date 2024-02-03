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
    companyId: null,

    // dash / ordering
    selectedSquareFeet: 0,
    locationIds: [],

    // measure stuff
    address: '',
    coordinates: null,

    // notifs
    locationSubmitted: false
  },
  getters: {
    
  },
  mutations: {
    // identity
    SET_USER_ID(state, userId) {
      state.userId = userId
    },
    SET_COMPANY_ID(state, companyId) {
      state.companyId = companyId
    },

    // dashboard
    SET_SELECTED_LOCATION_IDS(state, locationIds) {
      state.locationIds = locationIds
    },

    // measure
    SET_COORDINATES(state, coordinates) {
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
    setCompanyId({ commit }, companyId) {
      commit('SET_COMPANY_ID', companyId)
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
