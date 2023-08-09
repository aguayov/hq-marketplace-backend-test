const appendLocationID = (rows, value) => {
  rows.forEach((obj) => {
    obj['location_id'] = value;
  });
};

export { appendLocationID };
