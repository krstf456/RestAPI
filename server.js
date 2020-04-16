const express = require('express')
const app = express()

const products = [
     {
        id: 1,
        name: 'TV',
        price: '4000'
     }, {
        id: 2,
        name: 'laptop',
        price: '5000'
     }, {
        id: 3,
        name: 'iPad',
        price: ''
     }
]

app.use(express.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.json(products)
})