const User = require('../models/User');
const bcrypt = require('bcryptjs');

const checkAdmin = async () => {
  try {
    const result = await User.findOne({ role: true });
    if (!result) {
      console.log('create');
      const admin = new User ({
        name: 'admin',
        email: 'admin@cryptnote.com',
        password: '000000',
        role: true
      });

      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash('000000', salt);

      await admin.save();
    } else {
      console.log('already exist')
    }
  } catch (error) {
    
  }
}

module.exports = checkAdmin;