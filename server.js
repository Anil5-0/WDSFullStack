if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express();
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index')

app.use(expressLayouts)
app.use(express.static('public'))
app.use('/', indexRouter)

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout')

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to Mongoose'))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
