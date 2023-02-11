const mongoose = require('mongoose');
require('dotenv').config();

const mongoString = process.env.MONGO_URI;
const connectDB = async () => {
  const conn = await mongoose.connect(mongoString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log(`DB connected: ${conn.connection.host}`);
};

connectDB();
