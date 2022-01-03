// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { IDataDetailedMovie, IDataMovie } from 'types';
import { getUrl } from 'utils';

interface Data {
    images: {
        base_url: string
        secure_base_url: string
        backdrop_sizes: string[]
        logo_sizes: string[]
        poster_sizes: string[]
        profile_sizes: string[]
        still_sizes: string[]
    }
    change_keys: string[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const url = process.env.TMDB_API_URL + "/3/configuration";
    const options: {[key: string]: string} = {
        "api_key": process.env.TMDB_API!,
    };

    const dataRaw = await fetch(getUrl(url, options));
    const data = await dataRaw.json() as Data;
    console.log(data);

    res.status(200).json(data)
}
