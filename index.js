const express = require('express')
const app = express()
const port = 5000 || process.env.PORT
const cors = require('cors')
require('dotenv').config()

require('./db/connection')
app.use(express.json())
app.use(cors())

app.use('/api/', require('./routers/order'))


app.listen(port, ()=>{
    console.log('Server running...');
})