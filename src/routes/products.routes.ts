import { Request, Response, Router } from 'express';
import getProducts from '../utils/queries/getProducts';

export default function (router: Router, db: any) {
  router.get(
    '/products/:location_id/vendors/:vendor_id',
    async (_req: Request, res: Response) => {
      try {
        const { location_id, vendor_id } = _req.params;

        const result = await db.query(
          getProducts(Number(vendor_id), Number(location_id))
        );
        res.json(result.rows);
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    }
  );
}
