import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import { DATABASE_URL } from "../constants";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        invoice_items: [],
        loading: true,
        error: ''
    },
    getters: {
        invoiceSummary(state) {
            let summary = 0;
            for (let key in state.invoice_items) {
                summary += parseInt(state.invoice_items[key].price) * parseInt(state.invoice_items[key].quantity);
            }
            return summary;
        }
    },
    mutations: {
        changeLoading(state) {
            state.loading = !state.loading;
        },
        reloadItems(state, payload) {
            state.invoice_items = payload
        },
        singleEditing(state) {
            for (let key in state.invoice_items) {
                state.invoice_items[key] = {
                    ...state.invoice_items[key],
                    is_editing: false
                }
            }
        },
        invoiceItemAdd(state, payload) {
            state.invoice_items = [
                ...state.invoice_items,
                payload
            ]
        },
        invoiceItemDelete(state, payload) {
            const id = state.invoice_items.findIndex(item => item.id == payload.id);
            state.invoice_items = state.invoice_items.filter(inv_item =>
                inv_item.id !== state.invoice_items[id].id
            );
        },
        changeInvoiceItemState(state, payload) {
            const id = state.invoice_items.findIndex(item => item.id == payload.id);
            Vue.set(state.invoice_items, id, payload);
        }
    },
    actions: {
        putInvoiceItem({commit, state}, payload) {
            return new Promise((resolve, reject) => {
                axios({
                    method: 'PUT',
                    url: `${DATABASE_URL}/${payload.id}`,
                    data: payload
                }).then(() => {
                    commit('changeInvoiceItemState', payload);
                    resolve();
                }).catch(() => {
                    state.error = 'Connection refused, please check the json-server';
                    reject();
                });
            })
        },
        addInvoiceItem({commit, state}, payload) {
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url: DATABASE_URL,
                    data: payload
                }).then(() => {
                    commit('invoiceItemAdd', payload);
                    resolve();
                }).catch(() => {
                    state.error = 'Connection refused, please check the json-server';
                    reject();
                });
            })

        },
        deleteInvoiceItem({commit, state}, payload) {
            axios({
                method: 'DELETE',
                url: `${DATABASE_URL}/${payload.id}`,
                data: payload
            }).then(() => {
                commit('invoiceItemDelete', payload)
            }).catch(() => {
                state.error = 'Connection refused, please check the json-server';
            });
        }
    }
});