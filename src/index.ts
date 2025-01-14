import express, { Request, Response } from 'express';
const dotenv = require('dotenv');
const mysqlPool = require('../config/db');
const jobRoutes = require('../routes/jobRoutes')

//configure dotenv
dotenv.config();

// rest object 
const app = express();

//middleware 
app.use(express.json());

//routes 
app.use('/api', jobRoutes);
//port 
const port = process.env.PORT || 8000;


mysqlPool.query('SELECT 1').then(() => {
    console.log("DB Connected");
    //listen
    app.listen(port, () => {
        console.log("server running");
    })
}).catch((err: any) => {
    console.log(err);
})


