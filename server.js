const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT
const Tweet = require('./models/tweet.js')
const mongoose = require('mongoose')
const colors = require('colors')
const morgan = require('morgan')

//Middleware...

app.use(express.urlencoded({ extended: true })) //reading req.body.....
app.use(morgan('dev')) //Developer loggers

//DB configuration...
const DATABASE_URL = "mongodb+srv://spmuyomba1990:Public123@cluster0.qgcxzk7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const db = mongoose.connection;

//DB Connection....
mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//DB SUCCESS/ERROR MSGS....
db.on('error', () => console.log(error, + ' is DATABASE CONNECTED?'.red))
db.on('connected', () => console.log('DATABASE successfully connected....'.inverse.green.bold))
db.on('disconnected', () => console.log('DATABASE is disconnected...'))


//Routes.....
//Create route
app.post('/tweets', async (req, res) => {
    try {
        const createdTweet = await Tweet.create(req.body)
        res.send(createdTweet)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

//Index route
app.get('/tweets', async (req, res) => {
    try {
        const tweetLists = await Tweet.find({})
        res.send(tweetLists)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

//Show route
app.get('/tweets/:id', async (req, res) => {
    try {
        const foundTweet = await Tweet.findById(req.params.id)
        res.send(foundTweet)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

//Edit route..
app.put('/tweets/:id', async (req, res) => {
    try {
        const tweet = await Tweet.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.send(tweet)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

//Delete route..
app.delete('/tweets/:id', async (req, res) => {
    try {
        const removedTweet = await Tweet.findByIdAndDelete(req.params.id)
        res.send({ success: true })
    } catch (error) {
        res.status(500).json({ error: 'ID not found' })
    }
})





//PORT LISTENER....
app.listen(port, () => {
    console.log(`Server is running on ${port}...`.cyan.inverse.bold)
})