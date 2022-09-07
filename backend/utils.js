import jwt from 'jsonwebtoken';

// Accepts the user information except for password for security reasons and returns a token for user authentication
export const generateToken = (user) => {
  return jwt.sign(
    { _id: user._id, name: user.name, email: user.email, admin: user.admin },
    process.env.JWT_SECRET,
    { expiresIn: '60d' }
  );
};

// Checks the user token to see if it matches, if any error occurs then it is invalid
export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'The token is invalid' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'There is no token' });
  }
};
