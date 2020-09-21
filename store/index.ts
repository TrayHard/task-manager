import { Module, createStore } from 'vuex-smart-module';
import { auth } from './auth';
import { task } from './tasks';

const root = new Module({
    modules: {
        auth,
        task,
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
