// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IPopularPeopleObject } from 'components/PopularPeopleList/types';
import type { NextApiRequest, NextApiResponse } from 'next'
import { IDataActor } from 'types';
import { getUrl } from 'utils';

type Data = IPopularPeopleObject;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const page = req.query.page as string || undefined;
    const url = process.env.TMDB_API_URL + "/3/person/popular";
    const options: {[key: string]: string | undefined} = {
        "api_key": process.env.TMDB_API!,
        "language": process.env.LANGUAGE!,
        "page": page
    };

    const peopleRaw = await fetch(getUrl(url, options));
    const peopleObj = await peopleRaw.json() as IPopularPeopleObject;

    res.status(200).json(peopleObj)
}
