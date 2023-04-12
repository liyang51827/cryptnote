const PaySetting = require('../models/PaySetting');

const checkAdmin = async () => {
  try {
    const result = await PaySetting.findOne({ });
    if (!result) {
      console.log('create');
      const paysetting = new PaySetting ({
        monthly: 100,
        privateKey: 'sk_test_51MJd55BcEpf7YLjkcSXeGgTFbWcRfcboouNmhsAQyYrLaLt1DDySMsPiznzrhEuTKQqPtGJni8MkNCJ3kdmnx4qK00FyJEJHbp',
        publicKey: 'pk_test_51MJd55BcEpf7YLjkKqvCF8Pz9dNJlgYBGNY2QlLRMAcWQ2VLaecVoZ9cygCAhu5gvDlZu2iugs8M1HnKcS6D0nkF00yzIkxlzj' 
      });

      await paysetting.save();
    } else {
      console.log('already exist')
    }
  } catch (error) {
    
  }
}

module.exports = checkAdmin;