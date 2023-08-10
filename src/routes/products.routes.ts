import { Request, Response, Router } from 'express';
import getProducts from '../utils/queries/getProducts';
import { appendLocationID } from '../utils/utils';

/**
 * Endpoint to fetch products based on location and vendor IDs.
 *
 * This endpoint queries the database to retrieve a list of products based on the specified
 * location and vendor IDs. The fetched products are then appended with the location ID.
 *
 * @route GET /products/:location_id/vendors/:vendor_id
 * @param {Request} _req - The Express request object (unused).
 * @param {Response} res - The Express response object.
 * @returns {void}
 *
 * @throws {Error} If there is an error during database query.
 *
 * @example
 * // GET /products/101/vendors/1
 * // Returns an array of products with appended location ID 101 from vendor 1.
 */

export default function (router: Router, db: any) {
  router.get(
    '/products/:location_id/vendors/:vendor_id',
    async (_req: Request, res: Response) => {
      try {
        const { location_id, vendor_id } = _req.params;

        const response = await db.query(
          getProducts(Number(vendor_id), Number(location_id))
        );
        appendLocationID(response.rows, location_id);
        res.json(response.rows);
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    }
  );
}
