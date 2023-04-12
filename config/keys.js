// const PaySetting = require('../models/PaySetting');
// let keys;
// // let result;
// const getKeys = async () => {
//   try {
//     const result = await PaySetting.findOne({});
//     keys = {
//       monthly: result.monthly,
//       privateKey: result.privateKey,
//       publicKey: result.publicKey
//     }
//     console.log(result);
//     console.log(keys);
//   } catch (error) {
//     console.log('catch');
//   }
// }

// getKeys();
// module.exports = keys;

module.exports = {
  monthly: 100,
  privateKey: 'sk_test_51MJd55BcEpf7YLjkcSXeGgTFbWcRfcboouNmhsAQyYrLaLt1DDySMsPiznzrhEuTKQqPtGJni8MkNCJ3kdmnx4qK00FyJEJHbp',
  publicKey: 'pk_test_51MJd55BcEpf7YLjkKqvCF8Pz9dNJlgYBGNY2QlLRMAcWQ2VLaecVoZ9cygCAhu5gvDlZu2iugs8M1HnKcS6D0nkF00yzIkxlzj' 
};