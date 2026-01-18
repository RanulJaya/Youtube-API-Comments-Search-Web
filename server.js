const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const fileName = path.join(__dirname)
const bodyparser = require('body-parser')
const { exec } = require('node:child_process')
const requestMiddleware = require('./src/middleware/middleware.js')

app.use(express.static(__dirname))
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(bodyparser.text({type: 'application/javascript'}))


app.get('/', (req, res) => {
    res.sendFile(fileName + '/src/components/index.html')
})

app.use(requestMiddleware({opt1 : path.join(__dirname, 'src')}))

app.post('/api', async(res, req) => {
    req.send(res.body)
})

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})