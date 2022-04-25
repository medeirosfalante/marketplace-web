import produce from "immer";

import { SET_WEB3_PROVIDER, SET_WEB3_ADDRESS, SET_WEB3_ASSETS } from "./types";

const INITIAL_STATE = {
    isAuthenticated: false,
    provider: null,
    web3Provider: null,
    address: null,
    network: null,
    assets: [],
};

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_WEB3_PROVIDER:
            return produce(state, (draft) => {
                draft.isAuthenticated = true;
                draft.provider = action.payload.provider;
                draft.web3Provider = action.payload.web3Provider;
                draft.address = action.payload.address;
                draft.network = action.payload.network;
                draft.assets = []
            });
        case SET_WEB3_ADDRESS:
            return produce(state, (draft) => {
                draft.address = action.payload.address;
            });
        case SET_WEB3_ASSETS:
            return produce(state, (draft) => {
                draft.assets = action.payload.assets;
            });

        default:
            return state;
    }
}
