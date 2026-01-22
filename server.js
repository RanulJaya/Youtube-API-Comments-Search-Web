// import './src/index.js'
const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const fileName = path.join(__dirname)
const bodyparser = require('body-parser')

app.use(express.static(path.join(__dirname, 'dist')))

const requestMiddleware = require('./src/middleware/middleware.js')


app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(bodyparser.text({type: 'application/javascript'}))
app.use(bodyparser.text({type: 'text/css'}))
app.use(bodyparser.text({type: 'text/html'}))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist'))
})

app.use(requestMiddleware({opt1 : path.join(__dirname, 'dist')}))

app.post('/api', async(res, req) => {
    req.send(res.body)
})

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})