import { HTTPRequest } from 'services/http-common'

import * as Constants from './constants.js'


const getDefaultState = () => ({
    row: {},
    rows: [],
    old_rows: [],
    isLoading: false,
    error: false,
    currentPage: 1,
    totalPages: null,
    totalRows: 0,
});

export default {
    namespaced: true,
    state: getDefaultState(),
    getters: {},
    actions: {
        /**
         * Find all characters and assign found rows to state.
         * 
         * INFOS: res.data.info = info on pages
         *        res.data.results = rows
         */
        async findAll ({ commit }, { page = 1, name = '', reset = false } = {}) {
            if (reset) commit(Constants.RESET_STATE);

            commit(Constants.FIND_ALL_CHARACTERS_START);

            const res = await HTTPRequest('character', 'GET', { page, name });
            if (res.status === 200) {
                commit(Constants.FIND_ALL_CHARACTERS_END, {
                    ...res.data,
                    page
                });
            }
        },

        /**
         * Find one character and assign found row to state.
         * 
         * INFOS: res.data.info = info on pages
         *        res.data.result = row
         */
        async findOne ({ commit }, { id = null } = {}) {
            commit(Constants.FIND_ONE_CHARACTER_START);
            const res = await HTTPRequest(`character/${id}`);
            if (res.status === 200) {
                commit(Constants.FIND_ONE_CHARACTER_END, res.data);
            }
        },

        /**
         * Find character by filters and assign found row to state but keeping old result.
         * Search on current rows loaded. Call to API to come
         * INFOS: res.data.info = info on pages
         *        res.data.result = row
         */
        async findBy ({ commit }, { name = '' } = {}) {
            commit(Constants.FIND_CHARACTERS_BY, { name });
        }
    },
    mutations: {
        // RESET
        [Constants.RESET_STATE] (state) {
            Object.assign(state, getDefaultState())
        },

        // ALL
        [Constants.FIND_ALL_CHARACTERS_START] (state) {
            state.isLoading = true;
            state.error = false;
            state.oldRows = [];
        },
        [Constants.FIND_ALL_CHARACTERS_END] (state, { info = {}, results = [], page = 1 }) {
            state.isLoading = false;
            state.rows = [...state.rows, ...results];
            state.error = false;
            state.currentPage = page;
            state.totalPages = info.pages;
            state.totalRows = info.count;
        },

        // ONE
        [Constants.FIND_ONE_CHARACTER_START] (state) {
            state.isLoading = true;
            state.error = false;
        },
        [Constants.FIND_ONE_CHARACTER_END] (state, row = {}) {
            state.isLoading = false;
            state.error = false;
            state.row = row;
        },

        // FIND BY
        [Constants.FIND_CHARACTERS_BY] (state, { name = '' }) {
            state.isLoading = true;
            if (state.oldRows.length) state.rows = state.oldRows;
            state.oldRows = state.rows;
            state.rows = state.rows.filter(r => r.name.toLowerCase().includes(name));
            state.isLoading = false;
        }
    }
}