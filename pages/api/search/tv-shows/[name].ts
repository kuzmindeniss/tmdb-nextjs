// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { IDataTV } from 'types';
import { getUrl } from 'utils';

type Data = IDataTV[];

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const name = req.query.name as string || " ";
    const url = process.env.TMDB_API_URL + "/3/search/tv";
    const options: {[key: string]: string} = {
        "api_key": process.env.TMDB_API!,
        "language": process.env.LANGUAGE!,
        "query": name,
    };

    const tvsRaw = await fetch(getUrl(url, options));
    const tvs: IDataTV[] = (await tvsRaw.json()).results as IDataTV[];

    res.status(200).json(tvs)
}