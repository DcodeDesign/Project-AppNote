const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const mongoose = require('mongoose')
const index = require('./routes/index')
const cors = require('cors')

const whitelist = ['http://localhost:4200','http://localhost:4201', 'http://localhost:8080', 'http://localhost:8081', 'http://localhost:8082', 'http://localhost:8083']
const corsOptions = {
    origin: whitelist,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: false
}

app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*mongoose.connect('mongodb+srv://tg:123123123@cluster0.2e6jw.mongodb.net/angular?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true},
    (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Mongoose is connected')
        }
    }
)*/

mongoose.connect('mongodb://mongo:27017/appNote',
    { useNewUrlParser: true, useUnifiedTopology: true},
    (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Mongoose is connected')
        }
    }
)


app.use(index)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

module.exports = app;
