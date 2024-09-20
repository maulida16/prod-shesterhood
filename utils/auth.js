const bcrypt = require('bcrypt');

// Fungsi untuk memverifikasi password
async function verifyPassword(inputPassword, hashedPassword) {
  return await bcrypt.compare(inputPassword, hashedPassword);
}

module.exports = { verifyPassword };
