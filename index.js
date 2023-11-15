// Import Express and Axios module
import Express, { urlencoded } from "express"; 
import axios from "axios";
import bodyParser from "body-parser";

const app = Express();
const port = 3000;
const apiKey = "27bd26df6b2dfafe9cf959dc0b606d36"

// Set public directory for static file
app.use(Express.static("public"));

// Set body parser middleware
app.use(bodyParser.urlencoded({extended: true}));

// Load homepage using get method
app.get("/",async (req,res) => {
    res.render("index.ejs");
})

// load homepage with the location inserted by user
app.post("/submit", async(req,res) => {
    try{
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${req.body.lat}&lon=${req.body.lon}&appid=${apiKey}`);
        res.render("index.ejs",{ location: result.data });
    } catch (error){
        console.error("Failed to make request " + error.message);
    }
})
// Listen on some port and start the server
app.listen(port, () => {
    console.log("Listening on port " + port)
})