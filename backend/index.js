const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const dbConnect = require('./config/database');
const authRouter = require('./routes/authRoute');
const connectCloudinary = require('./config/cloudinary');
const questionRouter = require('./routes/questionRoute');
const fileUpload = require('express-fileupload');
const profileRouter = require('./routes/profileRoute');
const answerRouter = require('./routes/answerRoute');
const notificationRouter = require('./routes/notificationRoute');

require("dotenv").config();

dbConnect();
connectCloudinary();

app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/questions', questionRouter);
app.use('/api/v1/profile', profileRouter);
app.use('/api/v1/answers', answerRouter);
app.use('/api/v1/notifications', notificationRouter);

app.get('/', (req, res) => {
    res.send('API running successfully');
});

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is running on port ${process.env.PORT || 4000}`);
});