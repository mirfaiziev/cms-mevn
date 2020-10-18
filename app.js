const express = require('express')
var cors = require('cors')

const app = express()

app.use(express.json())

app.use(cors())

app.use('/api/auth', require('./routes/auth.route'))

app.use('/api/cms', require('./routes/cms.route'))

module.exports=app