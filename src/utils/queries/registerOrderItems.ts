const registerOrderItems = (
  id: number,
  product_id: number,
  quantity: number,
  order_id: number
) => {
  return `INSERT INTO order_items(
    id, product_id, quantity, order_id)
    VALUES (${id}, ${product_id}, ${quantity}, ${order_id});`;
};

export default registerOrderItems;
