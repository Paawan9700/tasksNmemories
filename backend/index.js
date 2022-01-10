const connectTomongo = require('./db');
const express = require('express');

connectTomongo();
const app = express();
// middle ware
app.use(express.json());

const port = 3000;

app.use('/api/auth', require('./routes/auth'));
// app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
