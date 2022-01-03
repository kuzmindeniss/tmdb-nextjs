// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { IDataMovie } from 'types';

type Data = {
  movies: IDataMovie[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const moviesRaw = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API}&query=Jack+Reacher`);
  const movies: IDataMovie[] = (await moviesRaw.json()).results as IDataMovie[];
  console.log(movies);
  res.status(200).json({ movies  })
}
