require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000;

async function start() {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is required');
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is required');
  await connectDB();
  app.listen(PORT, () => console.log(`Product Inventory API listening on port ${PORT}`));
}

start().catch((error) => {
  console.error('Application startup failed:', error.message);
  process.exit(1);
});
