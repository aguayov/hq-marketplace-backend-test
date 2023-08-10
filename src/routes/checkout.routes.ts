import { Request, Response, Router } from 'express';
import {
  validateCartItems,
  generateOrderID,
  orderRegistration,
  calculateOrderTotal,
  orderItemRegistration,
} from '../utils/utils';

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
