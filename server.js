const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

// app.use((req, res, next) => {
//     var now = new Date().toString();
//     var log = `${now} - ${req.method} ${req.url}`;
//     console.log(log);
//     fs.appendFile('log.txt',log + '\n', (err) => {
//         if(err) {
//             console.log('Unable to save');
//         }
//     });
//     next();
// });

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} - ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('log.txt',log + '\n', (err) => {
        if(err) {
            console.log('Unable to save');
        }
    });

    if(req.url.indexOf('?') > -1) {
        console.log('df');
        res.render('error.hbs');
    }
    else {
        next();
    }
   
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
   // res.send('<h1>Hello Express!</h1>');
   res.render('home.hbs',{
       name: 'Bla',
       guitars: [
           'Gibson',
           'Fender',
           'Ibanez',
           'Yamaha'
       ]
   });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Bad Request!'
    });
});

app.listen(3000 , () => {
    console.log('server ready');
});

