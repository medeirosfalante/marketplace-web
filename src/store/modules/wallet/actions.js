import {
    SET_WEB3_PROVIDER,
    RESET_WEB3_PROVIDER,
    SET_WEB3_ADDRESS,
    SET_WEB3_ASSETS,
    SET_WEB3_NETWORK,
    SET_WEB3_CONTRACT,
} from "./types";

export function setProvider({
    provider,
    web3Provider,
    address,
    network,
    contract,
}) {
    return {
        type: SET_WEB3_PROVIDER,
        payload: {
            provider,
            web3Provider,
            address,
            network,
            contract,
        },
    };
}

export function resetProvider() {
    return { type: RESET_WEB3_PROVIDER };
}

export function setAddress({ address }) {
    return {
        type: SET_WEB3_ADDRESS,
        payload: { address },
    };
}

export function SetNetwork(network) {
    return {
        type: SET_WEB3_NETWORK,
        payload: { network },
    };
}

export function setBalances({ assets }) {
    return {
        type: SET_WEB3_ASSETS,
        payload: { assets },
    };
}

export function setContract({ contract }) {
    return {
        type: SET_WEB3_CONTRACT,
        payload: { contract },
    };
}
