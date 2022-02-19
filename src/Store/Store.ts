import { Action, action, createStore, persist } from "easy-peasy";

export interface StoreModel {
  repoData: any;
  setRepoDetails: Action<StoreModel, string>;
}

const storeModel: StoreModel = {
  repoData: {},
  setRepoDetails: action((state, payload) => {
    state.repoData = payload;
  }),
};

const store = createStore(persist(storeModel,{ storage: localStorage }));

export default store;
