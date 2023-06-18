const express = require('express')
const { expr } = require('jquery')
const path = require('path')

const app = express()

app.use(express.static(__dirname + '/dist/hcm-app'))

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname+'/dist/hcm-app/index.html'))
})


app.listen(process.env.PORT || 4444)