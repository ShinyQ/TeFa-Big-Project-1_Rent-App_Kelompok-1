const express = require('express');

const route = require('./routes/route');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', route(express));

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;