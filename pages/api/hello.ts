// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';


export default (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === 'POST') {
    res.statusCode = 200;
    res.json({ name: 'John Doe '});
  } else {
    res.statusCode = 200;
    res.json({ 
      status: 500,
      message: 'Method not allowed'
    });
  }
}
