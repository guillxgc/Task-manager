const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');

const corsOptions = {
    origin: 'http://localhost:3000', 
    optionsSuccessStatus: 200
};

const app = express();
const PORT = process.env.PORT || 4000;

console.log('INITIALIZING SERVER');

app.use(express.json());
app.use(cors(corsOptions)); /*LET YOU GET REQUESTS FROM THE FRONTEND TO DE BACKEND*/

app.use('/api/tasks', taskRoutes);
/*CONNECTION MONGODB*/
mongoose.connect('mongodb://127.0.0.1:27017/task-manager', {})
    .then(() => console.log('SUCCESFULL CONNECTION TO MONGODB'))
    .catch(err => {
        console.error('ERROR ON CONNECTION', err);
    });

app.get('/', (req, res) => {
    res.send('SERVER IS RUNNING :)');
});

app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
});