// Using Express.js, the routing for Users is done here
import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { isAuth, generateToken } from '../utils.js';

const userRouter = express.Router();

// POST method route for User sign in authentication
userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          admin: user.admin,
          token: generateToken(user),
        });
        return;
      }
    }
    res
      .status(401)
      .send({ message: 'Either the email or password or both are not valid' });
  })
);

// POST method route for creating a new User
userRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      admin: user.admin,
      token: generateToken(user),
    });
  })
);

export default userRouter;
