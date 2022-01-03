// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { IDataActor } from 'types';
import { getUrl } from 'utils';

type Data = IDataActor;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const id = req.query.id as string || " ";
    const url = process.env.TMDB_API_URL + "/3/person/" + id;
    const options: {[key: string]: string} = {
        "api_key": process.env.TMDB_API!,
        "language": process.env.LANGUAGE!,
        "append_to_response": "movie_credits,tv_credits,external_ids"
    };

    const movieRaw = await fetch(getUrl(url, options));
    const movie = await movieRaw.json() as IDataActor;

    res.status(200).json(movie)
}
