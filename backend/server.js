const express = require('express');
const cors = require('cors'); 
const bodyParser = require('body-parser');

const entityRoutes = require('./routes/entityRoutes');
const utilityRoutes = require('./routes/utilityRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const port = 3000; 

app.use(cors()); 
app.use(bodyParser.json()); 

app.use('/internal', entityRoutes); 

app.use('/internal', utilityRoutes);

// layer publik, ni buat dipake FE pake nya ini, atur dah
app.use('/api', taskRoutes);

app.listen(port, () => {
    console.log(`GakaPort Backend is running on http://localhost:${port}`);
});