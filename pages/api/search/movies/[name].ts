// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { IDataMovie } from 'types';
import { getUrl } from 'utils';

type Data = IDataMovie[];

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const name = req.query.name as string || " ";
    const url = process.env.TMDB_API_URL + "/3/search/movie";
    const options: {[key: string]: string} = {
        "api_key": process.env.TMDB_API!,
        "language": process.env.LANGUAGE!,
        "query": name,
    };

    const moviesRaw = await fetch(getUrl(url, options));
    const movies: IDataMovie[] = (await moviesRaw.json()).results as IDataMovie[];

    res.status(200).json(movies)
}
