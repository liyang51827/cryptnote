const { generateKeySync } = require("crypto");
const express = require("express");
const router = express.Router();
const PaySetting = require('../../models/PaySetting');
let keys = require('../../config/keys');
let stripe = null;

const getKey = async () => {
  const myKey = await PaySetting.findOne({});
  if (myKey) {
    const { monthly, publicKey, privateKey } = myKey;
    keys.monthly = monthly;
    keys.publicKey = publicKey;
    keys.privateKey = privateKey;
  }
  // init Stripe
  stripe = require("stripe")(keys.privateKey);
};
getKey();

const calculateOrderAmount = (items) => {
  return 100;
};

router.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  console.log(keys);
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = router;