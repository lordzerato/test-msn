const express = require('express')
const cors = require('cors')
const router = require('./routes')

const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)

app.listen(PORT, () => {
    console.log("App is running on port: " + PORT);
})