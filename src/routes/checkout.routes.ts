import { Request, Response, Router } from 'express';
import {
  validateCartItems,
  generateOrderID,
  orderRegistration,
  calculateOrderTotal,
  orderItemRegistration,
} from '../utils/utils';

/**
 * Endpoint for processing a checkout and creating an order.
 *
 * This endpoint handles the checkout process by validating cart items, generating
 * an order ID, registering the order, and registering order items. It returns a
 * success response if the checkout process is successful.
 *
 * @route POST /checkout
 * @param {Request} _req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {void}
 *
 * @throws {Error} If there is an error during the checkout process.
 *
 * @example
 * // POST /checkout
 * // Request body: { "cart": [...], "customer_information": { ... } }
 * // Returns a success response if the checkout process is successful.
 */

export default function (router: Router, db: any) {
  router.post('/checkout', async (_req: Request, res: Response) => {
    try {
      let result;
      const payload = _req.body;
      const { cart, customer_information } = payload;
      const isValid = await validateCartItems(cart, db);
      if (isValid) {
        const id: number = generateOrderID();
        const itemID: number = generateOrderID();
        const { customer_name } = customer_information;
        const total = calculateOrderTotal(cart);
        const { location_id } = cart[0];

        await orderRegistration({ id, customer_name, total, location_id }, db);
        result = await orderItemRegistration(
          { cart: cart, order_item_id: itemID, order_id: id },
          db
        );
      }
      if (result) {
        res.status(200).json({ success: true });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  });
}
