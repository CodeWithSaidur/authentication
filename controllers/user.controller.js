// user.controller.js
// *import model first and understand Schema carefully
import { User } from '../models/user.model.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export const registerUser = async (req, res) => {
  // get data
  const { name, email, password } = req.body;

  // validate
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: 'Please fill all fields' });
  }

  // check if user already exists
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        massage: 'User already exist',
      });
    }

    // create user
    const user = await User.create({
      name,
      email,
      password,
    });
    console.log(user);

    if (!user) {
      return res.status(400).json({
        massage: 'User Not register',
      });
    }

    // create verification token using crypto
    const token = crypto.randomBytes(32).toString('hex');
    console.log(token);

    // save token to db
    user.verificationToken = token;
    await user.save();

    // send verification email
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.MAILTRAP_SENDER_EMAIL,
      to: user.email,
      subject: 'Test Email',
      text: `Click to Verify ${process.env.BASE_URL}/api/v1/user/verify/${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
    });

    // send response to user
    res.status(201).json({
      massage: 'User register Successfully',
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      massage: 'User Not Registered',
      success: false,
      error,
    });
  }
};

export const verifyUser = async (req, res) => {
  // get token from url
  const { token } = req.params;
  console.log(token);

  // validate
  if (!token) {
    return res.status(400).json({
      massage: 'Invalid token',
    });
  }

  // find user based on token
  const user = await User.findOne({
    verificationToken: token,
  });

  // if not
  if (!user) {
    return res.status(400).json({
      massage: 'Invalid Token',
    });
  }

  // set isVerified true
  user.isVerified = true;

  // remove verification token
  user.verificationToken = undefined;

  // save
  await user.save();

  // return response
  // At end of verifyUser function
  res.status(200).json({
    message: 'User verified successfully',
    success: true,
  });
};
