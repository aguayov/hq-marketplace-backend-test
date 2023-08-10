const getProducts = (vendor_id: number, location_id: number) => {
  return `SELECT p.*
  FROM products p
  JOIN vendors v ON p.vendor_id = v.id
  JOIN vendors_locations vl ON v.id = vl.vendor_id
  JOIN locations l ON vl.location_id = l.id
    WHERE v.id = ${vendor_id}
      AND l.id = ${location_id};`;
};

export default getProducts;
