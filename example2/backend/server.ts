import express from 'express'

express()
  .get('/', (req, res, next) => {
    res.end('...')
  })
  .listen(8080)