require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connection = require('./configs/connection');
const userRouter = require('./routers/user.routes');




const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
    try {
        return res.status(200).json({
            status: true,
            message: 'Welcome to Fouress-Group.'
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
})

app.use('/users', userRouter);

app.listen(PORT, async () => {
    try {
        await connection;
        console.log('Database is successfully connected.');
    } catch (error) {
        console.log(error);
    }
    console.log('Server is running on the port ' + PORT);
})