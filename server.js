const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

const apiKey = '36cf96d5b76bdafa58579914ab631a00';

// Allows connection to the CSS file
app.use(express.static('public'));
// Accesses bodyParser parser and allows us to access the name of the city the user typed
app.use(bodyParser.urlencoded({ extended: true }));
// Sets the template engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { weather: null, error: null });
});
// post request that logs the value of 'city' to the console
app.post('/', (req, res) => {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${apiKey}`;

  request(url, function (err, response, body) {
    if (err) {
      res.render('index', { weather: null, error: 'Error, please try again' });
    } else {
      let weather = JSON.parse(body);
      if (weather.main == undefined) {
        res.render('index', {
          weather: null,
          error: 'Error, please try again',
        });
      } else {
        let weatherText = `${weather.main.temp} degrees in ${weather.name}!,
        minTemp: ${weather.main.temp_min},
            maxTemp: ${weather.main.temp_max},
       
            humidity: ${weather.main.humidity},
            
           ()},
        Wind Speed: ${weather.main.wind.speed}
        `;

        res.render('index', { weather: weatherText, error: null });
      }
    }
  });
});

app.listen(4000, () => {
  console.log(' app listening on port 4000!');
});
