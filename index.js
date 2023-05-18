const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();



// middleware

app.use(express.json());
app.use (cors());


app.get('/', (req, res) => {

    res.send('welcome to my marvelous toys server')
})

app.listen(port);