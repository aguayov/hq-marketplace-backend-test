import { Request, Response, Router } from 'express';

export default function (router: Router) {
  router.post('/checkout', (_req: Request, res: Response) => {
    res.json({
      message: 'pong',
    });
  });
}
