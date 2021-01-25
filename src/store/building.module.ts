import Vue from 'vue'
import Vuex from 'vuex'
import BuildingModel from '@/models/Building.model'

Vue.use(Vuex)

interface BuildingState {
  building: BuildingModel | null;
}

const state: BuildingState = {
  building: null
}

const mutations = {
  setBuilding (state: BuildingState, building: BuildingModel) {
    state.building = building
  }
}

const actions = {
}

const getters = {
  getBuilding (): BuildingModel | null {
    return state.building
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
