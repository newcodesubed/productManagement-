const mongoose = require('mongoose');
const User = require('./Models/User_model'); // Adjust the path as per your project structure

async function createAdminUser() {
    try {
        // Check if admin user already exists
        const existingAdmin = await User.findOne({ role: 'admin' });
        if (existingAdmin) {
            console.log('Admin user already exists.');
            return;
        }

        // Create a new admin user
        const adminUser = new User({
            email: 'admin@admin.com',
            password: 'admin', 
            role: 'admin'
        });

        await adminUser.save();
        console.log('Admin user created successfully.');
    } catch (error) {
        console.error('Error creating admin user:', error.message);
    }
}

// Call the function to create admin user
createAdminUser();