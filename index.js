// Import Express and Axios module
import Express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = Express();
const port = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;

// Set public directory for static file
app.use(Express.static('public'));

// Set body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Load homepage using get method
app.get('/', async (req, res) => {
  res.render('index.ejs', { location: null, error: null });
});

// load homepage with the location inserted by user
app.post('/submit', async (req, res) => {
  const city = req.body.city;
  try {
    const result = await axios.get(
      `${process.env.API_URL}/data/2.5/weather?q=${city}&appid=${apiKey}`
    );
    res.render('index.ejs', { location: result.data, error: null });
  } catch (error) {
    console.error(error.message);
    res.render('index.ejs', {
      location: null,
      error: 'City not found or API error',
    });
  }
});
// Listen on some port and start the server
app.listen(port, () => {
  console.log('Listening on port ' + port);
});
