const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 3000

app.use(cors())

app.use(express.static(__dirname + '/public'))

app.use('/api', require('./routes'))

app.listen(PORT, () => {
  console.log('Server listening on port', PORT)
})
