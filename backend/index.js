const express = require('express')
const morgan = require('morgan')
const app = express()
const port = process.env.PORT || 5000;
const route = require('./routes')
const db = require('./config/db')
var cors = require('cors')
db.connect()
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(morgan('combined'))
app.use(cors())

route(app)
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})