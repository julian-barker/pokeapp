import type { NextApiRequest, NextApiResponse } from 'next'
// import { PrismaClient } from '@prisma/client';
import prisma from '../../../lib/prismadb';

// const prisma = new PrismaClient();

const fetcher = (url: string) => fetch(url)
  .then((res) => res.json())
  .catch(() => {});

function capitalize(str: string): string {
  const transformed = str[0].toUpperCase() + str.slice(1);
  return transformed;
}

type PrismaModel = (typeof prisma.move)|(typeof prisma.pokemon)|null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { slug } = req.query;
    
    if (typeof slug === 'string' || slug === undefined || slug.length < 2) {
      throw 'slug of invalid type - expected string[]';
    }

    const [ dataType, idString ] = slug;
    const id = parseInt(idString);
    const table = capitalize(dataType);
    const prismaTable = table === 'Move' ? prisma.move : table === 'Pokemon' ? prisma.pokemon : null;

    let source = 'database';
    let result = await query(table, prismaTable, id);

    
    if(!result) {
      result = await fetcher(`https://pokeapi.co/api/v2/${dataType}/${id}`);
      if (!result) throw 'API call failed';
      
      source = 'pokeAPI call';

      const writeResponse = await prismaTable?.create({
        data: {
          id: id,
          body: result!
        }
      });
      
      if (writeResponse) {
        console.log(`Performed write - ${dataType}: ${id}`)
      };
    }
    
    const responseObj = { 
      dataType,
      result, 
      source }
  
    return res.status(200).json(responseObj);
  } catch(err) {
    console.log(err);
    res.status(500);
  }
}


async function query(table: string, prismaTable: PrismaModel, id: number) {
  const dbResponse = await prismaTable?.findUnique({
    where: {
      id: id
    },
    select: {
      body: true
    }
  });
  if (dbResponse) {
    console.log(`Performed read - ${table}: ${id}`)
  };

  return dbResponse?.body;
}

