import { createStore, Store } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import app from '@/store/modules/app';
import { State } from 'vue';

const plugins = [
    createPersistedState({
        storage: window.sessionStorage,
        paths: ['app'],
    }),
];

export default createStore({
    plugins,
    modules: {
        app,
    },
}) as unknown as Store<State>;


