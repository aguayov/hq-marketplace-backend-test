import validateProduct from './queries/validateProducts';
import registerOrder from './queries/registerOrder';
import registerOrderProducts from './queries/registerOrderItems';

const appendLocationID = (rows: any, value: string) => {
  rows.forEach((obj: any) => {
    obj['location_id'] = value;
  });
};

type orderType = {
  id: number;
  customer_name: string;
  total: number;
  location_id: number;
};

interface orderItemsType {
  cart: cart[];
  order_item_id: number;
  order_id: number;
}

interface cart {
  id: number;
  name: string;
  price: number;
  vendor_id: number;
  location_id: number;
  quantity: number;
}

const validateCartItems = async (cart: cart[], db: any) => {
  try {
    const promises: Promise<any>[] = [];
    cart.forEach((item) => {
      console.log(item);
      promises.push(
        db.query(validateProduct(item.vendor_id, item.location_id, item.id))
      );
    });
    const result = await Promise.all(promises);
    const isValid = validateSQLRowContent(result);
    return isValid;
  } catch (error) {
    console.error('Error validating product:', error);
    return false;
  }
};

const validateSQLRowContent = (responses: any) => {
  for (const response of responses) {
    if (response.rows && response.rows.length > 0) {
      for (const row of response.rows) {
        const values = Object.values(row);
        const hasEmptyValue = values.some(
          (value) => value === null || value === undefined || value === ''
        );
        if (hasEmptyValue) {
          return false;
        }
      }
    } else {
      return false;
    }
  }
  return true;
};

const orderRegistration = async (ordertype: orderType, db: any) => {
  const { id, customer_name, total, location_id } = ordertype;
  await db.query(registerOrder(+id, customer_name, total, +location_id));
};

const orderItemRegistration = async (ordertype: orderItemsType, db: any) => {
  const order_item_id = ordertype.order_item_id;
  const original_order_id = ordertype.order_id;
  const promises: Promise<any>[] = [];
  try {
    ordertype?.cart?.forEach((item) => {
      const { id, quantity } = item;
      promises.push(
        db.query(
          registerOrderProducts(order_item_id, id, quantity, original_order_id)
        )
      );
    });
    const result = await Promise.all(promises);
    if (result) {
      return true;
    }
  } catch (error) {
    console.error('Error validating product:', error);
    return false;
  }
};

const generateOrderID = (): number => {
  const digits = '0123456789';
  let id = '';

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * 5);
    id += digits.charAt(randomIndex);
  }

  return Number(id);
};

const calculateOrderTotal = (cart: cart[]): number => {
  let orderTotal = 0;

  for (const item of cart) {
    if (typeof item.price === 'number') {
      const itemTotal = item.price * item.quantity;
      orderTotal += itemTotal;
    }
  }
  return orderTotal;
};

export {
  appendLocationID,
  validateCartItems,
  orderRegistration,
  generateOrderID,
  orderType,
  calculateOrderTotal,
  orderItemRegistration,
};
