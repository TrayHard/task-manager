import { Module, createStore } from 'vuex-smart-module';
import { auth } from './auth';
import { counter } from './counter';

const root = new Module({
    modules: {
        auth,
        counter,
    }
});

export const store = createStore(root);

export const {
    state,
    getters,
    mutations,
    actions,
    modules,
    plugins
} = root.getStoreOptions();
