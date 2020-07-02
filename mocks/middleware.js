module.exports = (req, res, next) => {
  if (req.method === 'POST') {
    // If the method is a POST echo back the name from request body
    let message = 'Success';
    res.json({ status: 200, message });
  } else {
    next();
  }
};
