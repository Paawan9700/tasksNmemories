const connectTomongo = require('./db');
const express = require('express');
var cors = require('cors')

connectTomongo();
const app = express();
// middle ware
app.use(express.json());
app.use(cors())
// cors -> allowing  different outside routes to render

const port = 5000;

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/memory', require('./routes/memory'));

app.listen(port, () => {
    console.log(`Tasks N Memories backend listening at http://localhost:${port}`)
})
