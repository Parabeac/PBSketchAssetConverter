import express from 'express'
import { PORT } from './config/constants'
import { sketchRouter, vectorRouter } from './routes'
const bodyParser = require('body-parser')
const app = express()

app.use(express.json())
app.use(bodyParser.json({ limit: '500mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }))
app.use(loggerMiddleware);
// app.use(express.static('dist'))

app.use('/sketch', sketchRouter)
app.use('/vector', vectorRouter)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
}).on('error', (err: Error) => {
  if (err.message.includes('EADDRINUSE')) {
    console.log(`An ERROR occurred: Try closing the port: ${PORT} and try again! ('killall node' OR 'killall npm')`)
  }
  else {
    console.log(err)
  }
})

function loggerMiddleware(request: express.Request, _response: express.Response, next: () => void) {
  console.log(`${request.method} ${request.path}`);
  next();
}
