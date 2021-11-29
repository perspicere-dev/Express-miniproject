const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();

app.engine('hbs', hbs());
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    res.show = (name) => {
      res.sendFile(path.join(__dirname, `/views/${name}`));
    };
    next();
  });

  app.use(express.static(path.join(__dirname, '/public')));

  app.use('/user', (req, res) => {
    res.show('forbidden.html');
  });
  
  app.get(['/', '/home'], (req, res) => {
    res.show('index.html');
  });
  
  app.get('/about', (req, res) => {
    res.show('about.html');
  });

  app.get('/hello/:name', (req, res) => {
    res.render('hello', { layout: false, name: req.params.name }); //Funkcja render ma dwa parametry. Pierwszy ustala nazwę widoku, który chcemy wykorzystać, a drugi przekazuje obiekt z wartościami dla placeholderów
  });

  app.use((req, res) => {
    res.status(404).show('404.html');
  });

  app.listen(7000, () => {
    console.log('Server is running on port: 7000');
  });