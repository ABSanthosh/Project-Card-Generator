import { Action, action, createStore, persist } from "easy-peasy";

export interface StoreModel {
  repoData: any;
  description: string;
  setRepoDetails: Action<StoreModel, string>;
  setDescription: Action<StoreModel, string>;
}

const storeModel: StoreModel = {
  repoData: {},
  description: "",
  setRepoDetails: action((state, payload) => {
    state.repoData = payload;
  }),
  setDescription: action((state, payload) => {
    state.description = payload;
  }),
};

const store = createStore(persist(storeModel, { storage: localStorage }));

export default store;
