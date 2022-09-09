import express, { Request, Response, NextFunction } from 'express'
import cookieParser from 'cookie-parser'

import jwksrsa from 'jwks-rsa'
import jwt from 'jsonwebtoken'

interface something {
  foo: string
}

export type somethingResponse = Array<something>

const cookieName = 'hanko'

express()
  .use(cookieParser())
  .use(createAuthMiddleware())
  .get('/api/something', (req, res, next) => {
    console.log('this request is authorized:', res.locals.userId)

    res.json([
      {foo: 'bar'},
      {foo: 'baz'},
      {foo: 'bax'}
    ])
  })
  .post('/api/logout', (req, res, next) => {
    res.clearCookie(cookieName)
    res.end()
  })
  .listen(8080)

function createAuthMiddleware() {
  return function (req: Request, res: Response, next: NextFunction) {
    const authjwt = req.cookies[cookieName]

    verifyJWT(authjwt)
      .then((userId) => {
        res.locals.userId = userId

        next()
      }, (error) => {
        console.log(error)
        res.status(401).end('Unauthorized')
      })
  }
}

const client = jwksrsa({ jwksUri: 'http://hanko:8000/.well-known/jwks.json' });

async function verifyJWT(authjwt: string): Promise<string> {
  function getKey(header, callback) {
    client.getSigningKey(header.kid, function(err, key: any) {
      if (err) return callback(err)

      callback(null, key.publicKey || key.rsaPublicKey)
    })
  }
  
  return new Promise((resolve, reject) => {
    jwt.verify(authjwt, getKey, {}, function(err, decoded: any) {
      if (err !== null) return reject(err)

      resolve(decoded.sub)
    });
  })
}