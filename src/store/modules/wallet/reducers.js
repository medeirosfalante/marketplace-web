import produce from "immer";

import {
    SET_WEB3_PROVIDER,
    SET_WEB3_ADDRESS,
    SET_WEB3_ASSETS,
    SET_WEB3_NETWORK,
    SET_WEB3_CONTRACT,
} from "./types";

const INITIAL_STATE = {
    isAuthenticated: false,
    provider: null,
    web3Provider: null,
    address: null,
    network: null,
    assets: [],
    contract: {},
    networks: [
        {
            name: "Binance Smart Chain",
            rpc: "",
            chain_id: "",
            icon: "https://chainstack.com/wp-content/uploads/2021/06/bsc-icon-logo-1-1.png",
        },
        {
            name: "Polygon",
            rpc: "",
            chain_id: "",
            icon: "https://cdn.iconscout.com/icon/free/png-256/polygon-token-4086724-3379854.png",
        },
    ],
    networkRef: {
        name: "Binance Smart Chain",
        rpc: "",
        chain_id: "",
        icon: "https://chainstack.com/wp-content/uploads/2021/06/bsc-icon-logo-1-1.png",
    },
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
                draft.contract = action.payload.contract;

                draft.networks = [
                    {
                        name: "Binance Smartchain",
                        key: "bnb",
                        chainName: "Binance Smartchain Mainnet",
                        rpcUrls: ["https://rpc-mainnet.matic.network/"],
                        chainId: "0x38",
                        icon: "https://chainstack.com/wp-content/uploads/2021/06/bsc-icon-logo-1-1.png",
                        nativeCurrency: {
                            name: "BNB",
                            symbol: "BNB",
                            decimals: 18,
                        },
                        blockExplorerUrls: [
                            "https://chainstack.com/wp-content/uploads/2021/06/bsc-icon-logo-1-1.png",
                        ],
                    },
                    {
                        name: "Polygon",
                        key: "matic",
                        chainName: "Matic Mainnet",
                        rpcUrls: ["https://rpc-mainnet.matic.network/"],
                        chainId: "0x89",
                        icon: "https://cdn.iconscout.com/icon/free/png-256/polygon-token-4086724-3379854.png",
                        nativeCurrency: {
                            name: "MATIC",
                            symbol: "MATIC",
                            decimals: 18,
                        },
                        blockExplorerUrls: ["https://polygonscan.com/"],
                    },
                ];

                draft.assets = [];
            });
        case SET_WEB3_ADDRESS:
            return produce(state, (draft) => {
                draft.address = action.payload.address;
            });
        case SET_WEB3_ASSETS:
            return produce(state, (draft) => {
                draft.assets = action.payload.assets;
            });
        case SET_WEB3_NETWORK:
            return produce(state, (draft) => {
                draft.network = action.payload.network;
            });
        case SET_WEB3_CONTRACT:
            return produce(state, (draft) => {
                draft.contract = action.payload.contract;
            });
        default:
            return state;
    }
}
