import { Request, Response, Router } from 'express';

export default function (router: Router) {
  router.get(
    '/locations/:location_id/vendors/:vendor_id',
    (_req: Request, res: Response) => {
      res.json({
        message: 'pong',
      });
    }
  );
}
