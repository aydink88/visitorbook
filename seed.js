const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(
    "mongodb+srv://aydink:akelek01@cluster0.fsyby.mongodb.net/visitorbook",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  );

  console.log(`DB connected: ${conn.connection.host}`);
};

connectDB();
