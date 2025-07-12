const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const dbConnect = require('./config/database');
const authRouter = require('./routes/authRoute');

require("dotenv").config();

dbConnect();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);

app.get('/', (req, res) => {
    res.send('API running successfully');
});

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is running on port ${process.env.PORT || 4000}`);
});