require('dotenv').config();

const access = (req, res, next) => {
  const key = process.env.KEY;
  const { token } = req.headers;
  if (key !== token) {
    return res.status(400).send({
      status: 'failed',
      message: 'key token invalid',
    });
  }
  return next();
};

const utils = { access };

export default utils;
