const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')
require('dotenv').config()

require('./db/connection')
app.use(express.json())
app.use(cors())

app.use('/api', require('./routers/order'))
app.get('/', (req,res)=>{
    return res.send('server started')
})


app.listen(port, ()=>{
    console.log('Server running...');
})