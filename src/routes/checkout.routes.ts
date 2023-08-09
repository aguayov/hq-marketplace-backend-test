import { Request, Response, Router } from 'express';

export default function (router: Router, db: any) {
  router.post('/checkout', (_req: Request, res: Response) => {
    res.json({
      message: 'pong',
    });
  });
}
