const { User } = require("../models/user");

exports.users = (req, res) => {
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    cart: req.user.cart,
    history: req.user.history
  });
};

exports.register = (req, res) => {
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err)
      return res.status(400).send({
        success: false,
        message: "e-mail is already exist"
      });
    res.status(200).send({
      success: true,
      userData: doc
    });
  });
};

exports.login = (req, res) => {
  const user = User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.status(400).send({
        success: false,
        message: "Email is invalid"
      });

    //compare password
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ success: false, message: "Wrong password" });
      //GenerateTOken
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res
          .cookie("auth", user.token)
          .status(200)
          .json({
            success: true
          });
      });
    });
  });
};
exports.logout = (req, res) => {
  User.findByIdAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
    if (err) return res.status(400).send({ success: false });
    return res.status(200).send({
      success: true
    });
  });
};
