// seeders/seedUsers.js
const User = require('../models/User'); // Pastikan path-nya benar
const bcrypt = require('bcrypt');

async function seedUsers() {
    try {
        // Hash password sebelum seeding
        const salt = await bcrypt.genSalt(10);
        const hashedPassword1 = await bcrypt.hash('Shesterh00dJaya45!', salt);
        const hashedPassword2 = await bcrypt.hash('Shesterh00dG0!', salt);

        await User.bulkCreate([
            { username: 'admin1', password: hashedPassword1 },
            { username: 'admin2', password: hashedPassword2 }
        ]);

        console.log('Users berhasil dibuat');
    } catch (error) {
        console.error('Error seeding users:', error);
    }
}

seedUsers();

