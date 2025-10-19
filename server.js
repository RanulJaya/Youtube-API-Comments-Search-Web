const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const fileName = path.join(__dirname)
const bodyparser = require('body-parser')
const { exec } = require('node:child_process')

app.use(express.static(__dirname))
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(bodyparser.text({type: 'application/javascript'}))

app.get('/', (req, res) => {
    res.sendFile(fileName + '/src/components/index.html')
})


app.post('/api', async(res, req) => {
    req.send(res.body)

    exec('source scrapper/venv/bin/activate && python3 scrapper/web-scrapper.py', {shell: '/bin/bash'},(error, stdout, stderr) => {
        console.log(stdout)
    })
})

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})