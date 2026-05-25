const path = require('path');
require('dotenv').config();
require('dotenv').config({ path: path.join(__dirname, '.env') });
require('dotenv').config({ path: path.join(__dirname, 'config', '.env') });

const connectDB = require('./config/db');
const Property = require('./models/Property');

const insertProperty = async () => {
  let connection;
  try {
    connection = await connectDB();
    await Property.create({
      name: 'Modern Architecture Center',
      description: 'A beautiful modern architecture center with a large tilted roof structure.',
      price: 2500000,
      location: 'City Center',
      type: 'sale',
      category: 'bungalow',
      images: [
        'http://localhost:5000/images/prop1.jpg',
        'http://localhost:5000/images/prop2.jpg'
      ],
      amenities: ['Parking', 'Garden', 'Security'],
    });
    console.log('Images and property added successfully!');
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    if (connection) {
      await connection.connection.close();
    }
  }
};

insertProperty();
