// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
// to use TypeScript

export default (req, res) => {
    // const mint = [
    //     {
    //         name: "Dave Starbelly",
    //         discription:
    //             "Friendly OpenSea Creature that enjoys long swims in the ocean.",
    //         url: "https://openseacreatures.io/3",
    //         images: "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png",
    //         attributes: [],
    //     },
    // ];
    // const nft = new nftMint({
    //     name: "",
    //     discription: "",
    //     url: "",
    //     price: "",
    //     size: "",
    //     images: "",
    //     propertiy: "",
    //     royality: "",
    //     size: "",
    //     attributes: [],
    // });

    console.log(req);

    res.status(200).json(req);
};
