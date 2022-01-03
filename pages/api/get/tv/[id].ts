// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { IDataDetailedTV } from 'types';
import { getUrl } from 'utils';

type Data = IDataDetailedTV;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const id = req.query.id as string || " ";
    const url = process.env.TMDB_API_URL + "/3/tv/" + id;
    const options: {[key: string]: string} = {
        "api_key": process.env.TMDB_API!,
        "language": process.env.LANGUAGE!,
        "append_to_response": "recommendations,similar"
    };

    const TVRaw = await fetch(getUrl(url, options));
    const TV = await TVRaw.json() as IDataDetailedTV;

    res.status(200).json(TV)
}
