import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import ExploreProductArea from "@containers/explore-product/layout-01";
import { useSelector } from "react-redux";

// Demo data
import productData from "../data/products.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Explore = () => {
    const { contract, categories } = useSelector((state) => state.wallet);
    // // const ordersCategory = orderByCategory.find(({ name }) => name === path);

    return (
        <Wrapper>
            <SEO pageTitle="Explore Category" />
            <Header />
            <main id="main-content">
                <Breadcrumb
                    pageTitle="Explore Filter"
                    currentPage="Explore With Filter"
                />
                {/* <ExploreProductArea
                    data={{
                        section_title: {
                            title: "Explore Category",
                        },
                        products: productData,
                    }}
                /> */}
            </main>
            <Footer />
        </Wrapper>
    );
};

export default Explore;
