// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { IDataMovie } from 'types';
import { getUrl } from 'utils';

type Data = IDataMovie[];

const url = process.env.TMDB_API_URL + "/3/discover/tv";
const options: {[key: string]: string} = {
    "api_key": process.env.TMDB_API!,
    "language": process.env.LANGUAGE!,
    "with_type": "2",
    "with_watch_monetization_types": "free",
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const tvsRaw = await fetch(getUrl(url, options));
    let tvs: IDataMovie[];
    try {
        tvs = await tvsRaw.json();
    } catch (e) {
        tvs = [];
    }

    res.status(200).json(tvs)
}
