const express = require('express');
const app = express();
const PORT = process.env.PORT || 80;
app.get('/',(req, res) => res.send('Hello World'));
app.listen(PORT, () => console.log(`Server listening in port ${PORT}`));