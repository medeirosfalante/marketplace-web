// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";

export default (request: NextApiRequest, response: NextApiResponse) => {
    const nft = [
        {
            name: "Nome do Nft",
            description: "Descrição do NFT",
            url: "https://url.nft.com",
        },
        {
            name: "Nome do Nft 2",
            description: "Descrição do NFT 2",
            url: "https://url.nft2.com",
        },
    ];
    return response.json(nft);
};
