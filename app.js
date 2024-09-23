const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')
const errorHandler = require('./src/middleware/errorhandling')
const ErrorUtil = require('./src/utils/ErrorUtil')


const app = express()

app.use(helmet())

app.use(express.json())

app.use(express.urlencoded({extended: true}))
app.use(xss())


app.use(cors())
app.options('*', cors())


app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  });


module.exports = app