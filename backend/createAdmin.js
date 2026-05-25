const path = require('path');
require('dotenv').config();
require('dotenv').config({ path: path.join(__dirname, '.env') });
require('dotenv').config({ path: path.join(__dirname, 'config', '.env') });

const connectDB = require('./config/db');
const Admin = require('./models/Admin');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const createAdmin = async () => {
    try {
        await connectDB();

        rl.question('Enter Admin Email: ', (email) => {
            rl.question('Enter Admin Password: ', async (password) => {
                try {
                    const admin = new Admin({ email, password });
                    await admin.save();
                    console.log('\n✅ Admin account created successfully!');
                    console.log(`Email: ${email}`);
                } catch (err) {
                    console.error('\n❌ Failed to create admin:', err.message);
                } finally {
                    rl.close();
                    process.exit(0);
                }
            });
        });
    } catch (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
};

createAdmin();
