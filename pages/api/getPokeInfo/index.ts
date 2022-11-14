// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

interface Poketype {
  name: string;
  url: string;
};

const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});;

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Poketype[]>
) {
  try {
    const { 
      query
    } = req;
    console.log(query);
    let poketypes: Poketype[];
    poketypes = [{name: 'ice', url:'/'}]
  
    // const dbResponse = await prisma[dataType]
  
  
  
    // poketypes = await fetcher('https://pokeapi.co/api/v2/type');
    res.status(200).json(poketypes);
  } catch(err) {
    console.log(err);
    res.status(500);
  }
}

