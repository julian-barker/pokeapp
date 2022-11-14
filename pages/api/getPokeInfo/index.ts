import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(404).json({error: 'This route must be called with a subroute ("move" or "pokemon")'});
}

