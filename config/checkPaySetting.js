const PaySetting = require('../models/PaySetting');

const checkAdmin = async () => {
  try {
    const result = await PaySetting.findOne({});
    if (!result) {
      console.log('create');
      const paysetting = new PaySetting({
        monthly: 100,
        privateKey: 'sk_test_YOUR_STRIPE_SECRET_KEY',
        publicKey: 'pk_test_YOUR_STRIPE_PUBLIC_KEY'
      });

      await paysetting.save();
    } else {
      console.log('already exist');
    }
  } catch (error) {}
};

module.exports = checkAdmin;
