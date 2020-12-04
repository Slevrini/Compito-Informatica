const express = require('express')
const app = new express()
const port = 3000

const handlebars = require('express-handlebars')

app.set('view engine', 'hbs')

app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'planB',
    //new configuration parameter
    partialsDir: __dirname + '/views/partials/'
}));

app.use(express.static('public'))

app.get('/', (req, res) => {
    const lingua = req.headers["accept-language"].substr(0, 2) 
    if (lingua === "it") {
        res.render('main', {layout: 'index', nome: req.query.nome, cognome: req.query.cognome, eta: req.query.eta, saluto: "Ciao"})
    } else {
        res.render('main', {layout: 'index', nome: req.query.nome,  cognome: req.query.cognome, eta: req.query.eta, saluto: "Hello"})
    }
})

app.get("/ciao", (req, res) => {
    const query = req.query
    const headers = req.headers
    const messaggioSaluto = "Ciao " + query.name + ", " + query.cognome  + ". <br/> Hai " + query.anni + "anni"
    res.send(messaggioSaluto + " <br/>")
})

app.get("/informazioni", (req, res) => {
    const headers = req.headers
    const informazioni = "Il tuo user agent è: " + headers["user-agent"]
    const ip = "Il tuo ip è:" + req.headers['x-forwarded-for']
    res.send(informazioni + "<br/>" + ip)
})


app.listen(port, () => console.log(`App listening to port ${port}`));

