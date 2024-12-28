const express = require('express')
const app = express()

require('dotenv').config()

// db connection
require('./config/mongoose').connect()