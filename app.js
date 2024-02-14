const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const router = require('./routes/userRouter');
const path=require('path')
const morgan = require('morgan')
const nocache = require('nocache');
const flash=require('connect-flash')
const adminrouter = require('./routes/adminRouter');
require('dotenv').config();





const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname,'views')))

//MORGAN
app.use(morgan('tiny'))

// Configure express-session
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use the routers
app.use('/', router);
app.use('/admin', adminrouter); 




const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
