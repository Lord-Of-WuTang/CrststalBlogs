const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

require("dotenv").config();

exports.signup = async (req, res) => {
  const user = await userModel.findOne({ username: req.user.username });

  user.firstname = req.body.firstname;
  user.lastname = req.body.lastname;
  user.email = req.body.email;
  user.username = req.body.username;

  await user.save();

  delete user.password;

  res.status(201).json({
    message: "You have Successfully Signed up!",
    user: user,
  });
};

exports.login = (req, res, { err, user, info }) => {
  if (!user) {
    return res.json({ message: "Username or Password is Incorrect!" });
  }

  // req.login is provided by passport
  req.login(user, { session: false }, async (error) => {
    if (error) return res.status(400).json(error);

    const body = { _id: user._id, username: user.username };
    //You store the id and username in the payload of the JWT.
    // You then sign the token with a secret or key (JWT_SECRET), and send back the token to the user.
    // DO NOT STORE PASSWORDS IN THE JWT!
    const token = jwt.sign(
      { user: body },
      process.env.JWT_SECRET || "something_secret"
    );

    return res.status(200).json({ token });
  });
};
