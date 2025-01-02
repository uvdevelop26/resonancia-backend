const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const db = require('./models');
const AuthRoutes = require('./routes/AuthRoutes');
const UserRoutes = require('./routes/UserRoutes');
const ExamenRoutes = require('./routes/ExamenRoutes');
const cookieParser = require('cookie-parser');


const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
};

app.use('/storage', express.static(path.join(__dirname, 'storage')));

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api/auth', AuthRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/examenes', ExamenRoutes);

db.sequelize.sync({ alter: false, force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error("Unable to connect to the database:", err);
});

