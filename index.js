const express = require('express')
const mongoose = require('mongoose')
const app = express()
const exphbs = require('express-handlebars')
const shortUrl = require('./models/shortUrl')


//setting templating engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: false }))

//database connection
mongoose.connect('mongodb://localhost/urlShortner')
    .then(() => {
        console.log('connected to database');
    })
    .catch(err => {
        console.log(err)
    })


//routes
app.get('/', async (req, res) => {
    const shortUrlsFind = await shortUrl.find().lean()
    res.render('index', { shortUrls: shortUrlsFind })
})

app.post('/shortUrl', async (req, res) => {
    await shortUrl.create({ full: req.body.fullUrl })
    res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {
    const shortUrls = await shortUrl.findOne({ short: req.params.shortUrl })
    if(shortUrls == null) return res.sendStatus(404);
    shortUrls.clicks++;
    shortUrls.save()
    res.redirect(shortUrls.full)
})


//ports
const port = process.env.PORT || 3000
app.listen(port, console.log(`Listening on port: ${port}`))