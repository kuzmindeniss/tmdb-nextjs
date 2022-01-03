// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { IDataMovie } from 'types';
import { getUrl } from 'utils';

type Data = IDataMovie[];

const url = process.env.TMDB_API_URL + "/3/discover/movie";
const options: {[key: string]: string} = {
    "sort_by": "popularity.desc",
    "api_key": process.env.TMDB_API!,
    "language": process.env.LANGUAGE!,
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const moviesRaw = await fetch(getUrl(url, options));
    const movies: IDataMovie[] = (await moviesRaw.json()).results as IDataMovie[];

    res.status(200).json(movies)
}
