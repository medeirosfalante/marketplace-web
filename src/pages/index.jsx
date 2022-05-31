import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import HeroArea from "@containers/hero/layout-04";
import LiveExploreArea from "@containers/live-explore/layout-01";
import ExploreProductArea from "@containers/explore-product/layout-03";
import TopSellerArea from "@containers/top-seller/layout-01";
import ServiceArea from "@containers/services/layout-01";
import CollectionArea from "@containers/collection/layout-01";
import { normalizedData } from "@utils/methods";
import * as WalletActions from "../store/modules/wallet/actions";

import { useDispatch, useSelector } from "react-redux";
import { ethers, Contract, utils } from "ethers";

// Demo data
import homepageData from "../data/homepages/home-04.json";
import sellerData from "../data/sellers.json";
import productData from "../data/products.json";
import collectionsData from "../data/collections.json";
import IMarketplace from "../data/IMarketplace.json";
import { useState, useEffect } from "react";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Home = () => {
    const { contract } = useSelector((state) => state.wallet);
    const [collection, setCollection] = useState([]);

    const content = normalizedData(homepageData?.content || []);
    const liveAuctionData = productData
        .filter(
            (prod) =>
                prod?.auction_date && new Date() <= new Date(prod?.auction_date)
        )
        .sort(
            (a, b) =>
                Number(new Date(b.published_at)) -
                Number(new Date(a.published_at))
        )
        .slice(0, 5);

    const handleCollections = async () => {
        if (contract === undefined) {
            return;
        }
        const collections = await contract.listCollections();
        setCollection(collections);
    };

    useEffect(async () => {
        handleCollections();
    }, [contract]);

    return (
        <Wrapper>
            <SEO pageTitle="Home Four" />
            <Header />
            <main id="main-content">
                <HeroArea data={content["hero-section"]} />
                <LiveExploreArea
                    data={{
                        ...content["live-explore-section"],
                        products: liveAuctionData,
                    }}
                />
                <ExploreProductArea
                    data={{
                        ...content["explore-product-section"],
                        products: productData,
                    }}
                />
                <TopSellerArea
                    data={{
                        ...content["top-sller-section"],
                        sellers: sellerData,
                    }}
                />
                <ServiceArea data={content["service-section"]} />
                <CollectionArea
                    data={{
                        ...content["collection-section"],
                        collections: collection,
                    }}
                />
            </main>
            <Footer />
        </Wrapper>
    );
};

export default Home;
