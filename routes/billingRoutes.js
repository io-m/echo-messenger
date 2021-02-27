const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const isLoggedIn = require("../middlewares/requireLogin");

module.exports = (app) => {
  app.post("/api/stripe", isLoggedIn, async (req, res) => {
    const chargeResult = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "5 US dollars for 5 credit points",
      source: req.body.id,
    });
    req.user.credits += 5;
    const updatedUser = await req.user.save();
    res.send(updatedUser);
  });
};
