require('dotenv').config({ path: './config/.env' });
const connectDB = require('./config/db');
const Property = require('./models/Property');

const seedProperties = async () => {
  let connection;
  try {
    connection = await connectDB();
    await Property.deleteMany({});
    await Property.insertMany([
      {
        name: 'Luxury Bungalow',
        description: 'A beautiful luxury bungalow with garden.',
        price: 1200000,
        location: 'Los Angeles, CA',
        type: 'sale',
        category: 'bungalow',
        images: ['https://res.cloudinary.com/demo/image/upload/sample.jpg'],
        amenities: ['Pool', 'Garage', 'Garden'],
      },
      {
        name: 'Plainplot in Pune',
        description: 'Spacious plainplot ideal for building.',
        price: 400000,
        location: 'Pune, MH',
        type: 'sale',
        category: 'plainplot',
        images: ['https://res.cloudinary.com/demo/image/upload/sample.jpg'],
        amenities: ['Near Highway'],
      },
      {
        name: 'Farmland Retreat',
        description: 'Green farmland perfect for agriculture.',
        price: 600000,
        location: 'Nashik, MH',
        type: 'sale',
        category: 'farmland',
        images: ['https://res.cloudinary.com/demo/image/upload/sample.jpg'],
        amenities: ['Water Source', 'Fencing'],
      },
    ]);
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.connection.close();
      console.log('Database connection closed.');
    }
  }
};

seedProperties();