const registerOrder = (
  order_id: number,
  customerName: string,
  total: number,
  locationID: number
) => {
  return `INSERT INTO orders(
	id, customer_name, total, location_id)
	VALUES (${order_id},'${customerName}',${total}, ${locationID});`;
};

export default registerOrder;
