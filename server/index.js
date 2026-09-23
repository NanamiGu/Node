const express = require('express');
const cors = require('cors');
const connectDb=require("./config/db")
const app = express();
const userRoutes = require('./routes/userRoute');

connectDb();
app.use(express.json());
app.use(cors());
app.use('/api/users',userRoutes);






app.listen(5000, () => {
  console.log('Server is running on port 5000');
});