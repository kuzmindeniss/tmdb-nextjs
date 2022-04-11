// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { IDataMovie } from 'types';
import { getUrl } from 'utils';

type Data = IDataMovie[];

const url = process.env.TMDB_API_URL + "/3/discover/movie";
const options: {[key: string]: string} = {
    "sort_by": "primary_release_date.desc",
    "vote_count.gte": "4000",
    "api_key": process.env.TMDB_API!,
    "language": process.env.LANGUAGE!,
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const moviesRaw = await fetch(getUrl(url, options));
    let movies: IDataMovie[];
    try {
        movies = await moviesRaw.json();
    } catch (e) {
        movies = [];
    }

    res.status(200).json(movies)
}
