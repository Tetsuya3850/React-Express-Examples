const { User, newToken } = require("./userModel");

module.exports.signup = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).end();
  }

  try {
    const user = await User.create(req.body);
    const token = newToken(user);
    return res.status(201).send({ token });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).send({ email: "Duplicate email!" });
    } else {
      return res.status(500).end();
    }
  }
};

module.exports.signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).end();
  }

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ email: "Email not found!" });
    }

    const match = await user.checkPassword(req.body.password);
    if (!match) {
      return res.status(401).send({ password: "Password wrong!" });
    }

    const token = newToken(user);
    return res.status(201).send({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
};
