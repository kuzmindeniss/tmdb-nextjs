// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { IDataTV } from 'types';
import { getUrl } from 'utils';

type Data = IDataTV[];

const url = process.env.TMDB_API_URL + "/3/tv/popular";
const options: {[key: string]: string} = {
    "api_key": process.env.TMDB_API!,
    "language": process.env.LANGUAGE!,
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const tvsRaw = await fetch(getUrl(url, options));
    let tvs: IDataTV[];
    try {
        tvs = (await tvsRaw.json()).results;
    } catch (e) {
        tvs = [];
    }

    res.status(200).json(tvs)
}
