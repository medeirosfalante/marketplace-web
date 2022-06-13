import PropTypes from "prop-types";
import clsx from "clsx";
import Sticky from "@ui/sticky";
import Button from "@ui/button";
import GalleryTab from "@components/product-details/gallery-tab";
import ProductTitle from "@components/product-details/title";
import ProductCategory from "@components/product-details/category";
import ProductCollection from "@components/product-details/collection";
import BidTab from "@components/product-details/bid-tab";
import PlaceBet from "@components/product-details/place-bet";
import { ImageType } from "@utils/types";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

// Demo Image

const ProductDetailsArea = ({ space, className, product }) => {
    return (
        <div
            className={clsx(
                "product-details-area",
                space === 1 && "rn-section-gapTop",
                className
            )}
        >
            <div className="container">
                <div className="row g-5">
                    <div className="col-lg-7 col-md-12 col-sm-12">
                        <Sticky>
                            <GalleryTab
                                images={[
                                    {
                                        src: "/images/portfolio/lg/portfolio-01.jpg",
                                    },
                                    {
                                        src: "/images/portfolio/lg/portfolio-02.jpg",
                                    },
                                    {
                                        src: "/images/portfolio/lg/portfolio-03.jpg",
                                    },
                                ]}
                            />
                        </Sticky>
                    </div>
                    <div className="col-lg-5 col-md-12 col-sm-12 mt_md--50 mt_sm--60">
                        <div className="rn-pd-content-area">
                            <ProductTitle title={product?.id} likeCount={""} />
                            <span className="bid">
                                Height bid{" "}
                                <span className="price">{product?.price}</span>
                            </span>
                            <h6 className="title-name">
                                #22 Portal , Info bellow
                            </h6>
                            <div className="catagory-collection">
                                <ProductCategory
                                    owner={{
                                        name: "Brodband",
                                        slug: "/author",
                                        image: {
                                            src: "/images/client/client-1.png",
                                        },
                                    }}
                                />
                                <ProductCollection
                                    collection={{
                                        name: "Art Decco",
                                        slug: "/collection",
                                        image: {
                                            src: "/images/client/client-2.png",
                                        },
                                        total_sale: "2500,000",
                                    }}
                                />
                            </div>
                            <Button color="primary-alta" path="#">
                                Unlockable content included
                            </Button>
                            <div className="rn-bid-details">
                                {/* <BidTab
                                    bids={product?.bids}
                                    owner={product.owner}
                                    properties={product?.properties}
                                    tags={product?.tags}
                                    history={product?.history}
                                />
                                <PlaceBet
                                    highest_bid={product.highest_bid}
                                    auction_date={product?.auction_date}
                                /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProductDetailsArea.propTypes = {
    space: PropTypes.oneOf([1, 2]),
    className: PropTypes.string,
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        likeCount: PropTypes.number,
        price: PropTypes.shape({
            amount: PropTypes.number.isRequired,
            currency: PropTypes.string.isRequired,
        }).isRequired,
        owner: PropTypes.shape({}),
        collection: PropTypes.shape({}),
        bids: PropTypes.arrayOf(PropTypes.shape({})),
        properties: PropTypes.arrayOf(PropTypes.shape({})),
        tags: PropTypes.arrayOf(PropTypes.shape({})),
        history: PropTypes.arrayOf(PropTypes.shape({})),
        highest_bid: PropTypes.shape({}),
        auction_date: PropTypes.string,
        images: PropTypes.arrayOf(ImageType),
    }),
};

ProductDetailsArea.defaultProps = {
    space: 1,
};

export default ProductDetailsArea;
