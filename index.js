import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const app = express();
app.use(express.urlencoded({ extended: true }));


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname + '/assets'));

// Set up views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get("/", async (req, res) => {
  try {
    const result = await axios.get(
      "https://api.adviceslip.com/advice",
      {
        timeout: 3000,
      }
    );

    res.render("index", {
      id: result.data.slip.id,
      advice: result.data.slip.advice,
    });
  } catch (err) {
    res.render("index", {
      id: 0,
      advice: "Unable to fetch advice at the moment. Please try again.",
    });
  }
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Sir, Your server is ready on port 3000 in your honour.")
})