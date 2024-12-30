const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path')
const db = require('./models');
const AuthRoutes = require('./routes/AuthRoutes');
const UserRoutes = require('./routes/UserRoutes');
const ExamenRoutes = require('./routes/ExamenRoutes')
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: 'http://localhost:5173',
    //  optionsSuccessStatus: 200,
    credentials: true,
    //  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use('/storage', express.static(path.join(__dirname, 'storage')));
//app.use('/data', express.static(path.join(__dirname, 'data')));

app.use(cors(corsOptions));
// parse JSON to javascript object
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api/auth', AuthRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/examenes', ExamenRoutes);

db.sequelize.sync().then((req) => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
