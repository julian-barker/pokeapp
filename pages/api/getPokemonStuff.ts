// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

interface Poketype {
  name: string;
  url: string;
};

type PoketypeList = {
  poketypes: Poketype[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PoketypeList>
) {
  const poketypes: PoketypeList = await fetcher('https://pokeapi.co/api/v2/type');
  res.status(200).json(poketypes);
}
