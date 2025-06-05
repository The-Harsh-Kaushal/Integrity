const express = require('express');
const App = express();
const Mongoose = require('mongoose');
const authenticationRoutes = require('./Routes/authentication');


const cors = require('cors');


App.use(cors());
App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use('/api/auth', authenticationRoutes);

const ConnectDB = ()=> {
    Mongoose.connect('mongodb://localhost:27017/Integrity', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB", err));
}
ConnectDB();
App.listen(5000,()=>{console.log("server is listening at port 5000..")});