import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { useMoralis } from "react-moralis";
import Logo from "@components/logo";
import MainMenu from "@components/menu/main-menu";
import MobileMenu from "@components/menu/mobile-menu";
import SearchForm from "@components/search-form/layout-01";
import FlyoutSearchForm from "@components/search-form/layout-02";
import UserDropdown from "@components/user-dropdown";
import NetworkDropDown from "@components/network-dropdown";
import ColorSwitcher from "@components/color-switcher";
import BurgerButton from "@ui/burger-button";
import Anchor from "@ui/anchor";
import Button from "@ui/button";
import { useOffcanvas, useSticky, useFlyoutSearch } from "@hooks";
import headerData from "../../../data/general/header-01.json";
import menuData from "../../../data/general/menu-01.json";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import * as WalletActions from "../../../store/modules/wallet/actions";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers, Contract, getDefaultProvider, utils } from "ethers";

import erc20 from "../../../data/erc20.json";
import networkRefs from "../../../data/network.json";
import tokens from "../../../data/tokens.json";
import IMarketplace from "../../../data/IMarketplace.json";

const providerOptions = {
    // walletconnect: {
    //     package: WalletConnectProvider, // required
    //     options: {
    //         infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
    //     },
    // },
};

let web3Modal;
if (typeof window !== "undefined") {
    web3Modal = new Web3Modal({
        cacheProvider: true,
        providerOptions, // required
    });
}

const Header = ({ className }) => {
    const sticky = useSticky();
    const { offcanvas, offcanvasHandler } = useOffcanvas();
    const { search, searchHandler } = useFlyoutSearch();
    const dispatch = useDispatch();
    const [category, setCategory] = useState([]);

    const {
        isAuthenticated,
        provider,
        address,
        web3Provider,
        network,
        networks,
    } = useSelector((state) => state.wallet);

    const authenticate = useCallback(async () => {
        try {
            const provider = await web3Modal.connect();
            const web3Provider = new ethers.providers.Web3Provider(provider);
            const signer = web3Provider.getSigner();
            const address = await signer.getAddress();
            const network = await web3Provider.getNetwork();
            const contract = new ethers.Contract(
                "0xb78fb76Bc79b9B165B1F8C54795eD4FCB35E47eC",
                IMarketplace.abi,
                web3Provider
            );
            const categories = await contract.listCategory();

            let seletecItem = networkRefs.find(
                (item) => item.key == network.name
            );
            dispatch(WalletActions.SetNetwork(seletecItem));

            setCategory(categories);

            dispatch(
                WalletActions.setProvider({
                    provider,
                    web3Provider,
                    address,
                    network: seletecItem,
                })
            );
        } catch (e) {
            console.log("connect error", e);
        }
    });

    const getTokens = async (address, web3Provider) => {
        let Promises = [];
        console.log(network.chainId);
        tokens.forEach(async (item) => {
            const contract = new Contract(
                item.address[network.chainId],
                erc20,
                web3Provider
            );
            Promises.push(
                new Promise((resolve, reject) => {
                    contract
                        .balanceOf(address)
                        .then((balance) =>
                            resolve({
                                icon: item.icon,
                                name: item.name,
                                symbol: item.symbol,
                                balance: parseFloat(
                                    utils.formatUnits(balance, item.decimals)
                                ),
                            })
                        )
                        .catch((e) => reject(e));
                })
            );
        });
        return Promise.all(Promises);
    };

    useEffect(async () => {}, [network]);

    useEffect(async () => {
        if (address && network) {
            let listbalances = await getTokens(address, web3Provider);
            dispatch(WalletActions.setBalances({ assets: listbalances }));
        }
    }, [address, web3Provider, dispatch]);

    useEffect(() => {
        if (web3Modal && web3Modal.cachedProvider) {
            authenticate();
        }
    }, []);
    useEffect(() => {
        if (provider?.on) {
            const handleAccountsChanged = (accounts) =>
                dispatch(WalletActions.setAddress({ address: accounts[0] }));
            const handleChainChanged = (_hexChainId) => {
                if (typeof window !== "undefined") {
                    console.log("switched to chain...", _hexChainId);
                    window.location.reload();
                } else {
                    console.log("window is undefined");
                }
            };

            const handleDisconnect = (error) => {};

            provider.on("accountsChanged", handleAccountsChanged);
            provider.on("chainChanged", handleChainChanged);
            provider.on("disconnect", handleDisconnect);

            // Subscription Cleanup
            return () => {
                if (provider.removeListener) {
                    provider.removeListener(
                        "accountsChanged",
                        handleAccountsChanged
                    );
                    provider.removeListener("chainChanged", handleChainChanged);
                    provider.removeListener("disconnect", handleDisconnect);
                }
            };
        }
    }, [provider]);

    return (
        <>
            <header
                className={clsx(
                    "rn-header haeder-default black-logo-version header--fixed header--sticky",
                    sticky && "sticky",
                    className
                )}
            >
                <div className="container">
                    <div className="header-inner">
                        <div className="header-left">
                            <Image
                                src="/images/logo/logo-white.png"
                                width={150}
                                height={25}
                            />
                            <div className="mainmenu-wrapper">
                                <nav
                                    id="sideNav"
                                    className="mainmenu-nav d-none d-xl-block"
                                >
                                    <MainMenu
                                        menu={menuData}
                                        categories={category}
                                    />
                                </nav>
                            </div>
                        </div>
                        <div className="header-right">
                            <div className="setting-option d-none d-lg-block">
                                <SearchForm />
                            </div>
                            <div className="setting-option rn-icon-list d-block d-lg-none">
                                <div className="icon-box search-mobile-icon">
                                    <button
                                        type="button"
                                        aria-label="Click here to open search form"
                                        onClick={searchHandler}
                                    >
                                        <i className="feather-search" />
                                    </button>
                                </div>
                                <FlyoutSearchForm isOpen={search} />
                            </div>
                            {!isAuthenticated && (
                                <div className="setting-option header-btn">
                                    <div className="icon-box">
                                        <Button
                                            color="primary-alta"
                                            className="connectBtn"
                                            size="small"
                                            onClick={() => authenticate()}
                                        >
                                            Wallet connect
                                        </Button>
                                    </div>
                                </div>
                            )}
                            {isAuthenticated && (
                                <div className="setting-option rn-icon-list user-account">
                                    <UserDropdown />
                                </div>
                            )}
                            <div className="setting-option rn-icon-list user-account">
                                <NetworkDropDown />
                            </div>
                            <div className="setting-option rn-icon-list notification-badge">
                                <div className="icon-box">
                                    <Anchor path={headerData.activity_link}>
                                        <i className="feather-bell" />
                                        <span className="badge">6</span>
                                    </Anchor>
                                </div>
                            </div>
                            <div className="setting-option mobile-menu-bar d-block d-xl-none">
                                <div className="hamberger">
                                    <BurgerButton onClick={offcanvasHandler} />
                                </div>
                            </div>
                            <div
                                id="my_switcher"
                                className="setting-option my_switcher"
                            >
                                <ColorSwitcher />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <MobileMenu
                isOpen={offcanvas}
                onClick={offcanvasHandler}
                menu={menuData}
                logo={headerData.logo}
            />
        </>
    );
};

Header.propTypes = {
    className: PropTypes.string,
};

export default Header;
