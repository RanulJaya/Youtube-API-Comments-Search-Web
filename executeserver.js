const express = require('express')
const app = express()
const port = 8000
const path = require('path')
const fileName = path.join(__dirname)
const bodyparser = require('body-parser')
const { exec } = require('node:child_process')
const cors = require('cors')

app.use(express.static(__dirname))
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(bodyparser.text({type: 'application/javascript'}))
app.use(cors({
    origin:'http://localhost:3000',
    methods: ["POST"]

    }))

app.post('/execApi', async(res, req) => {
    exec('scrapper/runtestbash.sh', {shell: '/bin/bash'})
})

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})