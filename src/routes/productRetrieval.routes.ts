import { Request, Response, Router } from 'express';

export default function (router: Router, db: any) {
  router.get(
    '/locations/:location_id/vendors/:vendor_id',
    (_req: Request, res: Response) => {
      res.json({
        message: 'pong',
      });
    }
  );
}
